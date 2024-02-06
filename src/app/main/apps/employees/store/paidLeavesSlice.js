import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import {showMessage} from '../../../../store/fuse/messageSlice';

export const getLeavesDetails = createAsyncThunk(
    'eomApp/leaveDetails/getLeavesDetails',
    async (params) => {
        const response = await axios.get(`/api/leaves-master/${params.employeeId}`);
        const data = await response.data;

        return data === undefined ? null : data;
    }
);

export const addLeavesDetails = createAsyncThunk(
    'leaveDetails/addLeavesDetails',
    async (newData, { dispatch }) => {
        try {
           const {id,dataLeave}=newData
            const response = await axios.post(`api/leaves-master/add/${id}`, dataLeave);
            const data = await response.data;
            dispatch(
                showMessage({
                    message: 'Leaves added successfully.',
                    autoHideDuration: 4000,
                    anchorOrigin: {
                        vertical: 'top',
                        horizontal: 'center',
                    },
                })
            );
            return data;
        } catch (err) {
            dispatch(showMessage({ message: err.response.data.message }));
        }
    }
);

export const updateLeavesDetails = createAsyncThunk(
    'eomApp/leaveDetails/updateLeavesDetails',
    async (newData, { dispatch }) => {

        const {id,dataLeave}=newData
        const response = await axios.put(`/api/leaves-master/update/${id}`, dataLeave);
        dispatch(
            showMessage({
                message: 'Leaves successfully updated.',
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



const paidLeaveSlice = createSlice({
    name: 'eomApp/leavesDetails',
    initialState: null,
    reducers: {
        resetOrder: () => null,
    },
    extraReducers: {
        [getLeavesDetails.fulfilled]: (state, action) => action.payload,
    },
});

export default paidLeaveSlice.reducer;
