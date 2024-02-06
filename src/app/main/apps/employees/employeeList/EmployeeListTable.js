import FuseScrollbars from '@fuse/core/FuseScrollbars';
import _ from '@lodash';
import Checkbox from '@mui/material/Checkbox';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import withRouter from '@fuse/core/withRouter';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, CircularProgress, Fade } from '@mui/material';
import { debounce } from 'lodash';
import moment from 'moment';
import { getEmployee, selectEmployee } from '../store/employeeSlice';
import EmployeeListTableHead from './EmployeeListTableHead';
import constants from '../../../../fuse-configs/constants';
import { deleteEmployeeDetails } from '../store/employeesDetailSlice';
import FuseProgress from '../../Components/FuseProgress';

function EmployeeListTable(props) {
  const dispatch = useDispatch();
  const employees = useSelector(selectEmployee);
  const [selected, setSelected] = useState([]);
  const totalCount = useSelector(({ eomApp }) => eomApp.employees.totalCount);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [atEnd, setAtEnd] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [isLastPage, setIsLastPage] = useState(false);
  const user = useSelector(({ auth }) => auth.user);
  const [order, setOrder] = useState({
    direction: 'asc',
    id: null,
  });

  // useEffect(() => {
  //   dispatch(getUserProfile())
  // }, []);

  useEffect(() => {
    if (atEnd && !loadingMore && !isLastPage) {
      setLoadingMore(true);
      setPage(page + 1);
      getEmployeeData();
    }
    if (!isLastPage && data.length >= totalCount) {
      setIsLastPage(true);
    } else {
      setIsLastPage(false);
    }
  }, [dispatch, atEnd, loadingMore]);

  useEffect(() => {
    if (employees) {
      if (atEnd) {
        setData([...data, ...employees]);
        setAtEnd(false);
      } else {
        setData(employees);
      }
    }
  }, [employees]);

  const getEmployeeData = () => {
    dispatch(getEmployee({ page, perPage: 10 })).then((res) => {
      setLoadingMore(false);
      props.setLoading(false);
    });
  };

  function handleRequestSort(event, property) {
    const id = property;
    let direction = 'desc';

    if (order.id === property && order.direction === 'desc') {
      direction = 'asc';
    }

    setOrder({
      direction,
      id,
    });
  }

  function handleSelectAllClick(event) {
    if (event.target.checked) {
      setSelected(data.map((n) => n.id));
      return;
    }
    setSelected([]);
  }

  function handleDeselect() {
    setSelected([]);
  }

  function handleClick(item) {
    props.navigate(`/apps/employee/${item.id}`);
  }

  function handleCheck(event, id) {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  }

  if (data?.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.1 } }}
        className="flex flex-1 items-center justify-center h-full"
      >
        <Typography color="textSecondary" variant="h5">
          Employees not found!
        </Typography>
      </motion.div>
    );
  }

  function deleteEmployee() {
    dispatch(deleteEmployeeDetails(selected)).then((res) => {
      dispatch(getEmployee({ page: 1, perPage: 10 })).then((res) => {
        setLoadingMore(false);
      });
    });
    setSelected([]);
  }

  return props.loading ? (
    <FuseProgress />
  ) : (
    <div className="w-full flex flex-col">
      <FuseScrollbars className="flex-grow overflow-x-auto">
        <Table stickyHeader className="min-w-xl" aria-labelledby="tableTitle">
          <EmployeeListTableHead
            selectedEmployeeIds={selected}
            order={order}
            onSelectAllClick={handleSelectAllClick}
            onRequestSort={handleRequestSort}
            rowCount={data.length}
            onMenuItemClick={handleDeselect}
            onDelete={deleteEmployee}
          />

          <TableBody>
            {_.orderBy(
              data,
              [
                (o) => {
                  switch (order.id) {
                    default: {
                      return o[order.id];
                    }
                  }
                },
              ],
              [order.direction]
            ).map((n, index) => {
              const isSelected = selected.indexOf(n.id) !== -1;

              return (
                <TableRow
                  className="h-72 cursor-pointer"
                  hover
                  role="checkbox"
                  aria-checked={isSelected}
                  tabIndex={-1}
                  key={index}
                  selected={isSelected}
                  onClick={(event) => handleClick(n)}
                >
                  <TableCell className="w-40 md:w-64 text-center" padding="none">
                    <Checkbox
                      checked={isSelected}
                      onClick={(event) => event.stopPropagation()}
                      onChange={(event) => handleCheck(event, n.id)}
                    />
                  </TableCell>

                  <TableCell className="w-52 px-8" scope="row" padding="none">
                    {n.users?.avatar_url ? (
                      <img
                        src={`${constants.API_URL}/api/avatar/${n.users?.avatar_url}`}
                        alt={n.name}
                      />
                    ) : (
                      <img src="assets/images/avatars/profile.jpg" alt={n.name} />
                    )}
                  </TableCell>

                  <TableCell className="p-4 md:p-16" component="th" scope="row">
                    {n.users?.firstName} {n.users?.lastName}
                  </TableCell>
                  <TableCell className="p-4 md:p-16" component="th" scope="row">
                    {n.jobPosition !== null && n.jobPosition !== undefined
                      ? `${n.jobPosition.company_department.department_name}`
                      : ''}
                  </TableCell>
                  <TableCell className="p-4 md:p-16" component="th" scope="row">
                    {n.jobPosition !== null && n.jobPosition !== undefined
                      ? `${n.jobPosition.jobPosition}`
                      : ''}
                  </TableCell>
                  <TableCell className="p-4 md:p-16" component="th" scope="row">
                    {n.work_email}
                  </TableCell>
                  <TableCell className="p-4 md:p-16" component="th" scope="row">
                    {n.phone}
                  </TableCell>
                  <TableCell className="p-4 md:p-16" component="th" scope="row">
                    {n.joining_date ? moment(n.joining_date).format('L') : ''}
                  </TableCell>

                  <TableCell className="p-4 md:p-16" component="th" scope="row">
                    {n.attendanceRules.length === 0
                      ? ''
                      : `${moment(n.attendanceRules[0].attendance.shiftInTime).format(
                          'hA'
                        )} -  ${moment(n.attendanceRules[0].attendance.shiftOutTime).format('hA')}`}
                  </TableCell>
                </TableRow>
              );
            })}
            {/*; })}*/}
          </TableBody>
        </Table>
        {data.length < totalCount && (
          <Box className="relative flex justify-center p-12">
            {data.length >= 10 && (
              <Fade in={!loadingMore}>
                <Button
                  className="absolute"
                  variant="text"
                  onClick={debounce(() => setAtEnd(true), 100)}
                >
                  Load More
                </Button>
              </Fade>
            )}
            <Fade in={loadingMore}>
              <CircularProgress className="absolute" color="secondary" />
            </Fade>
          </Box>
        )}
      </FuseScrollbars>
    </div>
  );
}
export default withRouter(EmployeeListTable);
