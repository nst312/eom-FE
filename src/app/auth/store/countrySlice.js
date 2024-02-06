import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';

export const getAllCountries = createAsyncThunk('employee/countries', async () => {
    const response = await axios.get(`api/countries`);
    const data = await response.data;
    return data;
});

const countrySlice = createSlice({
    name: 'countries',
    initialState: {
        data:[]
    },
    reducers: {},
    extraReducers: {
        [getAllCountries.fulfilled]: (state, action) => {
            state.data = action.payload
        },
    },
});

export default countrySlice.reducer;
