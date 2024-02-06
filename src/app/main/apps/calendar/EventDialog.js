import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { DateTimePicker } from '@mui/lab';
import { useCallback, useEffect, useState } from 'react';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import _ from '@lodash';
import Autocomplete from '@mui/material/Autocomplete';
import IconButton from '@mui/material/IconButton';
import { Icon, Chip } from '@mui/material';
import {
  addLeave,
  closeEditEventDialog,
  closeNewEventDialog,
  getAllLeaveHistory,
  removeLeaves,
  requestEmployeeLeave,
  updateLeave,
} from './store/eventsSlice';
import LeaveHistory from './LeaveHistory';

const options = [
  { label: 'Sick Leave', value: 'SICK_LEAVE' },
  { label: 'Paid Leave', value: 'PAID_LEAVE' },
  { label: 'Un Paid Leave', value: 'UN_PAID_LEAVE' },
];

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
  leaveType: yup.string().required('You must enter a leaves types'),
  start: yup
    .date()
    .transform(function (value, originalValue) {
      if (this.isType(value)) {
        return value;
      }
      const result = moment(originalValue).format('L');
      return result;
    })
    .typeError('please enter a valid date')
    .required('You must select start date')
    .min(new Date(), 'Start date should be less than end date')
    .max(yup.ref('end'), "Start date can't be before end date")
    .nullable(),

  end: yup
    .date()
    .transform(function (value, originalValue) {
      if (this.isType(value)) {
        return value;
      }
      const result = moment(originalValue).format('L');
      return result;
    })
    .typeError('please enter a valid date')
    .required('You must select end date')
    .min(yup.ref('start'), 'End date should be grater than start date')
    .nullable(),

  description: yup.string().required('You must enter a description'),
});

