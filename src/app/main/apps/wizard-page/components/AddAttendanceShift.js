import { Box } from '@mui/system';
import FormControl from '@mui/material/FormControl';
import { Controller, useForm } from 'react-hook-form';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { Stack } from '@mui/material';
import TimePicker from '@mui/lab/TimePicker';
import TextField from '@mui/material/TextField';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import moment from 'moment/moment';
import * as yup from 'yup';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import { showMessage } from '../../../../store/fuse/messageSlice';
import _ from '../../../../../@lodash';

const defaultValues = {};

const schema = yup.object().shape({});

const AddAttendanceShift = ({ setAttendance, attendance, attendanceData, setAttendanceData }) => {
  const [data, setData] = useState(new Date());
  const user = useSelector(({ auth }) => auth.user);
  const dispatch = useDispatch();

  const { handleSubmit, control, formState, reset, getValues, setValue } = useForm({
    mode: 'onChange',
    defaultValues: {
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
      durationCount: '',
      fullDayWorkDuration: '',
    },
    resolver: yupResolver(schema),
  });

  const { errors, dirtyFields, isValid } = formState;

  const overLapStartTime = moment(getValues().shiftInTime, 'DD-MM-YYYY');
  const overLapEndTime = moment(getValues().shiftOutTime, 'DD-MM-YYYY').add(1, 'days');
  const overLapDiff = moment(overLapEndTime, 'HH:mm:ss').diff(moment(overLapStartTime, 'HH:mm:ss'));
  const overLapDur = moment.duration(overLapDiff);
  const overLapHours = overLapDur.hours();

  console.log("overLapHours", overLapHours)

  const onSubmit = (values) => {
    console.log('values', values);
    if (attendanceData) {
      const arr = {
        shiftInTime: getValues().shiftInTime,
        shiftOutTime: getValues().shiftOutTime,
        // durationCount: Number(getValues().durationCount),
        durationCount: Number(overLapHours),
        fullDayWorkDuration: Number(getValues().fullDayWorkDuration),
      };

      console.log(arr);
      setAttendanceData(arr);
      // dispatch(
      //   showMessage({ variant: 'success', message: 'Attendance Shift added successfully.' })
      // );
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box className="grid grid-cols-6 gap-4">
        <div className="col-start-2 col-span-4">
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
                  value={overLapHours}
                  // value={getValues().Checkbox === true ? overLapHours : hrs}
                  variant="outlined"
                  fullWidth
                  required
                  // helperText={hrs >= 10 || hrs <= 0 ? helperText : ''}
                  error={!!errors.durationCount}
                  FormHelperTextProps={{ style: { color: 'red' } }}
                  placeholder="durationCount"
                  label="Duration"
                  disabled
                />
              )}
            />
          </FormControl>
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
          <Button
            className="col-start-1 col-end-3 rounded-2"
            size="large"
            fullWidth
            type="submit"
            variant="contained"
            color="secondary"
            disabled={_.isEmpty(dirtyFields) || !isValid}
          >
            Add Attendance Shift
          </Button>
        </div>
      </Box>
    </form>
  );
};
export default AddAttendanceShift;
