import { combineReducers } from '@reduxjs/toolkit';
import companyPolicy from './companyPolicySlice'

const reducer = combineReducers({
    companyPolicy
});

export default reducer;
