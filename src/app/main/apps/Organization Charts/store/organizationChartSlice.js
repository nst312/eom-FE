import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const getOrganizeChartData = createAsyncThunk(
  'organizationChartApp/getOrganizeChartData',
  async () => {
      const resp = await axios.get(`/api/employeeManager`)
      const data = await resp;
      return data.data
  }
);

const initialState = {};

const organizationSlice = createSlice({
  name: 'organizationChartApp',
  initialState,
  reducers: {},
});

export default organizationSlice.reducer;
