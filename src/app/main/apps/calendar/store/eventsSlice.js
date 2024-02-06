import {createAsyncThunk, createEntityAdapter, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import moment from "moment";
import {showMessage} from "../../../../store/fuse/messageSlice";

export const dateFormat = 'YYYY-MM-DDTHH:mm:ss.sssZ';

export const addLeave = createAsyncThunk(
    'empLeaveApp/events/addLeave',
    async (leaveData,{ dispatch}) => {
        console.log("leaveData",leaveData)
        try {
            const response = await axios.post('/api/leaves-master',leaveData);
            dispatch(showMessage({ message: 'You have applied leave successfully.' }));
            const data = await response.data;
            return data;
        }catch (err) {
            dispatch(showMessage({ message: err.response.data.message }));
            return err;
        }
    }
);


export const requestEmployeeLeave = createAsyncThunk(
    'empLeaveApp/events/requestEmployeeLeave',
    async (data,{ dispatch}) => {
        try {
            const response = await axios.post(`/api/leaves-master/${data.id}/request`,{message:data.message});
                dispatch(showMessage({ message: 'You can send leave request Successfully.' }));
            return response;
        }catch (err) {
            dispatch(showMessage({ message: err.response.data.message }));
            return err;
        }
    }
);

export const getAllLeave = createAsyncThunk(
    'empLeaveApp/events/getAllLeave',
    async () => {
        const response = await axios.get(`/api/leaves-master/current`);
        return response.data;
    },
);

export const updateLeave = createAsyncThunk(
    'empLeaveApp/events/updateLeave',
    async ( data , { dispatch }) => {
        const newData = {...data};
        console.log("newData",newData)
        delete newData.publicId;
        try {
            const response = await axios.put(`/api/leaves-master/${data.publicId}`, newData);
            dispatch(showMessage({ message: 'Leave updated successfully.' }));
            const updateData = await response.data;
            return updateData;
        } catch (err) {
            dispatch(showMessage({ message: err.response.data.message }));
            return;
        }
    }
);


export const removeLeaves = createAsyncThunk(
    'empLeaveApp/events/removeLeave',
    async ( id , { dispatch}) => {
        try {
            const response = await axios.delete(`/api/leaves-master/${id}`);
            dispatch(showMessage({ message: 'Leave deleted successfully.' }));
            return response.data;
        } catch (err) {
            dispatch(showMessage({ message: err.response.data.message }));
            return err;
        }
    },
);

export const getAllLeaveHistory = createAsyncThunk(
    'empLeaveApp/events/getAllLeave',
    async (id) => {
        const response = await axios.get(`/api/leaves-master/${id}/history`);
        return response.data;
    },
);

const leaveAdapter = createEntityAdapter({});

export const {
    selectAll: selectLeave,
    selectIds: selectEventIds,
    selectById: selectEventById,
} = leaveAdapter.getSelectors((state) => state.empLeaveApp.events);



const eventsSlice = createSlice({
    name: 'empLeaveApp/events',
    initialState: leaveAdapter.getInitialState({
        leavesDialog: {
            type: 'new',
            props: {
                open: false,
            },
            data: null,
        },
    }),
    reducers: {
        openNewEventDialog: {
            prepare: (event) => {
                const start = moment(event.start).format('L');
                const end = moment(event.end).format('L');
                const time = "10:00";
                const endTime = "19:00";
                const a = moment(event.start, 'mm/dd/yyyy');
                const b = moment(event.end, 'mm/dd/yyyy');
                const durationCount = b.diff(a, 'days') + 1;
                const payload = {
                    type: 'new',
                    props: {
                        open: true,
                    },
                    data: {
                        leaveType: '',
                        start: moment(`${start  } ${  time}`),
                        end: moment(`${end  } ${  endTime}`),
                        durationCount,
                        description: '',
                    },
                };
                return { payload };
            },
            reducer: (state, action) => {
                state.leavesDialog = action.payload;
            },
        },
        openEditEventDialog: {
            prepare: (event) => {
                const payload = {
                    type: 'edit',
                    props: {
                        open: true,
                    },
                    data: {
                        ...event,
                        start: event.start,
                        end: event.end,
                    },
                };
                return { payload };
            },
            reducer: (state, action) => {
                state.leavesDialog = action.payload;
            },
        },
        closeNewEventDialog: (state, action) => {
            state.leavesDialog = {
                type: 'new',
                props: {
                    open: false,
                },
                data: null,
            };
        },
        closeEditEventDialog: (state, action) => {
            state.leavesDialog = {
                type: 'edit',
                props: {
                    open: false,
                },
                data: null,
            };
        },
        pushLeave: leaveAdapter.addOne,
        updateLeave: leaveAdapter.updateOne,
        removeLeave: leaveAdapter.removeOne,
        leaveError: (state, action) => {
            state.success = false;
            state.errors = action.payload;
            state.loading = false;
        },
    },
    extraReducers: {
        [getAllLeave.fulfilled]: leaveAdapter.setAll,
        // [addLeave.fulfilled]: leaveAdapter.addOne,
    },
});

export const {
    openNewEventDialog,
    closeNewEventDialog,
    openEditEventDialog,
    closeEditEventDialog,
    leaveError,
} = eventsSlice.actions;

export default eventsSlice.reducer;
