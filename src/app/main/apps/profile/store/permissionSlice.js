import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { showMessage } from '../../../../store/fuse/messageSlice';

export const getRoleWisePermission = createAsyncThunk('permission', async (role) => {
  const response = await axios.get(`/api/permission/${role}`);
  const data = await response.data;
  return data;
});

export const updateRoleWisePermission = createAsyncThunk(
  'permission',
  async ({ roles: role, permissionList }, {dispatch}) => {
    try {

      const response = await axios.put(`/api/permission/${role}`, permissionList);
      const data = await response.data;
      if(data) {
        dispatch(showMessage({message: data.message}))
      }
      return data
    } catch(err) {
      console.log(err)
    }
  }
);

// export const

const initialState = {
  roleWisePermissions: [],
};

const permissionSlice = createSlice({
  name: 'permission',
  initialState,
  reducers: {},
  extraReducers: {
    [getRoleWisePermission.fulfilled]: (state, action) => {
      state.roleWisePermissions = action.payload;
    },
  },
});

export default permissionSlice.reducer;
