 import { combineReducers } from '@reduxjs/toolkit';
import employees from './employeeSlice';
import employeeDetails from './employeesDetailSlice';
import addressDetails from './addressSlice';
import empSalary from './empSalarySlice';
import bankDetails from './bankDetailsSlice';
import leavesDetails from './paidLeavesSlice';
import salaryHistories from './salaryHistorySlice';

const reducer = combineReducers({
  employees,
  employeeDetails,
  addressDetails,
  empSalary,
  bankDetails,
  leavesDetails,
  salaryHistories,
});

export default reducer;
