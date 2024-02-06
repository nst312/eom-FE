import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { showMessage } from '../../../../store/fuse/messageSlice';

export const getUserProfile = createAsyncThunk('userProfile/getUserProfile', async () => {
  const response = await axios.get('api/users/profile');
  const data = await response.data;
  const swapValue = (obj) => {
    Object.keys(data).forEach((key) => {
      if (!obj[key]) {
        obj[key] = '';
      }
    });
  };
  swapValue(data);
  return data;
});

export const updateUser = createAsyncThunk(
  'userProfile/updateProfile',
  async (newData, { dispatch }) => {
    const formData = new FormData();
    formData.append('firstName', newData.data.firstName);
    formData.append('lastName', newData.data.lastName);
    formData.append('middleName', newData.data.middleName);
    formData.append('displayName', newData.data.displayName);
    formData.append('avatar_url', newData.uploadFile.fileName);
    try {
      const response = await axios.put('api/users/profile', formData);
      const data = await response.data;
      dispatch(
        showMessage({
          message: 'Profile Updated successfully',
          autoHideDuration: 4000,
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'center',
          },
        })
      );
      return data;
    } catch (err) {
      // console.log('err', err.response.data.message);
      dispatch(showMessage({ message: err.response.data.message }));
    }
  }
);

const profileSlice = createSlice({
  name: 'userProfile',
  initialState: {},
  reducers: {},
  extraReducers: {
    [getUserProfile.fulfilled]: (state, action) => action.payload,
    [updateUser.fulfilled]: (state, action) => action.payload,
  },
});

export default profileSlice.reducer;
