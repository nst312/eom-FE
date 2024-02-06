import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { showMessage } from '../../store/fuse/messageSlice';

export const getAllState = createAsyncThunk(
  'employee/getAllStates',
  async (countryId, { dispatch }) => {
    try {
      const response = await axios.get(`api/states/${countryId}`);
      const data = await response.data;
      return data;
    } catch (e) {
      dispatch(showMessage({ message: e.response.data.message }));
    }
  }
);

const stateSlice = createSlice({
  name: 'getAllStates',
  initialState: {
    data: [],
  },
  reducers: {},
  extraReducers: {
    [getAllState.fulfilled]: (state, action) => {
      state.data = action.payload;
    },
  },
});

export default stateSlice.reducer;
