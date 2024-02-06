import Table from '@mui/material/Table';
import { useEffect, useState } from 'react';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import clsx from 'clsx';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment/moment';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import { Edit } from '@mui/icons-material';
import DeleteIcon from '@mui/icons-material/Delete';
import { motion } from 'framer-motion';
import ExpenseTableHead from './ExpenseHead';
import FuseScrollbars from '../../../../../../@fuse/core/FuseScrollbars';
import withRouter from '../../../../../../@fuse/core/withRouter';
import {allExpense, deleteExpense, openEditExpenseDialog, openExpenseStatusDialog} from '../store/expenseSlice';

function ExpenseList() {
  const dispatch = useDispatch();
  const [selected, setSelected] = useState([]);
  const [expenseCategory, setExpenseCategory] = useState([]);
  const expenseData = useSelector(({ expenseApp }) => expenseApp.expense.expenseData);
  const [order, setOrder] = useState({
    direction: 'asc',
    id: null,
  });

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
      // setSelected(props.positionData.map((n) => n.id));
      return;
    }
    setSelected([]);
  }

  function handleDeselect() {
    setSelected([]);
  }

  useEffect(() => {
    dispatch(allExpense()).then((res) => {
      setExpenseCategory(res.payload);
    });
  }, [dispatch]);

  const onDeleteExpense = (id) => {
    dispatch(deleteExpense({ id })).then((res) => {});
  };

  if (expenseData?.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.1 } }}
        className="flex flex-1 items-center justify-center h-full"
      >
        <Typography color="textSecondary" variant="h5">
          Expense not found!
        </Typography>
      </motion.div>
    );
  }

  const handleStatusDialog = (data) => {
      dispatch(openExpenseStatusDialog(data))
  }

  return (
    <>
      <div className="w-full flex flex-col">
        <FuseScrollbars className="grow overflow-x-auto">
          <Table stickyHeader className="min-w-xl" aria-labelledby="tableTitle">
            <ExpenseTableHead
              selectedProductIds={selected}
              order={order}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              onMenuItemClick={handleDeselect}
            />
            <TableBody>
              {expenseData?.length > 0 &&
                expenseData?.map((column, index) => {
                  return (
                    <TableRow key={index}>
                      <TableCell className="p-4 md:p-16" component="th" scope="row">
                        {moment(column.expenseDate).format('DD/MM/YYYY')}
                      </TableCell>
                      <TableCell className="p-4 md:p-16" component="th" scope="row">
                        {column.category.category}
                      </TableCell>
                      <TableCell className="p-4 md:p-16" component="th" scope="row">
                        {column.submittedAmount}
                      </TableCell>
                      <TableCell className="p-4 md:p-16" component="th" scope="row">
                        {column.approvedAmount}
                      </TableCell>
                      <TableCell className="p-4 md:p-16" component="th" scope="row">
                        <Typography
                          className={clsx(
                            'inline-block rounded-full px-10 py-5 cursor-pointer',
                              column.status === 'PENDING' && 'bg-gray-200',
                              column.status === 'APPROVED' && 'bg-green text-white',
                              column.status === 'REJECTED' && 'bg-red text-white',
                          )}

                          onClick={() => handleStatusDialog(column)}
                        >
                          {column.status}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Tooltip title="Edit">
                          <IconButton>
                            <Edit onClick={() => dispatch(openEditExpenseDialog(column))} />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete">
                          <IconButton>
                            <DeleteIcon onClick={() => onDeleteExpense(column.id)} />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </FuseScrollbars>
      </div>
    </>
  );
}
export default withRouter(ExpenseList);
