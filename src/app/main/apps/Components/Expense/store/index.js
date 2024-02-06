import { combineReducers } from '@reduxjs/toolkit';
import expense from './expenseSlice';

const reducer = combineReducers({
    expense,
});

export default reducer;