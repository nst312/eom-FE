import { combineReducers } from '@reduxjs/toolkit';
import department from './DepartmentSlice'


const reducer = combineReducers({
    department
});

export default reducer;