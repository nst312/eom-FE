import FuseScrollbars from '@fuse/core/FuseScrollbars';
import withRouter from '@fuse/core/withRouter';
import _ from '@lodash';
import DeleteIcon from '@mui/icons-material/Delete';
import RestoreIcon from '@mui/icons-material/Refresh';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContentText from '@mui/material/DialogContentText';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import {
  deleteInvitation,
  getAllInvitation,
  removeInvitation,
  resendInvitation,
  selectInvitations,
  updateInvitation,
} from './store/invitationsSlice';
import InvitationTableHead from './InvitationTableHead';
import FuseProgress from '../Components/FuseProgress';

function InvitationTable(props) {
  const invitations = useSelector(selectInvitations);
  const dispatch = useDispatch();
  const [selected, setSelected] = useState([]);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [order, setOrder] = useState({
    direction: 'asc',
    id: null,
  });
  const [open, setOpen] = React.useState(false);
  const [selectedId, setSelectedId] = useState('');

  const handleClickOpen = (id) => {
    setSelectedId(id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    dispatch(getAllInvitation()).then((res) => {
      setData(res.payload);
      props.setLoading(false);
    });
  }, []);

  useEffect(() => {
    setData(invitations);
  }, [invitations]);

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

  const onResendInvitation = (id) => {
    props.setLoading(true);
    dispatch(resendInvitation({ id })).then((res) => {
      dispatch(updateInvitation(res.payload));
      props.setLoading(false);
    });
  };

  const onDeleteInvitation = (id) => {
    props.setLoading(true);
    dispatch(deleteInvitation({ id })).then((res) => {
      setOpen(false);
      dispatch(removeInvitation(id));
      props.setLoading(false);
    });
  };

  function handleChangePage(event, value) {
    setPage(value);
  }

  function handleChangeRowsPerPage(event) {
    setRowsPerPage(event.target.value);
  }

  if (!props.loading && data.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.1 } }}
        className="flex flex-1 items-center justify-center h-full"
      >
        <Typography color="textSecondary" variant="h5">
          There are no invitations!
        </Typography>
      </motion.div>
    );
  }

  return props.loading ? (
    <FuseProgress />
  ) : (
    <div className="w-full flex flex-col">
      <FuseScrollbars className="grow overflow-x-auto">
        <Table stickyHeader className="min-w-xl" aria-labelledby="tableTitle">
          <InvitationTableHead
            selectedProductIds={selected}
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
                    case 'categories': {
                      return o.categories[0];
                    }
                    default: {
                      return o[order.id];
                    }
                  }
                },
              ],
              [order.direction]
            )
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((n) => {
                const isSelected = selected.indexOf(n.id) !== -1;
                return (
                  <TableRow
                    className="h-72 cursor-pointer"
                    hover
                    role="checkbox"
                    aria-checked={isSelected}
                    tabIndex={-1}
                    key={n.id}
                    selected={isSelected}
                  >
                    <TableCell className="p-4 md:p-16" component="th" scope="row">
                      {n.firstName}
                    </TableCell>
                    <TableCell className="p-4 md:p-16 truncate" component="th" scope="row">
                      {n.lastName}
                    </TableCell>
                    <TableCell className="p-4 md:p-16 truncate" component="th" scope="row">
                      {n.email}
                    </TableCell>
                    {n.deletedAt ? (
                      <TableCell className="p-4 md:p-16 truncate" component="th" scope="row">
                        <Typography className="text-green">Accepted</Typography>
                      </TableCell>
                    ) : (
                      <TableCell className="p-4 md:p-16 truncate" component="th" scope="row">
                        <Tooltip title="Resend invitation" className="mr-6">
                          <IconButton onClick={() => onResendInvitation(n.id)}>
                            <RestoreIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete invitation">
                          <IconButton onClick={() => handleClickOpen(n.id)}>
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    )}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </FuseScrollbars>
      <TablePagination
        className="shrink-0 border-t-1"
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        backIconButtonProps={{
          'aria-label': 'Previous Page',
        }}
        nextIconButtonProps={{
          'aria-label': 'Next Page',
        }}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Delete Invitation</DialogTitle>
        <DialogContent>
          <DialogContentText>Are you sure you want to delete?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => onDeleteInvitation(selectedId)}>Yes</Button>
          <Button onClick={() => handleClose()}>No</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default withRouter(InvitationTable);
