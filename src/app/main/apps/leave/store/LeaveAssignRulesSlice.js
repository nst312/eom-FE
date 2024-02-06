import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {showMessage} from "../../../../store/fuse/messageSlice";

export const getAllLeaveAssignRules = createAsyncThunk(
    'leavesAssignRules/getLeavesAssignRules',
    async (params, { dispatch }) => {
        try {
            const response = await axios.get('/api/leave-rule');
            const data = await response.data;
            console.log("data",data);
            return data.data;
        } catch (err) {
            dispatch(showMessage({ message: err.response.data.message }));
        }
    }
);

export const addAssignRules = createAsyncThunk(
    'leavesAssignRules/addLeavesAssignRules',
    async (assignData, { dispatch }) => {
        try {
            const response = await axios.post('/api/leave-rule/assignLeaveRule', assignData);
            const data = await response.data;
            dispatch(showMessage({ message: 'Leave Rules Assign successfully.' }));
            return data;
        } catch (err) {
            dispatch(showMessage({ message: err.response.data.message }));
        }
    }
);

export const getAssignRules = createAsyncThunk(
    'leavesAssignRules/getAllLeavesAssignRules',
    async (companyId,{dispatch}) => {
    const response = await axios.get(`/api/leave-rule/company/${companyId}`);
    const data = await response.data;
        console.log("data=====",data)
        return data;
});

export const deleteAssignRules = createAsyncThunk(
    'leavesAssignRules/deleteLeavesAssignRules',
    async ({empId,leaveId}, { dispatch }) => {
        try {
            const response = await axios.delete(`/api/leave-rule/assignLeaveRule/delete?empId=${empId}&leaveRuleId=${leaveId}`);
            dispatch(showMessage({ message: 'Assign Leave Rules deleted successfully.' }));
            return  response.data;
        } catch (err) {
            return err;
        }
    }
);


const LeaveAssignRulesSlice = createSlice({
    name: 'leavesAssignRules',
    initialState: {
        // leaveAssignData: [],
        users: []
    },
    reducers: {
        // setAssignLeaveData: (state, action) => {
        //     state.leaveAssignData = action.payload;
        // },
    },
    extraReducers: {
        [getAssignRules.pending]: (state, action) => {
            state.users = []
        },
        [getAssignRules.rejected]: (state, action) => {
            state.users = []
        },
        [getAssignRules.fulfilled]: (state, action) => {
          state.users = action.payload.users
        },
    },
});


export default LeaveAssignRulesSlice.reducer;

