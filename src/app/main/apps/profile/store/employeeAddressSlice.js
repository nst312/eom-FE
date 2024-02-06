import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { showMessage } from '../../../../store/fuse/messageSlice';


export const getEmployeeAddress = createAsyncThunk(
    'employee/address',
    async (userId) => {
        const response = await axios.get(`/api/user-address/${userId}`);
  const data = await response.data;
  return data;
});

export const updateEmployeeAddress = createAsyncThunk(
  'employee/updateAddress',
  async ({ id, userId, value }, { dispatch }) => {
    try {
      const response = await axios.put(`/api/user-address/${userId}/${id}`, value);
      const data = await response.data;
      dispatch(
        showMessage({
          message: 'Employee address updated successfully.',
          autoHideDuration: 4000,
          anchorOrigin: {
            vertical: 'top',
                        horizontal: 'center'
                    }
        })
      );
      return data;
    } catch (err) {
      dispatch(showMessage({ message: err.response.data.message }));
    }
  }
);

export const deleteEmployeeAddress = createAsyncThunk(
  'employee/deleteAddress',
  async ({ id, userId }, { dispatch }) => {
    try {
            const response = await axios.delete(`/api/user-address/${userId}/${id}`,);
      const data = await response.data;
      dispatch(
        showMessage({
          message: 'Employee address deleted successfully.',
          autoHideDuration: 4000,
          anchorOrigin: {
            vertical: 'top',
                        horizontal: 'center'
                    }
        })
      );
      return data;
    } catch (err) {
      dispatch(showMessage({ message: err.response.data.message }));
    }
  }
);

export const addEmployeeAddress = createAsyncThunk(
  'employee/addAddress',
    async ({ value, userId }, { dispatch }) => {
    try {
            const response = await axios.post(`/api/user-address/${userId}`, value);
      const data = await response.data;
      dispatch(
        showMessage({
          message: 'Employee address added successfully.',
          autoHideDuration: 4000,
          anchorOrigin: {
            vertical: 'top',
                        horizontal: 'center'
                    }
        })
      );
      return data;
    } catch (err) {
      dispatch(showMessage({ message: err.response.data.message }));
    }
  }
);

const employeeAddressSlice = createSlice({
  name: 'employeeAddress',
  initialState: {},
  reducers: {
    employeeAddress: {
      reducer: (state, action) => {
        state.searchText = action.payload;
      },
      prepare: (event) => ({ payload: event.target.value || '' }),
    },
  },
  extraReducers: {
    [getEmployeeAddress.fulfilled]: (state, action) => action.payload,
    [updateEmployeeAddress.fulfilled]: (state, action) => action.payload,
        [deleteEmployeeAddress.fulfilled]: (state, action) => action.payload
    }
});

export default employeeAddressSlice.reducer;
