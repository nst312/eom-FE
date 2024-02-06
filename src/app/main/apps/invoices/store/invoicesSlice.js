import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import axios from 'axios';

// get all invoices
export const getAllInvocies = createAsyncThunk(
  'invoiceApp/getAllInvoiceBill',
  async ({ page, perPage, filterData }) => {
    try {
      const resp = await axios.post(
        `/api/invoices/list?page=${page}&perPage=${perPage}`,
        filterData
      );
      const data = await resp.data;
      return data;
    } catch (err) {
      console.log(err);
    }
  }
);

// export const getFilterAllInvoice = createAsyncThunk(
//   'invoiceApp/getAllFilterInvoices',
//   async (filterData) => {
//     console.log(filterData);
//     try {
//       const resp = await axios.post(``);
//       const data = await resp.data;
//       console.log(data);
//       return data;
//     } catch (err) {
//       console.log(err);
//     }
//   }
// );

const initialState = {
  allInvoices: [],
  totalCount: 0,
};

const invoicesClientSlice = createSlice({
  name: 'invoicesApp/getInvoices',
  initialState,
  reducers: {
    emptyAllInvoices: (state, action) => {
      state.allInvoices = [];
    },
    setAllInvoiceData: (state, action) => {
      state.allInvoices = action.payload;
    },
    setInvoiceCount: (state, action) => {
      state.totalCount = action.payload;
    }
  },
  extraReducers: {
    [getAllInvocies.fulfilled]: (state, action) => {
      state.allInvoices = action.payload.data;
      state.totalCount = action.payload.count;
    },
    // [getFilterAllInvoice.fulfilled]: (state, action) => {
    //   state.allInvoices = action.payload.data;
    // },
  },
});

export const { emptyAllInvoices, setAllInvoiceData, setInvoiceCount } = invoicesClientSlice.actions;

export default invoicesClientSlice.reducer;
