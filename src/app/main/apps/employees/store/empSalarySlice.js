import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { showMessage } from '../../../../store/fuse/messageSlice';

export const getEmployeeSalaryDetails = createAsyncThunk(
    'eomApp/employee-salary/getEmployeeDetails',
    async (params) => {
        const response = await axios.get(`/api/salaries/${params.employeeId}?page=${params.page}&perPage=${params.perPage}`);
        const data = await response.data;
        return data === undefined ? null : data;
    }
);

export const addEmployeeSalaryDetails = createAsyncThunk(
  'eomApp/employee-salary/updateEmployeeSalaryDetails',
  async (emp, { dispatch }) => {
    const empData = {
      hra: emp.data.hra || 0,
      specialAllowance: emp.data.specialAllowance || 0,
      basic: emp.data.basic || 0,
      conveyance: emp.data.conveyance || 0,
      gross: emp.data.gross || 0,
      medical: emp.data.medical || 0,
      professionalTax: emp.data.professionalTax || 0,
      tds: emp.data.tds || 0,
        month: emp.data.month,
        leave: emp.data.leave,
        netPay: emp.data.netPay
    }
    const response = await axios.post(`/api/salaries/${emp.empId}`, empData);
    dispatch(
      showMessage({
        message: 'Employee salary added successfully.',
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

export const SendSalaryDetails = createAsyncThunk(
  'eomApp/send-salary-slip/sendSalaryDetails',
  async (salaryData, { dispatch }) => {
      try {
          const response = await axios.post(`/api/salaries/sendSalarySlip/${salaryData.userId}/${salaryData.id}`);
          dispatch(
              showMessage({
                  message: 'Salary slip successfully sent.',
                  autoHideDuration: 4000,
                  anchorOrigin: {
                      vertical: 'top',
                      horizontal: 'center',
                  },
              })
          );
          const data = await response.data;

          return data;

      }catch (e) {
        dispatch(showMessage({message:e.response.data.message}))
      }

  }
);


export const downloadSalarySlip = createAsyncThunk(
    'eomApp/send-salary-slip/downloadSalarySlip',
    async (salary, { dispatch }) => {
        try {
            const response = await axios.get(`/api/salaries/${salary.empId}/download/${salary.id}`);
            const data = await response.data;
            return data;
        } catch (err) {
            dispatch(showMessage({ message: err.response.data.message }));
        }
    }
);



export const updateEmployeeSalaryDetails = createAsyncThunk(
  'eomApp/employee-salary/updateEmployeeSalaryDetails',
  async (emp, { dispatch }) => {
    console.log('emp', emp);

      const empData = {
      hra: emp.data.hra || 0,
      specialAllowance: emp.data.specialAllowance || 0,
      basic: emp.data.basic || 0,
      conveyance: emp.data.conveyance || 0,
      gross: emp.data.gross || 0,
      medical: emp.data.medical || 0,
      professionalTax: emp.data.professionalTax || 0,
      tds: emp.data.tds || 0,
        month: emp.data.month,
        leave: emp.data.leave,
          netPay: emp.data.netPay

      }

    console.log("empData", empData);

    const response = await axios.put(`/api/salaries/${emp.id}`, empData);
    dispatch(
      showMessage({
        message: 'Employee salary updated successfully.',
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

const empSalarySlice = createSlice({
  name: 'eomApp/employee',
  initialState: null,
  reducers: {
    resetOrder: () => null,
  },
  extraReducers: {
    [getEmployeeSalaryDetails.fulfilled]: (state, action) => action.payload,
    [addEmployeeSalaryDetails.fulfilled]: (state, action) => action.payload,
  },
});

export default empSalarySlice.reducer;
