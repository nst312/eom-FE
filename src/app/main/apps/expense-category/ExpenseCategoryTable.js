import FuseScrollbars from '@fuse/core/FuseScrollbars';
import withRouter from '@fuse/core/withRouter';
import _ from '@lodash';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContentText from '@mui/material/DialogContentText';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import { Edit } from '@mui/icons-material';
import DeleteIcon from '@mui/icons-material/Delete';
import moment from 'moment/moment';
import Box from '@mui/material/Box';
import { CircularProgress, Fade } from '@mui/material';
import { debounce } from 'lodash';
import { motion } from 'framer-motion';
import Typography from '@mui/material/Typography';
import ExpenseCategoryHead from './ExpenseCategoryTableHead';
import {
  deleteExpenseCategory,
  getExpenseCategory,
  openEditExpenseCategoryDialog,
} from './store/ExpenseCategorySlice';

function ExpenseCategoryTable(props) {
  const dispatch = useDispatch();
  const getExpenseData = useSelector(
    ({ expenseCategoryApp }) => expenseCategoryApp.expenseCategory.categoryData
  );
  const [expenseDetails, setExpenseDetails] = useState([]);
  const [selected, setSelected] = useState([]);
  const [order, setOrder] = useState({
    direction: 'asc',
    id: null,
  });
  const [open, setOpen] = React.useState(false);
  const [selectedId, setSelectedId] = useState('');
  const [loading, setLoading] = useState(true);
  const [atEnd, setAtEnd] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [isLastPage, setIsLastPage] = useState(false);
  const expenseDialog = useSelector(
    ({ expenseCategoryApp }) => expenseCategoryApp.expenseCategory.ExpenseCategoryDialog
  );
  const totalCount = useSelector(
    ({ expenseCategoryApp }) => expenseCategoryApp.expenseCategory.totalCount
  );

  const [page, setPage] = useState(1);
  const handleClickOpen = (id) => {
    setSelectedId(id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (atEnd && !loadingMore && !isLastPage) {
      setLoadingMore(true);
      setPage(page + 1);
      getAllExpenseCategory();
    }
    if (!isLastPage && expenseDetails?.length >= totalCount) {
      setIsLastPage(true);
    } else {
      setIsLastPage(false);
    }
  }, [dispatch, atEnd, loadingMore]);

  useEffect(() => {
    if (getExpenseData) {
      if (atEnd) {
        setExpenseDetails([...expenseDetails, ...getExpenseData]);
        setAtEnd(false);
      } else {
        setExpenseDetails(getExpenseData);
      }

    }
  }, [getExpenseData]);

  const getAllExpenseCategory = () => {
    dispatch(getExpenseCategory({ page, perPage: 10 })).then((res) => {
      setExpenseDetails(res.payload);
      setLoadingMore(false);
      setLoading(false);
    });
  };

  const onDeleteJobPosition = (id) => {
    setOpen(false);
    // props.setLoading(true);
    dispatch(deleteExpenseCategory({ id })).then((res) => {
          props.setLoadingMore(false);
          props.setLoading(false);
    });
  };

  if (expenseDetails?.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.1 } }}
        className="flex flex-1 items-center justify-center h-full"
      >
        <Typography color="textSecondary" variant="h5">
          Expense Category not found!
        </Typography>
      </motion.div>
    );
  }

  const setEditClick = (id) => {
    dispatch(openEditExpenseCategoryDialog(id));
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
      setSelected(props.positionData.map((n) => n.id));
      return;
    }
    setSelected([]);
  }

  function handleDeselect() {
    setSelected([]);
  }

  return (
    <div className="w-full flex flex-col">
      <FuseScrollbars className="grow overflow-x-auto">
        <Table stickyHeader className="min-w-xl" aria-labelledby="tableTitle">
          <ExpenseCategoryHead
            selectedProductIds={selected}
            order={order}
            onSelectAllClick={handleSelectAllClick}
            onRequestSort={handleRequestSort}
            // rowCount={props?.positionData?.length}
            onMenuItemClick={handleDeselect}
          />
          <TableBody>
            {_.orderBy(
              expenseDetails,
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
              // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
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
                    <TableCell>{n.category}</TableCell>
                    <TableCell>{moment(n?.createdAt).format('DD/MM/YYYY')}</TableCell>
                    <TableCell className="p-4 md:p-16 truncate" component="th" scope="row">
                      <Tooltip title="Edit">
                        <IconButton onClick={() => setEditClick(n)}>
                          <Edit />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete">
                        <IconButton onClick={() => handleClickOpen(n.id)}>
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
        {expenseDetails?.length < totalCount && (
          <Box className="relative flex justify-center p-12">
            {expenseDetails?.length >= 10 && (
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

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Delete expense category</DialogTitle>
        <DialogContent>
          <DialogContentText>Are you sure you want to delete?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={(e) => onDeleteJobPosition(selectedId)}>Yes</Button>
          <Button onClick={(e) => handleClose()}>No</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default withRouter(ExpenseCategoryTable);
