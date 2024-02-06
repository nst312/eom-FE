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
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import debounce from '@mui/utils/debounce';
import CircularProgress from '@mui/material/CircularProgress';
import moment from 'moment';
import clsx from 'clsx';
import {
  downloadSalaryHistory,
  getEmployeeSalaryHistory,
  selectEmployeeSalary,
} from '../store/employeeSalaryHistorySlice';
import SalaryHistoryTableHead from './SalaryHistoryTableHead';
import FuseProgress from '../../Components/FuseProgress';
import Tooltip from "@mui/material/Tooltip";
import Icon from "@mui/material/Icon";

function SalaryHistoryListTable(props) {
  const dispatch = useDispatch();
  const employees = useSelector(selectEmployeeSalary);
  const user = useSelector(({ auth }) => auth.user);
  const [selected, setSelected] = useState();
  const totalCount = useSelector(({ salaryHistoryApp }) => salaryHistoryApp.empSalary.totalCount);
  const [order, setOrder] = useState({
    direction: 'asc',
    id: null,
  });
  const [atEnd, setAtEnd] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [isLastPage, setIsLastPage] = useState(false);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

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
    dispatch(getEmployeeSalaryHistory({ page, perPage: 10, employeeid: user.employee_id })).then(
      (res) => {
        setLoading(false);
        setLoadingMore(false);
      }
    );
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
          Salary not found!
        </Typography>
      </motion.div>
    );
  }

  const DownloadPdf = (historyId) => {
    const data = {
      id : historyId
    }

    dispatch(downloadSalaryHistory(data)).then((res) => {
      if(res){
        const a = document.createElement('a');
        a.href = `data:data:application/pdf;base64,${res.payload.pdf}`;
        a.download = 'salarySlip.pdf';
        a.click();
      }
    })
  }

  return loading ? (
    <FuseProgress />
  ) : (
    <div className="w-full flex flex-col">
      <FuseScrollbars className="flex-grow overflow-x-auto">
        <Table stickyHeader className="min-w-xl" aria-labelledby="tableTitle">
          <SalaryHistoryTableHead
            selectedEmployeeSalaryIds={selected}
            order={order}
            onSelectAllClick={handleSelectAllClick}
            onRequestSort={handleRequestSort}
            rowCount={data?.length}
            onMenuItemClick={handleDeselect}
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
              // const isSelected = selected.indexOf(n.id) !== -1;
              const totalSalary =
                n.basic +
                n.hra +
                n.specialAllowance +
                n.conveyance +
                n.medical -
                (n.professionalTax + n.tds);
              return (
                <TableRow
                  className="h-72 cursor-pointer"
                  hover
                  role="checkbox"
                  // aria-checked={isSelected}
                  tabIndex={-1}
                  key={index}
                  // selected={isSelected}
                  // onClick={(event) => handleClick(n)}
                >
                  <TableCell className="w-40 md:w-64 text-center" padding="none">
                    <Checkbox
                      // checked={isSelected}
                      onClick={(event) => event.stopPropagation()}
                      onChange={(event) => handleCheck(event, n.id)}
                    />
                  </TableCell>

                  <TableCell className="p-4 md:p-16" component="th" scope="row">
                    {n.createdAt ? moment(n.createdAt).format('L') : ''}
                  </TableCell>

                  <TableCell className="p-4 md:p-16" component="th" scope="row">
                    {n.basic}
                  </TableCell>

                  <TableCell className="p-4 md:p-16" component="th" scope="row">
                    {n.hra}
                  </TableCell>

                  <TableCell className="p-4 md:p-16" component="th" scope="row">
                    {n.specialAllowance}
                  </TableCell>

                  <TableCell className="p-4 md:p-16" component="th" scope="row">
                    {n.conveyance}
                  </TableCell>

                  <TableCell className="p-4 md:p-16" component="th" scope="row">
                    {n.medical}
                  </TableCell>

                  <TableCell className="p-4 md:p-16" component="th" scope="row">
                    {n.professionalTax}
                  </TableCell>

                  <TableCell className="p-4 md:p-16" component="th" scope="row">
                    {n.tds}
                  </TableCell>

                  <TableCell className="p-4 md:p-16" component="th" scope="row">
                    <div
                      className={clsx(
                        'inline text-12 font-semibold py-4 px-12 rounded-full truncate'
                      )}
                    >
                      {totalSalary}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Tooltip title="Download Pdf" className="table-right-border cursor-pointer">
                      <Icon onClick={() =>{ DownloadPdf(n.id)}}>
                        cloud_download
                      </Icon>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              );
            })}
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
export default withRouter(SalaryHistoryListTable);
