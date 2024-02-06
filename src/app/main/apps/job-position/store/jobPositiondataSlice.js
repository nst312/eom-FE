import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';


export const getJobPosition = createAsyncThunk(
    'jobPositionApp/jobPosition/getPosition',
    async (id ) => {
        const response = await axios.get(`/api/job-position/${id}`);
        const data = await response.data;
        return data === undefined ? null : data;
    }
);

const JobPositionDataSlice = createSlice({
    name: 'jobPositionApp/getById',
    initialState: {},
    reducers: {},
    extraReducers: {
        [getJobPosition.fulfilled]: (state, action) => action.payload,

    },
});


export default JobPositionDataSlice.reducer;
