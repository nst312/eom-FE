import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useDispatch, useSelector } from 'react-redux';
import DialogContent from '@mui/material/DialogContent';
import FormControl from '@mui/material/FormControl';
import { Controller, useForm } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import * as yup from 'yup';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import TimePicker from '@mui/lab/TimePicker';
import { useCallback, useEffect, useState } from 'react';
import { FormControlLabel, Stack } from '@mui/material';
import moment from 'moment';
import Checkbox from '@mui/material/Checkbox';
import FormLabel from '@mui/material/FormLabel';
import FormHelperText from '@mui/material/FormHelperText';
import {
  addAttendanceRules,
  closeAttendanceShiftDialog,
  updateAttendanceRules,
} from '../store/attendanceShiftSlice';

const defaultValues = {
  shiftInTime: moment()
    .set({
      hour: 10,
      minute: 0,
      second: 0,
    })
    .toDate(),

  shiftOutTime: moment()
    .set({
      hour: 19,
      minute: 0,
      second: 0,
    })
    .toDate(),
  Checkbox: false,
};

const schema = yup.object().shape({});

function AttendanceShiftDialog() {
  const dispatch = useDispatch();
  const user = useSelector(({ auth }) => auth.user);
  const attendanceDialog = useSelector(
    ({ attendanceApp }) => attendanceApp.attendanceShiftData?.attendanceShiftDialog
  );
  const [data, setData] = useState(new Date());

  const closeDialog = () => {
    dispatch(closeAttendanceShiftDialog());
  };

  const { handleSubmit, formState, reset, control, getValues, setValue, watch } = useForm({
    mode: 'onChange',
    defaultValues,
    resolver: yupResolver(schema),
  });
  const { isValid, dirtyFields, errors } = formState;
  const helperText =
    'The duration for the shift is more than 10 hours. Please check again and confirm.';

  const initDialog = useCallback(() => {
    /**
     * Dialog type: 'edit'
     */
    if (attendanceDialog.type === 'edit' && attendanceDialog.data) {
      reset({ ...attendanceDialog.data });
    }

    /**
     * Dialog type: 'new'
     */
    if (attendanceDialog.type === 'new') {
      reset({
        ...defaultValues,
        ...attendanceDialog.data,
      });
    }
  }, [attendanceDialog?.data, attendanceDialog?.type, reset]);

  useEffect(() => {
    if (attendanceDialog?.props.open) {
      initDialog();
    }
  }, [attendanceDialog?.props.open, initDialog]);


  const startTime = moment(getValues().shiftInTime).format('HH:mm:ss a');
  const endTimess = moment(getValues().shiftOutTime).format('HH:mm:ss a');
  const ms = moment(endTimess, 'HH:mm:ss').diff(moment(startTime, 'HH:mm:ss'));
  const d = moment.duration(ms);
  const hrs = d.hours();

  const overLapStartTime = moment(getValues().shiftInTime, 'DD-MM-YYYY');
  const overLapEndTime = moment(getValues().shiftOutTime, 'DD-MM-YYYY').add(1, 'days');
  const overLapDiff = moment(overLapEndTime, 'HH:mm:ss').diff(moment(overLapStartTime, 'HH:mm:ss'));
  const overLapDur = moment.duration(overLapDiff);
  const overLapHours = overLapDur.hours();

  const onSubmit = (e) => {
    e.preventDefault();
    const attendanceData = {
      ruleName: getValues().ruleName,
      Description: getValues().Description,
      shiftInTime: getValues().shiftInTime,
      durationCount: Number(getValues().durationCount),
      shiftOutTime: getValues().shiftOutTime,
      fullDayWorkDuration: Number(getValues().fullDayWorkDuration),
      halfDayWorkDuration: Number(getValues().halfDayWorkDuration),
      totalBreakDuration: Number(getValues().totalBreakDuration),
      noOfBreaks: Number(getValues().noOfBreaks),
    };
    if (attendanceDialog.type === 'new') {
      dispatch(addAttendanceRules({ companyId: user.company_id, attendanceData })).then((res) => {
        if (res) {
          closeDialog();
        }
      });
    } else {
      dispatch(updateAttendanceRules({ id: getValues().id, attendanceData })).then((res) => {
        if (res) {
          closeDialog();
        }
      });
    }
  };

  return (
    <>
      <Dialog
        {...attendanceDialog?.props}
        onClose={closeDialog}
        fullWidth
        maxWidth="sm"
        scroll="body"
      >
        <AppBar position="static" elevation={0}>
          <Toolbar>
            <Typography variant="subtitle1" color="inherit" onClick={() => closeDialog()}>
              Work Shift
            </Typography>
          </Toolbar>
        </AppBar>
        <form>
          <DialogContent classes={{ root: 'p-0' }}>
            <div className="px-16 mt-16 sm:px-24">
              <FormControl className="mt-8 mb-16" fullWidth>
                <Controller
                  name="ruleName"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      {...field}
                      multiline
                      label="Shift Name"
                      placeholder="Shift Name"
                      autoFocus
                      variant="outlined"
                    />
                  )}
                />
              </FormControl>
              <FormControl className="mt-8 mb-16" fullWidth>
                <Controller
                  name="Description"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      {...field}
                      multiline
                      label="Description"
                      placeholder="Description"
                      variant="outlined"
                      rows={3}
                    />
                  )}
                />
              </FormControl>
              <div className="font-500 mt-10">
                <h2>Shift Timings</h2>
              </div>
              <div className="flex gap-2 mt-10">
                <FormControl className="mt-8 mb-16" fullWidth>
                  <Controller
                    name="shiftInTime"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <Stack spacing={3}>
                          <TimePicker
                            name="shiftInTime"
                            value={field.value}
                            onChange={(e) => {
                              setData(e);
                              setValue('shiftInTime', e);
                            }}
                            renderInput={(params) => <TextField {...params} />}
                          />
                        </Stack>
                      </LocalizationProvider>
                    )}
                  />
                </FormControl>

                <FormControl className="mt-8 mb-16" fullWidth>
                  <Controller
                    name="shiftOutTime"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <Stack spacing={3}>
                          <TimePicker
                            name="shiftOutTime"
                            value={field.value}
                            onChange={(e) => {
                              setData(e);
                              setValue('shiftOutTime', e);
                            }}
                            renderInput={(params) => <TextField {...params} />}
                          />
                        </Stack>
                      </LocalizationProvider>
                    )}
                  />
                </FormControl>
                <FormControl className="mt-8 mb-16" fullWidth>
                  <Controller
                    name="durationCount"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <TextField
                        {...field}
                        value={getValues().Checkbox === true ? overLapHours : hrs}
                        variant="outlined"
                        fullWidth
                        required
                        helperText={hrs >= 10 || hrs <= 0 ? helperText : ''}
                        error={!!errors.durationCount}
                        FormHelperTextProps={{ style: { color: 'red' } }}
                        placeholder="durationCount"
                        label="Duration"
                        disabled
                      />
                    )}
                  />
                </FormControl>
              </div>
              <div className="mt-32 mb-16">
                <Controller
                  name="Checkbox"
                  type="checkbox"
                  control={control}
                  render={({ field: { onChange, value, onBlur, ref } }) => (
                    <FormControl error={!!errors.Checkbox} required>
                      <FormLabel className="font-medium text-14" component="legend">
                        OverLap To Next Day
                      </FormLabel>
                      <FormControlLabel
                        label="OverLap To Next Day"
                        control={
                          <Checkbox
                            checked={value}
                            onBlur={onBlur}
                            onChange={(ev) => onChange(ev.target.checked)}
                            inputRef={ref}
                            required
                          />
                        }
                      />
                      <FormHelperText>{errors?.Checkbox?.message}</FormHelperText>
                    </FormControl>
                  )}
                />
              </div>
              <div className="font-500 mt-10">
                <h2>Shift Rules</h2>
                <ul className="list-disc">
                  <li className="ml-40 mt-5"> Grace Period </li>
                </ul>
              </div>
              <div className="flex gap-2 mt-10">
                <FormControl className="mt-8 mb-16" fullWidth>
                  <Controller
                    name="fullDayWorkDuration"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="No Of Min For InTime Grace Period"
                        type="number"
                        variant="outlined"
                        placeholder="No Of Min For InTime Grace Period"
                      />
                    )}
                  />
                </FormControl>
                <FormControl className="mt-8 mb-16" fullWidth>
                  <Controller
                    name="halfDayWorkDuration"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="No Of Min For OutTime Grace Period"
                        type="number"
                        variant="outlined"
                        placeholder="No Of Min For OutTime Grace Period"
                      />
                    )}
                  />
                </FormControl>
              </div>
              <div className="font-500 mt-10">
                <ul className="list-disc">
                  <li className="ml-40 mt-5"> Maximum Break Hours </li>
                </ul>
              </div>
              <div className="flex gap-2 mt-10">
                <FormControl className="mt-8 mb-16" fullWidth>
                  <Controller
                    name="totalBreakDuration"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="No Of Min"
                        type="number"
                        variant="outlined"
                        placeholder="No Of Min"
                      />
                    )}
                  />
                </FormControl>
              </div>
              <div className="font-500 mt-10">
                <ul className="list-disc">
                  <li className="ml-40 mt-5">Allow No Of Breaks </li>
                </ul>
              </div>
              <div className="flex gap-2 mt-10">
                <FormControl className="mt-8 mb-16" fullWidth>
                  <Controller
                    name="noOfBreaks"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="No Of Breaks"
                        type="number"
                        variant="outlined"
                        placeholder="No Of Breaks"
                      />
                    )}
                  />
                </FormControl>
              </div>
            </div>
          </DialogContent>
          {attendanceDialog.type === 'new' ? (
            <DialogActions className="justify-end px-8 py-16">
              <div className="px-16">
                <Button
                  className="h-40 my-12"
                  disabled={_.isEmpty(dirtyFields) || !isValid}
                  variant="contained"
                  type="submit"
                  onClick={onSubmit}
                >
                  Add
                </Button>
              </div>
            </DialogActions>
          ) : (
            <DialogActions className="justify-end px-8 py-16">
              <div className="px-16">
                <Button
                  className="h-40 my-12"
                  // disabled={_.isEmpty(dirtyFields) || !isValid}
                  variant="contained"
                  type="submit"
                  onClick={onSubmit}
                >
                  Update
                </Button>
              </div>
            </DialogActions>
          )}
        </form>
      </Dialog>
    </>
  );
}
export default AttendanceShiftDialog;
