import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { showMessage } from '../../../../store/fuse/messageSlice';

export const addWizardCsv = createAsyncThunk('wizardApp/addCsv', async (path, { dispatch }) => {
  try {
    const formData = new FormData();
    formData.append('path', path);
    const response = await axios.post('api/invitations/bulk-csv', formData);
    dispatch(
      showMessage({
        message: response.data.message,
        autoHideDuration: 4000,
        variant: 'success',
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'center',
        },
      })
    );
    return response;
  } catch (err) {
    dispatch(showMessage({ variant: 'error', message: err.response.data.message }));
    return err;
  }
});

export const addWizardIndividual = createAsyncThunk(
  'wizardApp/addWizardIndividual',
  async (
    {
      invitations,
      addAttendanceShiftForEmployee,
      addLeaveRulesForEmployee,
      setOpen,
      setSuccessOpen,
      setLoading,
    },
    { dispatch }
  ) => {
    try {
      const response = await axios.post('api/invitations/multiple', invitations);
      const data = await response.data;

      addAttendanceShiftForEmployee();
      addLeaveRulesForEmployee();
      if (data) {
        setOpen(false);
        setSuccessOpen(true);
      } else {
        setOpen(false);
      }
      setLoading(false);
      // dispatch(
      //   showMessage({
      //     message: response.data.message,
      //     variant: 'success',
      //     autoHideDuration: 4000,
      //     anchorOrigin: {
      //       vertical: 'top',
      //       horizontal: 'center',
      //     },
      //   })
      // );
      return data;
    } catch (err) {
      console.log('err', err.response.data);
      dispatch(showMessage({ variant: 'error', message: err.response.data.message }));
      return err;
    }
  }
);

export const addAttendanceShift = createAsyncThunk(
  'wizardApp/addAttendanceShift',
  async ({ attendanceData, companyId }, { dispatch }) => {
    try {

      console.log("attendanceData",attendanceData);

      const response = await axios.post(`api/attendance-shift/add/${companyId}`, attendanceData);
      const data = await response.data;

      console.log('/attendance-shift', data);

      // dispatch(
      //   showMessage({
      //     message: response.data.message,
      //     variant: 'success',
      //     autoHideDuration: 4000,
      //     anchorOrigin: {
      //       vertical: 'top',
      //       horizontal: 'center',
      //     },
      //   })
      // );
      return data;
    } catch (err) {
      dispatch(showMessage({ variant: 'error', message: err.response.data.message }));
      return err;
    }
  }
);

export const addLeaveRules = createAsyncThunk(
  'wizardApp/addLeaveRules',
  async (leaveData, { dispatch }) => {
    const leaveRulesWizard = {
      leaveRules: leaveData,
    };
    try {
      const response = await axios.post(`api/leave-rule/multipleLeave`, leaveRulesWizard);
      const data = await response.data;

      console.log('multipleLeave', data);

      // dispatch(
      //   showMessage({
      //     message: response.data.message,
      //     variant: 'success',
      //     autoHideDuration: 4000,
      //     anchorOrigin: {
      //       vertical: 'top',
      //       horizontal: 'center',
      //     },
      //   })
      // );

      return data;
    } catch (err) {
      dispatch(showMessage({ variant: 'error', message: err.response.data.message }));
      return err;
    }
  }
);

const wizardSlice = createSlice({
  name: 'wizardApp',
  initialState: null,
  reducers: {
    resetOrder: () => null,
  },
  extraReducers: {},
});

export default wizardSlice.reducer;
