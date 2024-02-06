import Table from '@mui/material/Table';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Checkbox from '@mui/material/Checkbox';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';
import { CircularProgress, Fade } from '@mui/material';
import Button from '@mui/material/Button';
import { debounce } from 'lodash';
import _ from '../../../../../@lodash';
import AttendanceShiftRulesHead from './attendanceShiftRulesHead';
import reducer from '../store';
import withReducer from '../../../../store/withReducer';
import FuseScrollbars from '../../../../../@fuse/core/FuseScrollbars';
import { deleteAssignRules, getAssignRules } from '../store/attendanceShiftAssign';

function AttendanceShift() {
  const dispatch = useDispatch();
  const [selected, setSelected] = useState([]);
  const [atEnd, setAtEnd] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [assignRules, setAssignRules] = useState([]);
  const [page, setPage] = useState(1);
  const [isLastPage, setIsLastPage] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const user = useSelector(({ auth }) => auth.user);
  const myUsers = useSelector(
    ({ attendanceApp }) => attendanceApp.attendanceAssignRules.assignUsers
  );
  const totalCount = useSelector(
    ({ attendanceApp }) => attendanceApp.attendanceAssignRules.totalCount
  );

  const [order, setOrder] = useState({
    direction: 'asc',
    id: null,
  });

  function handleDeselect() {
    setSelected([]);
  }

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

  function handleCheck(event, id) {
    const selectedEmployee = [];
    selectedEmployee.push(id);

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

  function handleSelectAllClick(event) {
    if (event.target.checked) {
      setSelected(assignRules.map((n) => n.id));
      return;
    }
    setSelected([]);
  }

  function getAssignRuleFunction() {
    const getData = {
      id: user.company_id,
      page,
      perPage: 10,
    };
    dispatch(getAssignRules(getData)).then((res) => {
      setAssignRules(res.payload);
      setLoadingMore(false);
      // setLoading(false);
    });
  }
  useEffect(() => {
    getAssignRuleFunction(user.company_id);
  }, [dispatch]);

  const removeAssignLeave = (empId, attendance_id) => {
    dispatch(deleteAssignRules({ empId, attendance_id })).then((res) => {
      dispatch(getAssignRules({page: 1, perPage: 10, id: user.company_id}))
    });
  };

  useEffect(() => {
    if (atEnd && !loadingMore && !isLastPage) {
      setLoadingMore(true);
      setPage(page + 1);
      getAssignRuleFunction();
    }
    if (!isLastPage && assignRules?.length >= totalCount) {
      setIsLastPage(true);
    } else {
      setIsLastPage(false);
    }
  }, [dispatch, atEnd, loadingMore]);

  useEffect(() => {
    if (myUsers) {
      if (atEnd) {
        setAssignRules([...assignRules, ...myUsers]);
        setAtEnd(false);
      } else {
        setAssignRules(myUsers);
      }
    }
  }, [myUsers]);

  return (
    <div className="w-full flex flex-col">
      <FuseScrollbars className="grow overflow-x-auto">
        <Table stickyHeader className="min-w-xl" aria-labelledby="tableTitle">
          <AttendanceShiftRulesHead
            selectedOrderIds={selected}
            order={order}
            onSelectAllClick={handleSelectAllClick}
            onRequestSort={handleRequestSort}
            rowCount={assignRules && assignRules.length}
            onMenuItemClick={handleDeselect}
            assignRules={assignRules}
            getAssignRuleFunction={getAssignRuleFunction}
            setSelectedCheck={setSelected}
          />
          <TableBody>
            {_.orderBy(
              assignRules,
              [
                (o) => {
                  switch (order.id) {
                    case 'id': {
                      return parseInt(o.id, 20);
                    }
                    default: {
                      return o[order.id];
                    }
                  }
                },
              ],
              [order.direction]
            )
              // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((n) => {
                const isSelected = selected.indexOf(n.id) !== -1;
                return (
                  <TableRow
                    className="h-72"
                    hover
                    role="checkbox"
                    aria-checked={isSelected}
                    tabIndex={-1}
                    key={n.id}
                    selected={isSelected}
                    // onClick={(event) => handleClick(n)}
                  >
                    <TableCell className="w-40 md:w-64 text-center" padding="none">
                      <Checkbox
                        checked={isSelected}
                        onClick={(event) => event.stopPropagation()}
                        onChange={(event) => handleCheck(event, n.id)}
                      />
                    </TableCell>
                    {/*<TableCell className="p-4 md:p-16 " component="th" scope="row" />*/}
                    {/*<TableCell className="p-4 md:p-16 " component="th" scope="row" />*/}
                    <TableCell className="p-4 md:p-16 " component="th" scope="row">
                      {n.users.firstName}
                    </TableCell>
                    <TableCell className="p-4 md:p-16 " component="th" scope="row">
                      {n.jobPosition?.company_department.department_name}
                    </TableCell>
                    <TableCell className="p-4 md:p-16 " component="th" scope="row">
                      {n.employeeData[0]?.managerBy.users.firstName}
                    </TableCell>

                    <TableCell className="p-4 md:p-16" component="th" scope="row">
                      {n.empType}
                    </TableCell>
                    <TableCell>
                      {n.attendanceRules.map((item) => {
                        return (
                          <>
                            <div className=" pr-46 p-5 inline-flex  items-center border-1 rounded-[500px] mr-10">
                              <Typography className="mx-12">
                                {' '}
                                {item.attendance?.ruleName}{' '}
                              </Typography>
                              <CloseIcon
                                cursor="pointer"
                                onClick={() =>
                                  removeAssignLeave(n.id, item.attendance?.id)
                                }
                              />
                            </div>
                          </>
                        );
                      })}
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
        {assignRules.length < totalCount && (
          <Box className="relative flex justify-center p-12">
            {assignRules?.length >= 10 && (
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
export default withReducer('attendanceApp', reducer)(AttendanceShift);
