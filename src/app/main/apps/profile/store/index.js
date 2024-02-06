import { combineReducers } from "@reduxjs/toolkit";
import profile from "./profileSlice";
// eslint-disable-next-line import/no-named-as-default
import resetPassword from "./resetPasswordSlice";
import employeeProfileAddress from "./employeeAddressSlice";
import documents from "./documentsSlice";

const reducer = combineReducers({
  profile,
  resetPassword,
  employeeProfileAddress,
  documents,
});

export default reducer;
