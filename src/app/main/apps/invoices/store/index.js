import { combineReducers } from "@reduxjs/toolkit";
import invoices from "./invoicesSlice";
import invoicesBillingSlice from "./invoicesBillingSlice";
const reducer = combineReducers({
  invoices,
  invoicesBillingSlice,
});

export default reducer;
