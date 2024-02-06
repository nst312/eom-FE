import { combineReducers } from '@reduxjs/toolkit';
import attendanceShiftData from './attendanceShiftSlice';
import attendanceAssignRules from './attendanceShiftAssign';

const reducer = combineReducers({
  attendanceShiftData,
  attendanceAssignRules,
});

export default reducer;
