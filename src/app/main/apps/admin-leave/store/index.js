import { combineReducers } from '@reduxjs/toolkit';
import adminLeave from './leaveSlice';

const reducer = combineReducers({
    adminLeave
});

export default reducer;
