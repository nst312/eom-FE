import { combineReducers } from '@reduxjs/toolkit';
import empSalary from './employeeSalarySlice';

const reducer = combineReducers({
    empSalary
});

export default reducer;