import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import {showMessage} from "../../../../store/fuse/messageSlice";

export const getAllLeave = createAsyncThunk('leaveApp/admin/leaveAdmin', async ({ searchKeyword, page, perPage }, { dispatch }) => {
    const response = searchKeyword ? await axios.get(`/api/leaves-master?page=${page}&perPage=${perPage}&query=${searchKeyword}`) : await axios.get(`/api/leaves-master?page=${page}&perPage=${perPage}`);
    const data = await response.data;
    dispatch(setLeaveCount(data.count))
    return data.data;
});


export const approvedLeave = createAsyncThunk(
    'leaveApp/admin/getApproved',
    async (data, { dispatch } ) =>
        {
            try {
                const response = await axios.put(`/api/leaves-master/${data.id}/approved`);
                dispatch(showMessage({ message: 'Approved successfully.'}));
                return response.data;
            } catch (err) {
                dispatch(showMessage({ message: err.response.data.message }));
                // return err;
            }
        }
);

export const updateAdminLeave = createAsyncThunk(
    'leaveApp/admin/updateAdminLeave',
    async ( data , { dispatch }) => {
        console.log("data",data);
        const newData = {
            start : data.start,
            end : data.end,
            durationCount: data.durationCount,
            status: data.leaveType
        }
        try {
            const response = await axios.put(`/api/leaves-master/${data.id}`, newData);
            dispatch(showMessage({ message: 'Leave updated successfully.' }));
            const updateData = await response.data;
            return updateData;
        } catch (err) {
            dispatch(showMessage({ message: err.response.data.message }));
            return;
        }
    }
);

export const rejectLeave = createAsyncThunk(
    'leaveApp/admin/getApproved',
    async (data, { dispatch } ) =>
    {
        try {
            const response = await axios.put(`/api/leaves-master/${data.id}/reject`,{reason: data.reason});
            dispatch(showMessage({ message: 'Rejected successfully.'}));
            return response.data;
        } catch (err) {
            dispatch(showMessage({ message: err.response.data.message }));
            // return err;
        }
    }
);


const leaveAdapter = createEntityAdapter({});

export const { selectAll: selectLeave, selectById: selectedLeaveIds} = leaveAdapter.getSelectors(
    (state) => state.leaveApp.adminLeave
);

const leaveSlice = createSlice({
    name: 'leaveApp/adminLeave',
    initialState: leaveAdapter.getInitialState({
        searchText: '',
        orderBy: '',
        orderDescending: false,
        routeParams: {},
        totalCount: 0,
        AdminLeaveDialog: {
            props: {
                open: true,
            },
            data: null,
        },
    }),
    reducers: {
        setOrdersSearchText: {
            reducer: (state, action) => {
                state.searchText = action.payload;
            },
            prepare: (event) => ({ payload: event.target.value || '' }),
        },
        openAdminLeaveDialog: (state, action) => {
            state.AdminLeaveDialog = {
                props: {
                    open: true,
                },
                data: null,
            };
        },
        closeAdminLeaveDialog: (state, action) => {
            state.AdminLeaveDialog = {
                props: {
                    open: false,
                },
                data: null,
            };
        },
        setLeaveCount: (state, action) => {
            state.totalCount = action.payload;
        }
    },
    extraReducers: {
        [getAllLeave.fulfilled]: leaveAdapter.setAll,
        // [getAllDepartment.fulfilled]: leaveAdapter.setAll
    },
});

export const {
    setOrdersSearchText,
    openAdminLeaveDialog,
    closeAdminLeaveDialog,
    setLeaveCount,
} = leaveSlice.actions;

export default leaveSlice.reducer;
