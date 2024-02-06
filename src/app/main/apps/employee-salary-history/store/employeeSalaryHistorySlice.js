import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import { showMessage } from '../../../../store/fuse/messageSlice';

const employeeSalaryAdapter = createEntityAdapter({});

export const { selectAll: selectEmployeeSalary, selectById: selectedEmployeeSalaryIds } =
  employeeSalaryAdapter.getSelectors((state) => state.salaryHistoryApp.empSalary);

export const getEmployeeSalaryHistory = createAsyncThunk(
  'salaryHistoryApp/employee-salary/getEmployee',
  async ({ employeeid, page, perPage }, { dispatch }) => {
    const response = await axios.get(
      `/api/salaries/getSalaryHistory/${employeeid}?page=${page}&perPage=${perPage}`
    );
    const data = await response.data;
    dispatch(setSalaryCount(data.count));
    return data.data;
  }
);

export const downloadSalaryHistory = createAsyncThunk(
  'salaryHistoryApp/salary-history/downloadSalaryHistory',
  async (history, { dispatch }) => {
    try {
      const response = await axios.get(`/api/salaries/download/${history.id}`);
      const data = await response.data;
      return data;
    } catch (err) {
      dispatch(showMessage({ message: err.response.data.message }));
    }
  }
);

const empSalaryHistorySlice = createSlice({
  name: 'salaryHistoryApp',
  initialState: employeeSalaryAdapter.getInitialState({
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
    setSalaryCount: (state, action) => {
      state.totalCount = action.payload;
    },
  },
  extraReducers: {
    [getEmployeeSalaryHistory.fulfilled]: employeeSalaryAdapter.setAll,
  },
});

export const { setOrdersSearchText, setSalaryCount } = empSalaryHistorySlice.actions;

export default empSalaryHistorySlice.reducer;
