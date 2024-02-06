import { combineReducers } from '@reduxjs/toolkit';
import forgotPassword from './forgotPasswordSlice'

const authReducers = combineReducers({
    forgotPassword
});

export default authReducers;
