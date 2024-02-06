import FuseScrollbars from '@fuse/core/FuseScrollbars';
import _ from '@lodash';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import withRouter from '@fuse/core/withRouter';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, CircularProgress, Fade } from '@mui/material';
import { debounce } from 'lodash';
import moment from 'moment';
import clsx from 'clsx';
import { getAllLeave, selectLeave } from '../store/leaveSlice';
import EmployeeListTableHead from './AdminLeaveTableHead';
import AdminLeavesDialog from './AdminLeaveDialog';
import FuseProgress from '../../Components/FuseProgress';

function AdminLeaveTable(props) {
  const dispatch = useDispatch();
  const leaves = useSelector(selectLeave);
  const [selected, setSelected] = useState([]);
  const totalCount = useSelector(({ leaveApp }) => leaveApp.adminLeave.totalCount);
  const [data, setData] = useState(leaves);
  const [page, setPage] = useState(1);
  const [atEnd, setAtEnd] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [isLastPage, setIsLastPage] = useState(false);
  const [order, setOrder] = useState({
    direction: 'asc',
    id: null,
  });
  const [open, setOpen] = React.useState(false);
  const [leaveData, setLeaveData] = useState([]);
  const [reason, setReason] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isRejected, setIsRejected] = useState(false);
  const [editDate, setEditDate] = useState(false);

  const handleClose = () => {
    setOpen(false);
    setEditDate(false);
  };

  const handleClickOpen = (n) => {
    setIsRejected(false)
    setReason(null);
    setLeaveData(n);
    setOpen(true);
  };

  useEffect(() => {
    if (atEnd && !loadingMore && !isLastPage) {
      setLoadingMore(true);
      setPage(page + 1);
      getAdminLeave();
    }
    if (!isLastPage && data.length >= totalCount) {
      setIsLastPage(true);
    } else {
      setIsLastPage(false);
    }
  }, [dispatch, atEnd, loadingMore]);



  useEffect(() => {
    if (leaves) {
      if (atEnd) {
        setData([...data, ...leaves]);
        setAtEnd(false);
      } else {
        setData(leaves);
      }
    }
  }, [leaves]);

  const handleChangeReason = (value) => {
    setReason(value);
  };

  const getAdminLeave = () => {
    dispatch(getAllLeave({ page, perPage: 10 })).then((res) => {
      setLoading(false);
      setLoadingMore(false);
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

  if (data.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.1 } }}
        className="flex flex-1 items-center justify-center h-full"
      >
        <Typography color="textSecondary" variant="h5">
          Employee Leave not found!
        </Typography>
      </motion.div>
    );
  }

  return (
    <>
      {loading ? (
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
                      onClick={(event) => handleClickOpen(n)}
                    >
                      <TableCell className="p-4 md:p-16" component="th" scope="row" align="left">
                        {`${n.employees?.users.firstName}   ${n.employees?.users.lastName}`}
                      </TableCell>

                      <TableCell className="p-4 md:p-16" component="th" scope="row" align="left">
                        {n.leaveType === 'SICK_LEAVE' && 'Sick Leave'}
                        {n.leaveType === 'PAID_LEAVE' && 'Paid Leave'}
                        {n.leaveType === 'UN_PAID_LEAVE' && 'UnPaid Leave'}
                      </TableCell>

                      <TableCell className="p-4 md:p-16" component="th" scope="row" align="left">
                        {moment(n.start).format('LLL')}
                      </TableCell>

                      <TableCell className="p-4 md:p-16" component="th" scope="row" align="left">
                        {moment(n.end).format('LLL')}
                      </TableCell>

                      <TableCell className="p-4 md:p-16" component="th" scope="row" align="center">
                        {n.durationCount}
                      </TableCell>

                      <TableCell className="p-4 md:p-16" component="th" scope="row" align="left">
                        {n.description}
                      </TableCell>

                      <TableCell className="p-4 md:p-16" component="th" scope="row" align="center">
                        <Typography
                          className={clsx(
                            'inline-block rounded-full px-10 py-5',
                            n.status === 'APPLIED' && 'bg-gray-200',
                            n.status === 'REJECT' && 'bg-red text-white',
                            n.status === 'APPROVED' && 'bg-green text-white'
                          )}
                        >
                          {n.status}
                        </Typography>
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
          <AdminLeavesDialog
            open={open}
            leave={leaveData}
            data={data}
            setData={setData}
            handleChangeReason={handleChangeReason}
            reason={reason}
            getAdminLeave={getAdminLeave}
            handleClose={handleClose}
            setIsRejected={setIsRejected}
            isRejected={isRejected}
            isEdit={editDate}
            setIsEdit={setEditDate}
          />
        </div>
      )}
    </>
  );
}

export default withRouter(AdminLeaveTable);
