import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {showMessage} from 'app/store/fuse/messageSlice';
import axios from 'axios';
import {loginError} from "../../../../auth/store/loginSlice";

export const forgetPassword = createAsyncThunk(
    'forgotPasswordApp',
    async (emailId, { dispatch }) => {
        try {
            const response = await axios.post('/api/auth/forgotpassword', emailId);
            dispatch(showMessage({ message: 'Please kindly check your email.' }));
            return response.data;
        } catch (err) {
            const errors = [];
            if(err.response === undefined){
                errors.push({ type: 'email', message: 'Something is wrong! Please contact your administrator.' });
                return dispatch(forgetPasswordError(errors));
            }else{
                errors.push({ type: 'email', message: err.response.data.message });
                return dispatch(forgetPasswordError(errors));
            }
        }
    }
);

export const validateForgetPasswordToken = createAsyncThunk(
    'forgotPasswordApp/validate-token',
    async ({ token }, { dispatch}) => {
        try {
            const response = await axios.get(`/api/auth/validate/forgotpassword/${token}`);
            dispatch(showMessage({ message: 'Token Validate Successfully.' }));
            return response.data;
        } catch (err) {
            return err;
        }
    },
)

export const resetPassword = createAsyncThunk(
    'forgotPasswordApp/resetPassword',
    async ({ token, data }, { dispatch}) => {
        try {
            const response = await axios.put(`/api/auth/update/password/${token}`, data);
            dispatch(showMessage({ message: 'Password successfully updated.' }));
            return response.data;
        } catch (err) {
            return err;
        }
    },
);

const initialState  = {
    success: false,
    errors: [],
    loading: false,
};

const forgetPasswordSlice = createSlice({
    name: 'forgotPasswordApp',
    initialState,
    reducers: {
        forgetPasswordSuccess: (state, action) => {
            state.success = true;
            state.errors = [];
            state.loading = false;
        },
        forgetPasswordError: (state, action) => {
            state.success = false;
            state.errors = action.payload;
            state.loading = false;
        },
    },
});
export const { forgetPasswordSuccess, forgetPasswordError } = forgetPasswordSlice.actions;

export default forgetPasswordSlice.reducer;
