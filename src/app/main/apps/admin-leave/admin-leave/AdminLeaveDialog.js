import Dialog from '@mui/material/Dialog';
import { yupResolver } from '@hookform/resolvers/yup';
import { DialogActions, DialogContent, TextField } from '@mui/material';
import Button from '@mui/material/Button';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import DialogContentText from '@mui/material/DialogContentText';
import { Controller, useForm } from 'react-hook-form';
import { DateTimePicker } from '@mui/lab';
import * as yup from 'yup';
import { useEffect } from 'react';
import { showMessage } from '../../../../store/fuse/messageSlice';
import { approvedLeave, getAllLeave, rejectLeave, updateAdminLeave } from '../store/leaveSlice';

const schema = yup.object().shape({
  // start: yup.date()
  // .transform(function (value, originalValue) {
  //         if (this.isType(value)) {
  //             return value;
  //         }
  //         const result = moment(originalValue).format('L')
  //         return result;
  //     })
  //     .typeError("please enter a valid date")
  //     .required("You must select start date")
  //     .min(new Date() ,'Start date should be less than end date')
  //     .max(yup.ref('end'), "Start date can't be before end date").nullable(),
  //
  //
  // end: yup.date()
  //     .transform(function (value, originalValue) {
  //         if (this.isType(value)) {
  //             return value;
  //         }
  //         const result = moment(originalValue).format('L')
  //         return result;
  //     })
  //     .typeError("please enter a valid date")
  //     .required("You must select end date")
  //     .min(yup.ref('start'), "End date should be grater than start date").nullable(),
});

