import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { showMessage } from '../../../../store/fuse/messageSlice';
import {count} from "react-table/src/aggregations";

export const getAssignRules = createAsyncThunk(
  'attendanceApp/attendanceAssignRules/getAllAttendanceAssignRules',
  async (getData,{dispatch}) => {
    const response = await axios.get(
      `/api/attendance-shift/company/${getData.id}?page=${getData.page}&perPage=${getData.perPage}`
    );
    const data = await response.data;
    dispatch(setAttendanceShiftCount(data.count));
    return data.data;
  }
);

export const addAssignAttendanceRules = createAsyncThunk(
  'attendanceApp/attendanceAssignRules/AddAttendanceAssignRules',
  async (assignData, { dispatch }) => {
    try {
      const response = await axios.post('/api/attendance-shift/attendanceLeaveRule', assignData);
      const data = await response.data;
      dispatch(showMessage({ message: 'Attendance Rules Assign successfully.' }));
      return data;
      } catch (err) {
        dispatch(showMessage({ message: err.response.data.message }));
      }
    }
);

export const deleteAssignRules = createAsyncThunk(
    'attendanceApp/attendanceAssignRules/DeleteAttendanceAssignRules',
    async ({empId,attendance_id}, { dispatch }) => {
      try {
        const response = await axios.delete(`/api/attendance-shift/assignAttendanceRule/delete?empId=${empId}&attendance_id=${attendance_id}`);
        dispatch(showMessage({ message: 'Assign Attendance Rules deleted successfully.' }));
        return  response.data;
      } catch (err) {
        return err;
      }
    }
);



const AttendanceAssignRulesSlice = createSlice({
  name: 'attendanceApp/attendanceAssignRules',
  initialState: {
    assignUsers: [],
    totalCount: 0,
  },
  reducers: {
    setAttendanceShiftCount: (state, action) => {
      state.totalCount = action.payload;
    },
  },
  extraReducers: {
    [getAssignRules.pending]: (state, action) => {
      state.assignUsers = [];
    },
    [getAssignRules.rejected]: (state, action) => {
      state.assignUsers = [];
    },
    [getAssignRules.fulfilled]: (state, action) => {
      state.assignUsers = action.payload;
    },
  },
});
export const { setAttendanceShiftCount } = AttendanceAssignRulesSlice.actions;

export default AttendanceAssignRulesSlice.reducer;
