import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { showMessage } from '../../../../store/fuse/messageSlice';

export const getAllUser = createAsyncThunk('admin', async () => {
  const response = await axios.get('/api/users/role');
  const data = await response.data;
  return data;
});

export const asignRole = createAsyncThunk('admin/asignRole', async (formData, { dispatch }) => {
  try {
    const response = await axios.put(`/api/users/role/${formData.userId}?role=${formData.role}`);
    const data = await response.data;
    if (data) {
      dispatch(
        showMessage({
          message: 'Profile has been Updated.',
          autoHideDuration: 4000,
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'center',
          },
        })
      );
    }
    return data;
  } catch (error) {
    dispatch(
      showMessage({
        message: 'Not able to Update.',
        autoHideDuration: 4000,
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'center',
        },
      })
    );
  }
});

export const getUserByRole = createAsyncThunk('admin/getUserByRole', async (role, { dispatch }) => {
  try {
    const response = await axios.get(`/api/users/role/?role=${role}`);
    const data = await response.data;
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
});

const initialState = {
  users: []
};

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {},
  extraReducers: {
    [getAllUser.fulfilled]: (state, action) => {
      state.users = action.payload.data;
    },
  },
});

export const { resetOrder } = adminSlice.actions;

export default adminSlice.reducer;