function AdminLeavesDialog({
  leave,
  handleClose,
  open,
  data,
  setData,
  reason,
  handleChangeReason,
  isRejected,
  setIsRejected,
  setIsEdit,
  isEdit,
}) {
  const dispatch = useDispatch();

  const defaultValues = leave;
  console.log('leave', leave);


  const { control, watch, formState, reset, getValues, setValue } = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(schema),
  });

  console.log("getvalues",getValues());

  const { isValid, dirtyFields, errors } = formState;

  useEffect(() => {
    if (!defaultValues) {
      return;
    }
    reset(defaultValues);
  }, [leave, reset]);

  useEffect(() => {
    if(dirtyFields.end){
      const a = moment(start, 'mm/dd/yyyy');
      const b = moment(end, 'mm/dd/yyyy');
      const c = b.diff(a, 'days') + 1;
      const duration = Number(isNaN(c)) ? 0 : c;
      setValue('durationCount', duration);
    } else if(dirtyFields.start){
      const a = moment(end, 'mm/dd/yyyy');
      const b = moment(start, 'mm/dd/yyyy');
      const c = b.diff(a, 'days') + 1;
      const duration = Number(isNaN(c)) ? 0 : c;
      setValue('durationCount', duration);
    }else{
      console.log('return useEffect')
    }
  },[formState])



  const start = watch('start');
  const end = watch('end');


  const approvedLeaves = () => {
    setIsRejected(false);
    dispatch(approvedLeave({ id: leave.id })).then((res) => {
      if (res.payload) {
        const newArr = [...data];
        const index = newArr.findIndex((item) => item.id === leave.id);
        const singleLeave = newArr.find((el) => el.id === leave.id);
        const newLeave = { ...singleLeave, ...{ status: res.payload.status } };
        newArr.splice(index, 1, { ...newLeave });
        setData(newArr);
        dispatch(getAllLeave({ page: 1, perPage: 10 }));
        handleClose(false);
      }
    });
  };

  const rejectLeaves = () => {
    if (!isRejected) {
      setIsRejected(true);
    } else if (reason === null) {
      dispatch(showMessage({ message: 'Please enter any reason for reject leave' }));
    } else {
      dispatch(rejectLeave({ reason, id: leave.id })).then((res) => {
        if (res.payload) {
          const newArr = [...data];
          const index = newArr.findIndex((item) => item.id === leave.id);
          const singleLeave = newArr.find((el) => el.id === leave.id);
          const newLeave = { ...singleLeave, ...{ status: res.payload.status } };
          newArr.splice(index, 1, { ...newLeave });
          setData(newArr);
          dispatch(getAllLeave({ page: 1, perPage: 10 }));
          handleClose(false);
        }
      });
    }
  };


  const editLeaves = () => {
    // const _data = getValues();
    const leaveData = {
      id: leave.id,
      start : getValues().start,
      end : getValues().end,
      durationCount: getValues().durationCount,
      leaveType : 'APPROVED'
    }
    dispatch(updateAdminLeave(leaveData)).then((res) => {
      if (res.payload) {
        const newArr = [...data];
        console.log('newArrdata', newArr);
        const index = newArr.findIndex((item) => item.id ===  res.payload.id);
        newArr.splice(index, 1, { ...res.payload });
        setData(newArr);
        dispatch(getAllLeave({ page: 1, perPage: 10 }));
        handleClose(false);
      }
    });
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <AppBar position="static" elevation={0}>
        <Toolbar className="flex w-full">
          <Typography variant="subtitle1" color="inherit" className="text-24">
            Employee Leave Details
          </Typography>
        </Toolbar>
      </AppBar>
      <form noValidate>
        <DialogContent className="flex flex-col gap-10  text-16">
          {isEdit && leave.status === 'APPROVED' && (
            <Controller
              name="start"
              control={control}
              render={({ field: { onChange, value } }) => (
                <DateTimePicker
                  value={value}
                  onChange={onChange}
                  renderInput={(_props) => (
                    <TextField
                      id="start"
                      type="date"
                      label="start"
                      error={!!errors.start}
                      helperText={errors?.start?.message}
                      FormHelperTextProps={{ style: { color: 'red' } }}
                      required
                      className="mt-8 mb-16 w-full"
                      {..._props}
                    />
                  )}
                  className="mt-8 mb-16 w-full"
                  maxDateTime={end}
                />
              )}
            />
          )}
          {isEdit && leave.status === 'APPROVED' && (
            <Controller
              name="end"
              control={control}
              render={({ field: { onChange, value } }) => (
                <DateTimePicker
                  value={value}
                  onChange={onChange}
                  renderInput={(_props) => (
                    <TextField
                      id="end"
                      type="date"
                      label="end"
                      error={!!errors.start}
                      helperText={errors?.start?.message}
                      FormHelperTextProps={{ style: { color: 'red' } }}
                      required
                      className="mt-8 mb-16 w-full"
                      {..._props}
                    />
                  )}
                  className="mt-8 mb-16 w-full"
                  maxDateTime={start}
                />
              )}
            />
          )}
          {isEdit && leave.status === 'APPROVED' && (
            <Controller
              name="durationCount"
              defaultValue=""
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mt-8 mb-16"
                  variant="outlined"
                  fullWidth
                  placeholder="durationCount"
                  label="Duration"
                  disabled
                />
              )}
            />
          )}
          <DialogContentText id="alert-dialog-description">
            {/* Employee Name :  {leave?.employees?.users && leave.employees?.users.displayName || `${leave.employees?.users.firstName} ${leave.employees?.users.lastName}`} */}
            Employee Name:{' '}
            {`${leave.employees?.users.firstName}   ${leave.employees?.users.lastName}`}
          </DialogContentText>
          <DialogContentText id="alert-dialog-description">
            Type : {leave.leaveType === 'SICK_LEAVE' && 'Sick Leave'}
            {leave.leaveType === 'PAID_LEAVE' && 'Paid Leave'}
            {leave.leaveType === 'UN_PAID_LEAVE' && 'Un Paid Leave'}
          </DialogContentText>
          {leave.status === 'APPLIED' && leave.status === 'REJECT' &&
          <DialogContentText id="alert-dialog-description">
            Start Date : {moment(leave.start).format('L')}
          </DialogContentText>
          }
          {leave.status === 'APPLIED' && leave.status === 'REJECT' &&
              <DialogContentText id="alert-dialog-description">
                End Date : {moment(leave.end).format('L')}
              </DialogContentText>
          }
          {leave.status === 'APPLIED' && leave.status === 'REJECT' &&
              <DialogContentText id="alert-dialog-description">
                Days : {leave.durationCount}
              </DialogContentText>
          }
          <DialogContentText id="alert-dialog-description">
            Description : {leave.description}
          </DialogContentText>
          {(isRejected || leave.status === 'REJECT') && (
            <DialogContentText id="alert-dialog-description" className="mb-5 mr-5">
              Reason :
              <div className="mt-8">
                <TextField
                  id="reason"
                  // label="Reason"
                  onChange={(e) => {
                    handleChangeReason(e.target.value);
                  }}
                  className="w-full "
                  multiline
                  rows={4}
                  disabled={leave.status !== 'APPLIED'}
                  value={reason === null ? leave.reason : reason}
                />
              </div>
            </DialogContentText>
          )}
        </DialogContent>
      </form>

      <DialogActions>
        {isEdit && leave.status === 'APPROVED' && (
          <Button color="success" variant="contained" onClick={(event) => editLeaves()} autoFocus>
            Save
          </Button>
        )}

        {!isEdit && leave.status === 'APPROVED' && (
          <Button color="success" variant="contained" onClick={() => setIsEdit(true)} autoFocus>
            Edit
          </Button>
        )}
      </DialogActions>

      {leave.status === 'APPLIED' && (
        <DialogActions>
          {/*{!isRejected && (*/}
            <Button
              color="success"
              variant="contained"
              onClick={approvedLeaves}
              disabled={reason === ''}
            >
              Approve
            </Button>
          {/*)}*/}
          <Button
            color="error"
            variant="contained"
            onClick={rejectLeaves}
            disabled={reason === ''}
            autoFocus
          >
            Reject
          </Button>
        </DialogActions>
      )}
    </Dialog>
  );
}

export default AdminLeavesDialog;
