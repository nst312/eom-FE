import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { showMessage } from '../../../../store/fuse/messageSlice';

export const getAllLeaveRules = createAsyncThunk(
  'leavesApp/leaveRules/getLeaveRules',
  async (params, { dispatch }) => {
    try {
      const response = await axios.get('/api/leave-rule');
      const data = await response.data;
      dispatch(setLeaveData(data.data));
      dispatch(setLeaveCount(data.count));
      return data.data;
    } catch (err) {
      dispatch(showMessage({ message: err.response.data.message }));
    }
  }
);

// just for testing

export const addLeaveRules = createAsyncThunk(
  'leavesApp/leaveRules/addLeaveRules',
  async (leaveData, { dispatch }) => {
    console.log('leaveData', leaveData);
    try {
      const response = await axios.post('/api/leave-rule', leaveData);
      dispatch(getAllLeaveRules());
      dispatch(showMessage({ message: 'Leave Rules Create successfully.' }));
      const data = await response.data;
      return data;
    } catch (err) {
      dispatch(showMessage({ message: err.response.data.message }));
    }
  }
);

export const updateLeaveRules = createAsyncThunk(
  'leavesApp/leaveRules/updateLeaveRules',
  async ({ id, leaveData }, { dispatch }) => {
    try {
      const response = await axios.put(`/api/leave-rule/update/${id}`, leaveData);
      dispatch(getAllLeaveRules());
      const data = await response.data;
      console.log('data', data);
      dispatch(
        showMessage({
          message: 'Leave Rules updated successfully.',
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

export const deleteLeaveRules = createAsyncThunk(
  'leavesApp/leaveRules/deleteLeaveRules',
  async ({ id }, { dispatch }) => {
    try {
      const response = await axios.delete(`/api/leave-rule/${id}`);
      dispatch(getAllLeaveRules());
      dispatch(showMessage({ message: 'Leave Rules deleted successfully.' }));
      return response.data;
    } catch (err) {
      dispatch(showMessage({ message: err.response.data.message }));
    }
  }
);

const LeaveRulesSlice = createSlice({
  name: 'leavesApp/leaveRules',
  initialState: {
    leaveData: [],
    LeavesRulesDialog: {
      type: 'new',
      props: {
        open: false,
      },
      data: null,
    },
  },
  reducers: {
    openLeaveDialog: (state, action) => {
      state.LeavesRulesDialog = {
        type: 'new',
        props: {
          open: true,
        },
        data: null,
      };
    },
    openEditLeaveDialog: (state, action) => {
      state.LeavesRulesDialog = {
        type: 'edit',
        props: {
          open: true,
        },
        data: action.payload,
      };
    },
    closeLeaveDialog: (state, action) => {
      state.LeavesRulesDialog = {
        props: {
          open: false,
        },
        data: null,
      };
    },
    setLeaveData: (state, action) => {
      state.leaveData = action.payload;
    },
    setLeaveCount: (state, action) => {
      state.totalCount = action.payload;
    },
  },
  extraReducers: {
    [getAllLeaveRules.fulfilled]: (state, action) => {
      state.leaveData = action.payload;
    },
  },
});

export const {
  openLeaveDialog,
  openEditLeaveDialog,
  closeLeaveDialog,
  setLeaveData,
  setLeaveCount,
} = LeaveRulesSlice.actions;

export default LeaveRulesSlice.reducer;
