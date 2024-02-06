import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { showMessage } from '../../store/fuse/messageSlice';


export const getAllCities = createAsyncThunk(
  'employee/getAllCities',
  async (stateId, { dispatch }) => {
    try {
      const response = await axios.get(`api/cities/${stateId}`);
      const data = await response.data;
      return data;
    } catch (e) {
      dispatch(showMessage({ message: e.response.data.message }));
    }
  }
);

const citySlice = createSlice({
  name: 'getAllCities',
  initialState: {
    data: {},
  },
  reducers: {},
  extraReducers: {
    [getAllCities.fulfilled]: (state, action) => {
      const { state_id } = action.payload[0];
      state.data[state_id] = action.payload;
    },
  },
});

export default citySlice.reducer;
