import { combineReducers } from '@reduxjs/toolkit';
import department from './DepartmentsSlice';

const reducer = combineReducers({
  department,
});

export default reducer;
