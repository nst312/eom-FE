import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { showMessage } from '../../../../store/fuse/messageSlice';

export const addAttendanceRules = createAsyncThunk(
  'attendanceApp/attendanceShiftData/addAttendanceRules',
  async ({ attendanceData, companyId }, { dispatch }) => {
    try {
      const response = await axios.post(`api/attendance-shift/add/${companyId}`, attendanceData);
      dispatch(getAllAttendanceRules());
      dispatch(showMessage({ message: 'Attendance Rules Create successfully.' }));
      const data = await response.data;
      return data;
    } catch (err) {
      dispatch(showMessage({ message: err.response.data.message }));
    }
  }
);

export const getAllAttendanceRules = createAsyncThunk(
  'attendanceApp/attendanceShiftData/getAttendanceRules',
  async (params, { dispatch }) => {
    try {
      const response = await axios.get('/api/attendance-shift');
      const data = await response.data;
      dispatch(setAttendanceShiftData(data));
      // dispatch(setLeaveCount(data.count));
      return data;
    } catch (err) {
      dispatch(showMessage({ message: err.response.data.message }));
    }
  }
);

export const deleteAttendanceRules = createAsyncThunk(
  'attendanceApp/attendanceShiftData/deleteAttendanceRules',
  async ({ id }, { dispatch }) => {
    try {
      const response = await axios.delete(`api/attendance-shift/${id}`);
      dispatch(getAllAttendanceRules());
      dispatch(showMessage({ message: 'Attendance Rules deleted successfully.' }));
      return response.data;
    } catch (err) {
      dispatch(showMessage({ message: err.response.data.message }));
    }
  }
);

export const updateAttendanceRules = createAsyncThunk(
  'attendanceApp/attendanceShiftData/updateAttendanceRules',
  async ({ id, attendanceData }, { dispatch }) => {
    try {
      const response = await axios.put(`/api/attendance-shift/update/${id}`, attendanceData);
      dispatch(getAllAttendanceRules());
      const data = await response.data;
      dispatch(
        showMessage({
          message: 'Attendance Rules updated successfully.',
          autoHideDuration: 4000,
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'center',
          },
        })
      );
      return data;
    } catch (e) {
      dispatch(
        showMessage({
          message: e.response?.data?.message[0],
          autoHideDuration: 4000,
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'center',
          },
        })
      );
    }
  }
);

const AttendanceSlice = createSlice({
  name: 'attendanceApp/attendanceShiftData',
  initialState: {
    attendanceShiftAllData: [],
    attendanceShiftDialog: {
      type: 'new',
      props: {
        open: false,
      },
      data: null,
    },
  },
  reducers: {
    openAttendanceShiftDialog: (state, action) => {
      state.attendanceShiftDialog = {
        type: 'new',
        props: {
          open: true,
        },
        data: null,
      };
    },
    openEditAttendanceShiftDialog: (state, action) => {
      state.attendanceShiftDialog = {
        type: 'edit',
        props: {
          open: true,
        },
        data: action.payload,
      };
    },
    closeAttendanceShiftDialog: (state, action) => {
      state.attendanceShiftDialog = {
        props: {
          open: false,
        },
        data: null,
      };
    },
    setAttendanceShiftData: (state, action) => {
      state.attendanceShiftData = action.payload;
    },
    setAttendanceShiftCount: (state, action) => {
      state.totalCount = action.payload;
    },
  },
  extraReducers: {
    [getAllAttendanceRules.fulfilled]: (state, action) => {
      state.attendanceShiftAllData = action.payload;
    },
  },
});

export const {
  openAttendanceShiftDialog,
  openEditAttendanceShiftDialog,
  closeAttendanceShiftDialog,
  setAttendanceShiftData,
  setAttendanceShiftCount,
} = AttendanceSlice.actions;

export default AttendanceSlice.reducer;
