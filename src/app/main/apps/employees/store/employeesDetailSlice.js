import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { showMessage } from '../../../../store/fuse/messageSlice';

export const getAllEmployee = createAsyncThunk('eomApp/employee/getEmployeeDetails', async () => {
  const response = await axios.get('/api/employees');
  const data = await response.data;
  return data.data;
});

export const assignManagerToEmployee = createAsyncThunk(
  '/eomApp/employee/assignManagerToEmployee',
  async (formValue, { dispatch }) => {
    try {
      const response = await axios.post('/api/employeeManager', formValue);
      const data = await response.data;
      dispatch(
        showMessage({
          message: 'Manager Assigned',
        })
      );
      return data;
    } catch (err) {
      console.log(err);
    }
  }
);

export const updateManagerToEmployee = createAsyncThunk(
  '/eomApp/employee/updateManagerToEmployee',
  async (formValue, {dispatch}) => {
    const { id, employeeId, managerId } = formValue;
    try {
      const response = await axios.put(`/api/employeeManager/update/${id}`, {
        employeeId: Number(employeeId),
        managerId: Number(managerId),
      });
      dispatch(
        showMessage({
          message: 'Manager Updated',
        })
      );
      return response;
    } catch (err) {
      console.log(err)
    }

  }
);

export const getEmployeeManager = createAsyncThunk(
  '/eomApp/employee/getEmployeeManager',
  async (employeeId) => {
    const response = await axios.get(`/api/employeeManager/employee/${employeeId}`);
    const data = await response.data;
    console.log(data)
    return data;
  }
);

export const getEmployeeDetails = createAsyncThunk(
  'eomApp/employee/getEmployeeDetails',
  async (params, { dispatch }) => {
    try {
      const response = await axios.get(`/api/employees/${params.employeeId}`);
      const data = await response.data;
      return data === undefined ? null : data;
    } catch (err) {
      console.log(err);
    }
  }
);

export const updateEmployeeDetails = createAsyncThunk(
  'eomApp/employee/updateEmployeeDetails',
  async (emp, { dispatch }) => {
    const empDetails = {
      firstName: emp.data.firstName,
      middleName: emp.data.middleName,
      lastName: emp.data.lastName,
      personal_email: emp.data.personal_email,
      work_email: emp.data.work_email,
      phone: emp.data.phone,
      phone2: emp.data.phone2,
      jobPositionId: emp.data.jobPositionId,
      joining_date: emp.data.joining_date,
      birth_date: emp.data.birth_date,
      empType: emp.empType,
      employee_code: emp.data.employee_code,
    };

    const response = await axios.put(`/api/employees/${emp.id}`, empDetails);
    dispatch(
      showMessage({
        message: 'Employee details successfully updated.',
        autoHideDuration: 4000,
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'center',
        },
      })
    );
    const data = await response.data;

    return data;
  }
);

export const deleteEmployeeDetails = createAsyncThunk(
  'eomApp/employee/deleteEmployee',
  async (id, { dispatch }) => {
    try {
      const response = await axios.put(`/api/employees/delete`, id);
      dispatch(showMessage({ message: 'Employee deleted successfully.' }));
      return response.data;
    } catch (err) {
      return err;
    }
  }
);

const employeeDetailSlice = createSlice({
  name: 'eomApp/employee',
  initialState: null,
  reducers: {
    resetOrder: () => null,
  },
  extraReducers: {
    [getEmployeeDetails.fulfilled]: (state, action) => action.payload,
    [updateEmployeeDetails.fulfilled]: (state, action) => action.payload,
  },
});

export default employeeDetailSlice.reducer;
