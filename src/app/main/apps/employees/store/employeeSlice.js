import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';

export const getEmployee = createAsyncThunk(
  'eomApp/employee/getEmployee',
  async ({ searchKeyword, page, perPage }, { dispatch }) => {
    const response = await axios.get('/api/employees');
    // : await axios.get(`/api/employees?page=${page}&perPage=${perPage}`);
    const data = await response.data;
    dispatch(setEmpCount(data.count));
    return data.data;
  }
);

export const getAllDepartment = createAsyncThunk('eomApp/getDepartment', async () => {
  const response = await axios.get('/api/companies/department');
  const data = await response.data;
  return data;
});

export const allJobPosition = createAsyncThunk('eomApp/getAllJobPositionData', async () => {
  const response = await axios.get('/api/job-position');
  const data = await response.data;
  return data;
});

const employeeAdapter = createEntityAdapter({});

export const { selectAll: selectEmployee, selectById: selectedEmployeeIds } =
  employeeAdapter.getSelectors((state) => state.eomApp.employees);

const employeeSlice = createSlice({
  name: 'eomApp/employee',
  initialState: employeeAdapter.getInitialState({
    searchText: '',
    orderBy: '',
    orderDescending: false,
    routeParams: {},
    totalCount: 0,
  }),
  reducers: {
    setOrdersSearchText: {
      reducer: (state, action) => {
        state.searchText = action.payload;
      },
      prepare: (event) => ({ payload: event.target.value || '' }),
    },
    setEmpCount: (state, action) => {
      state.totalCount = action.payload;
    },
  },
  extraReducers: {
    [getEmployee.fulfilled]: employeeAdapter.setAll,
    [getAllDepartment.fulfilled]: employeeAdapter.setAll,
    [allJobPosition.fulfilled]: employeeAdapter.setAll,
  },
});

export const { setOrdersSearchText, setEmpCount } = employeeSlice.actions;

export default employeeSlice.reducer;
