import { combineReducers } from '@reduxjs/toolkit';
import empSalary from './employeeSalaryHistorySlice';

const reducer = combineReducers({
    empSalary
});

export default reducer;