function EventDialog({ getData, setGetData }) {
  const dispatch = useDispatch();
  const leaveEmpDialog = useSelector(({ empLeaveApp }) => empLeaveApp.events.leavesDialog);
  const [openLeaveHistory, setOpenLeaveHistory] = useState(false);
  const [requestTextarea, setRequestTextarea] = useState(false);
  const [leaveData, setLeaveData] = useState(null);
  const [historyData, setHistoryData] = useState([]);
  const defaultValues = leaveEmpDialog.data;
  const { reset, formState, watch, control, getValues, setValue } = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(schema),
  });

  const { isValid, dirtyFields, errors } = formState;

  const start = watch('start');
  const end = watch('end');

  useEffect(() => {
    if (dirtyFields.end) {
      const a = moment(start, 'mm/dd/yyyy');
      const b = moment(end, 'mm/dd/yyyy');
      const c = b.diff(a, 'days') + 1;
      const duration = Number(isNaN(c)) ? 0 : c;
      setValue('durationCount', duration);
    } else if (dirtyFields.start) {
      const a = moment(end, 'mm/dd/yyyy');
      const b = moment(start, 'mm/dd/yyyy');
      const c = b.diff(a, 'days') + 1;
      const duration = Number(isNaN(c)) ? 0 : c;
      setValue('durationCount', duration);
    } else {
      console.log('return useEffect');
    }
  }, [formState]);

  /**
   * Initialize Dialog with Data
   */
  const initDialog = useCallback(() => {
    /**
     * Dialog type: 'edit'
     */
    if (leaveEmpDialog.type === 'edit' && leaveEmpDialog.data) {
      reset({ ...leaveEmpDialog.data });
    }

    /**
     * Dialog type: 'new'
     */
    if (leaveEmpDialog.type === 'new') {
      reset({
        ...defaultValues,
        ...leaveEmpDialog.data,
      });
    }
  }, [leaveEmpDialog.data, leaveEmpDialog.type, reset]);

  /**
   * On Dialog Open
   */
  useEffect(() => {
    if (leaveEmpDialog.props.open) {
      initDialog();
    }
  }, [leaveEmpDialog.props.open, initDialog]);

  /**
   * Close Dialog
   */
  function closeComposeDialog() {
    setOpenLeaveHistory(false);
    setRequestTextarea(false);
    return leaveEmpDialog.type === 'edit'
      ? dispatch(closeEditEventDialog())
      : dispatch(closeNewEventDialog());
  }

  /**
   * Form Submit
   */

  function onSubmit(ev) {
    ev.preventDefault();
    const _data = getValues();

    console.log('_data', _data);

    let i = 0;
    const strLength = _data.leaveType.length;
    for (i; i < strLength; i++) {
      _data.leaveType = _data.leaveType.replace(' ', '_').toUpperCase();
    }
    const details = {
      ..._data,
      leaveType: _data.leaveType,
    };
    console.log('details', details);

    if (leaveEmpDialog.type === 'new') {
      dispatch(addLeave(details)).then((res) => {
        if (res.payload) {
          const newArr = [...getData];
          newArr.push(res.payload);
          setGetData(newArr);
        }
      });
    } else {
      dispatch(updateLeave(details)).then((res) => {
        if (res.payload) {
          const newArr = [...getData];
          const index = newArr.findIndex((item) => item.id === res.payload.id);
          newArr.splice(index, 1, { ...res.payload });
          setGetData(newArr);
        }
      });
    }
    closeComposeDialog();
  }

  const leaveId = leaveEmpDialog.data && leaveEmpDialog.data.publicId;
  /**
   * Remove Event
   */
  const handleRemove = () => {
    const _data = getValues();
    const id = _data.publicId;
    dispatch(removeLeaves(id)).then((res) => {
      if (res.payload) {
        const newArr = [...getData];
        const index = newArr.findIndex((item) => item.id === res.payload.id);
        newArr.splice(index, 1, { ...res.payload });
        setGetData(newArr);
      }
    });
    closeComposeDialog();
  };

  useEffect(() => {
    if (leaveId) {
      dispatch(getAllLeaveHistory(leaveId)).then((res) => {
        if (res.payload) {
          setHistoryData(res.payload);
        } else {
          setHistoryData([]);
        }
      });
    }
  }, [leaveEmpDialog.data]);

  const requestSend = () => {
    if (!requestTextarea) {
      setRequestTextarea(true);
    } else {
      const payload = {
        message: leaveData,
        id: leaveEmpDialog.data.publicId,
      };
      dispatch(requestEmployeeLeave(payload));
      closeComposeDialog();
    }
  };

  return (
    <Dialog
      {...leaveEmpDialog.props}
      // setHideDialog{}
      onClose={closeComposeDialog}
      fullWidth
      maxWidth="xs"
      // component="form"
    >
      <AppBar position="static" elevation={0}>
        <Toolbar className="flex w-full justify-between">
          <Typography variant="subtitle1" color="inherit">
            {leaveEmpDialog.type === 'new' ? 'Apply For Leave' : 'Edit For Leave'}
          </Typography>
          <Typography variant="subtitle1" color="inherit">
            {leaveEmpDialog.data?.status === 'APPROVED' && (
              <Chip
                className="border-white text-white"
                label="Approved"
                color="success"
                variant="outlined"
              />
            )}
            {leaveEmpDialog.data?.status === 'REJECT' && (
              <Chip
                className="border-white text-white"
                label="Rejected"
                color="success"
                variant="outlined"
              />
            )}
            {leaveEmpDialog.data?.status === 'APPLIED' && (
              <Chip
                className="border-white text-white"
                label="Applied"
                color="success"
                variant="outlined"
              />
            )}
            {leaveEmpDialog.data?.status === 'CANCELLED' && (
              <Chip
                className="border-white text-white"
                label="Cancelled"
                color="success"
                variant="outlined"
              />
            )}
          </Typography>
        </Toolbar>
      </AppBar>

      <form noValidate>
        <DialogContent classes={{ root: 'p-16 pb-0 sm:p-24 sm:pb-0' }}>
          <div>
            <Controller
              name="leaveType"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Autocomplete
                  id="grouped-demo"
                  options={options}
                  required
                  value={value.replaceAll('_', ' ')}
                  groupBy={(option) => option.firstLetter}
                  getOptionLabel={(option) => {
                    if (typeof option === 'string') {
                      return option;
                    }
                    if (option.label) {
                      return option.label;
                    }
                    return option.label;
                  }}
                  onChange={(event, newValue) => {
                    onChange(newValue.label);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      required
                      error={!!errors.leaveTypes}
                      helperText={errors?.leaveTypes?.message}
                      FormHelperTextProps={{ style: { color: 'red' } }}
                      variant="outlined"
                      placeholder="Leave Type"
                    />
                  )}
                />
              )}
            />

            <Controller
              name="start"
              control={control}
              defaultValue=""
              render={({ field: { onChange, value } }) => (
                <DateTimePicker
                  value={value || ''}
                  onChange={onChange}
                  renderInput={(_props) => (
                    <TextField
                      id="start"
                      label="start"
                      type="date"
                      required
                      error={!!errors.start}
                      helperText={errors?.start?.message}
                      FormHelperTextProps={{ style: { color: 'red' } }}
                      className="mt-8 mb-16 w-full"
                      {..._props}
                    />
                  )}
                  className="mt-8 mb-16 w-full"
                  maxDateTime={end}
                />
              )}
            />

            <Controller
              name="end"
              control={control}
              defaultValue=""
              render={({ field: { onChange, value } }) => (
                <DateTimePicker
                  value={value}
                  onChange={onChange}
                  renderInput={(_props) => {
                    return (
                      <TextField
                        id="end"
                        label="end"
                        type="date"
                        error={!!errors.end}
                        helperText={errors?.end?.message}
                        FormHelperTextProps={{ style: { color: 'red' } }}
                        required
                        className="mt-8 mb-16 w-full"
                        {..._props}
                      />
                    );
                  }}
                  minDateTime={start}
                />
              )}
            />

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

            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mt-8 mb-16"
                  id="desc"
                  label="Description"
                  type="text"
                  multiline
                  required
                  rows={5}
                  error={!!errors.description}
                  helperText={errors?.description?.message}
                  variant="outlined"
                  fullWidth
                />
              )}
            />
          </div>

          {requestTextarea && (
            <Controller
              name="message"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  name="message"
                  className="mt-8 mb-16"
                  label="Request Message"
                  multiline
                  required
                  onChange={(e) => setLeaveData(e.target.value)}
                  rows={2}
                  variant="outlined"
                  fullWidth
                />
              )}
            />
          )}
        </DialogContent>

        {leaveEmpDialog.type === 'new' ? (
          <DialogActions className="justify-between px-8 sm:px-16 pb-16">
            <Button
              variant="contained"
              color="primary"
              onClick={onSubmit}
              disabled={_.isEmpty(dirtyFields) || !isValid}
            >
              Add
            </Button>
          </DialogActions>
        ) : (
          <DialogActions className="justify-between px-8 sm:px-16 pb-16">
            {leaveEmpDialog?.data?.status !== 'CANCELLED' &&
              leaveEmpDialog?.data?.status !== 'APPROVED' &&
              leaveEmpDialog?.data?.status !== 'REJECT' && (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={onSubmit}
                  disabled={_.isEmpty(dirtyFields) || !isValid}
                >
                  Save
                </Button>
              )}
            {leaveEmpDialog?.data?.status === 'APPROVED' && (
              <Button
                variant="contained"
                color="primary"
                onClick={requestSend}
                disabled={requestTextarea && leaveData === null}
              >
                Request to change
              </Button>
            )}
            <div>
              {historyData.length > 0 && (
                <>
                  {!openLeaveHistory ? (
                    <IconButton onClick={() => setOpenLeaveHistory(true)} size="large">
                      <Icon>history</Icon>
                    </IconButton>
                  ) : (
                    <IconButton onClick={() => setOpenLeaveHistory(false)} size="large">
                      <Icon>close</Icon>
                    </IconButton>
                  )}{' '}
                </>
              )}
              {leaveEmpDialog?.data?.status !== 'CANCELLED' && (
                <IconButton onClick={(e) => handleRemove()} size="large">
                  <Icon>delete</Icon>
                </IconButton>
              )}
            </div>
          </DialogActions>
        )}
        {/* <pre>{JSON.stringify(getValues(), useForm(), null, 2)}</pre> */}
      </form>
      <DialogContent classes={{ root: 'p-16 pb-0 sm:p-24 sm:pb-0' }}>
        {openLeaveHistory && <LeaveHistory historyData={historyData} />}
      </DialogContent>
    </Dialog>
  );
}

export default EventDialog;
