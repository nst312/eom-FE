import { combineReducers } from '@reduxjs/toolkit';
import companyAddress from './companyAddressSlice';
import admin from './adminSlice';
import companyProfile from './companyDetailsSlice'
import companyPolicy from './companyPolicySlice'

const reducer = combineReducers({
  companyAddress,
  companyProfile,
  admin,
  companyPolicy
});

export default reducer;
