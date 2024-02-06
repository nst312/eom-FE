import {useCallback, useEffect, useState} from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import { useDispatch, useSelector } from 'react-redux';
import DialogContent from '@mui/material/DialogContent';
import { Controller, useForm } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import {approvedExpenseStatus, closeExpenseStatusDialog, rejectExpenseStatus} from '../store/expenseSlice';
import {showMessage} from "../../../../../store/fuse/messageSlice";
import {getAllLeave, rejectLeave} from "../../../admin-leave/store/leaveSlice";

const defaultValues = {};
const schema = yup.object().shape({});

const ExpenseStatusDialog = () => {
  const dispatch = useDispatch();

  const [isRejected, setIsRejected] = useState(false);
  const expenseStatusDialog = useSelector(
    ({ expenseApp }) => expenseApp.expense.ExpenseStatusDialog
  );

  const { data } = expenseStatusDialog;
  console.log('expenseStatusDialog', data?.status);
  const { handleSubmit, formState, reset, control, getValues, setValue } = useForm({
    mode: 'onChange',
    defaultValues,
    resolver: yupResolver(schema),
  });
  const { errors, isValid, dirtyFields } = formState;



    const initDialog = useCallback(() => {

        if (expenseStatusDialog.type === 'new') {
            reset({
                ...defaultValues,
                ...expenseStatusDialog.data,
            });
        }
    }, [expenseStatusDialog.data, expenseStatusDialog.type, reset]);



    useEffect(() => {
        if (expenseStatusDialog.props.open) {
            initDialog();
        }
    }, [expenseStatusDialog.props.open, initDialog]);

  const closeDialog = () => {
    dispatch(closeExpenseStatusDialog());
    setIsRejected(false);
  };



  const approvedExpense = () => {
    setIsRejected(false);
    dispatch(
      approvedExpenseStatus({
        approvedAmount: Number(getValues().submittedAmount) || data.approvedAmount,
        id: data.id,
      })
    ).then((res) => {
      if (res.payload) {
          closeDialog();
      }
    });
  };


    const rejectExpense = () => {
        if (!isRejected) {
            setIsRejected(true);
        } else if (getValues().rejectReason === null) {
            dispatch(showMessage({ message: 'Please enter any reason for reject Expense' }));
        } else {
            dispatch(rejectExpenseStatus({ rejectReason: getValues().rejectReason, id: data.id })).then((res) => {
                if (res.payload) {
                    closeDialog();
                }
            });
        }
    };



  return (
    <>
      <Dialog
        {...expenseStatusDialog.props}
        onClose={closeDialog}
        fullWidth
        maxWidth="sm"
        scroll="body"
      >
        <AppBar position="static" elevation={0}>
          <Toolbar className="flex w-full">
            <Typography variant="subtitle1" color="inherit" onClick={() => closeDialog()}>
              Expense Status Dialog
            </Typography>
          </Toolbar>
        </AppBar>
        <form>
          <DialogContent classes={{ root: 'p-0' }}>
            <div className="px-16 mt-16 sm:px-24">
              <FormControl className="mt-4" fullWidth>
                <Controller
                  name="submittedAmount"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Approved Amount"
                      variant="outlined"
                      className="mt-8 mb-16 mx-4"
                      type="number"
                    />
                  )}
                />
              </FormControl>
              {(isRejected || data?.status === 'REJECTED') && (
                <FormControl className="mt-4" fullWidth>
                  <Controller
                    name="rejectReason"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Reject Reason"
                        variant="outlined"
                        className="mt-8 mb-16 mx-4"
                        type="number"
                        rows={5}
                        multiline
                      />
                    )}
                  />
                </FormControl>
              )}
            </div>
          </DialogContent>
          {data?.status !== 'REJECTED' && data?.status !== 'APPROVED' && (
          <DialogActions>
            <Button color="success" variant="contained" onClick={approvedExpense}>
              Approved
            </Button>
            <Button color="error" variant="contained" onClick={rejectExpense}>
              Reject
            </Button>
          </DialogActions>
          )}
          {/*<pre>{JSON.stringify(getValues(), null, ' ')}</pre>*/}
        </form>
      </Dialog>
    </>
  );
};

export default ExpenseStatusDialog;
