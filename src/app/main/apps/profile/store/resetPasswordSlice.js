/* eslint-disable consistent-return */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { showMessage } from 'app/store/fuse/messageSlice';

export const resetPassword = createAsyncThunk('user/change-password', async (passwordData, { dispatch }) => {
  try {
    const response = await axios.put('/api/users/change-password', passwordData);
    const data = await response.data;
    dispatch(
      showMessage({
        message: data.message,
        autoHideDuration: 4000,
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'center'
        }
      })
    );
    return data;
  } catch (err) {
    console.log('err', err.response.data.message);
    dispatch(showMessage({ message: err.response.data.message}));
  }
});

const resetPasswordSlice = createSlice({
  name: 'user/change-password',
  initialState: {},
  reducers: {},
  extraReducers: {
    [resetPassword.fulfilled]: (state, action) => action.payload
  }
});

export default resetPasswordSlice.reducer;
