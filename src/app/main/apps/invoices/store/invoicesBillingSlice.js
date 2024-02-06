import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { showMessage } from 'app/store/fuse/messageSlice';
import axios from 'axios';

const initialState = {
  formData: {
    clientId: '',
    invoiceDate: new Date(),
    dueDate: new Date(),
    invoiceNumber: '',
    note: '',
    currency: 'Rupee',
    discount: 0,
    discountAmount: 0,
    cgst: 0,
    sgst: 0,
    igst: 0,
    discountTotal: 0,
    taxTotal: 0,
    grand_total: 0,
    filter_grand_total: '',
    invoiceItems: [
      {
        name: '',
        qty: 0,
        rate: 0,
        total: '',
        hsnCode: 0,
        description: '',
      },
    ],
  },
  grand_total: 0,
  discount_grand_total: 0,
};

// invoice Number
export const getInvoiceNumber = createAsyncThunk(
  'invoiceApp/getInvoiceNumber',
  async (name, thunkApi) => {
    const resp = await axios.get('/api/invoices/invoice-number');
    const data = await resp.data;
    return data;
  }
);

// get clientName
export const getClientName = createAsyncThunk(
  'invoiceApp/clientDetails',
  async (name, thunkApi) => {
    const resp = await axios.get('/api/clients');
    const data = await resp.data;
    return data.data;
  }
);

// add client Invoice
export const addClientInvoiceBill = createAsyncThunk(
  'invoiceApp/addInvoiceBill',
  async (formValue, { dispatch }) => {
    try {
      const resp = await axios.post('/api/invoices', formValue);
      const data = await resp.data;
      dispatch(showMessage({ message: 'Invoice added successfully.' }));
      return data;
    } catch (err) {
      dispatch(showMessage({ message: 'Invoice Not Added' }));
    }
  }
);

// get single Invoice
export const getSingleInvoiceBill = createAsyncThunk(
  'invoiceApp/getSingleInvoice',
  async (id, { dispatch }) => {
    try {
      const resp = await axios.get(`/api/invoices/${id}`);
      const data = await resp.data;
      dispatch(setInputValueById(resp.data));
      return data;
    } catch (err) {
      console.log(err);
    }
  }
);

// update single invoice
export const updateInvoice = createAsyncThunk(
  'invoiceApp/updateInvoice',
  async (para, { dispatch }) => {
    try {
      const resp = await axios.put(`/api/invoices/${para.id}`, para.formData);
      const data = await resp.data;
      dispatch(showMessage({ message: 'Invoice updated successfully.' }));
      return data;
    } catch (err) {
      console.log(err);
      dispatch(showMessage({ message: 'Invoice not Updated' }));
    }
  }
);

export const deleteSingleInvoiceItem = createAsyncThunk(
  'invoiceApp/deleteSingleItem',
  async ({ invoiceId, id }) => {
    try {
      const resp = await axios.delete(`/api/invoices/${invoiceId}/invoice-item/${id}`);
    } catch (err) {
      console.log(err);
    }
  }
);

// delete single invoice
export const deleteSingleInvoice = createAsyncThunk(
  'invoiceApp/deleteInvoice',
  async (para, { dispatch }) => {
    try {
      const resp = await axios.delete(`/api/invoices/${para.url.invoiceId}`);
      const data = await resp.data;
      para.navigate(-1);
      dispatch(showMessage({ message: 'Deleted' }));
    } catch (err) {
      console.log(err);
    }
  }
);

// get invoice
export const getInvoice = createAsyncThunk('invoiceApp/getInvoice', async (params) => {
  const response = await axios.get(`/api/invoices/${params}`);
  const data = await response.data;

  return data === undefined ? null : data;
});

// download PDF

export const downloadInvoicePdf = createAsyncThunk(
  'invoiceApp/downloadPdf',
  async (id, { dispatch }) => {
    try {
      const response = await axios.get(`/api/invoices/download/${id}`);
      const data = await response.data;
      return data;
    } catch (err) {
      dispatch(showMessage({ message: err.response.data.message }));
    }
  }
);

// send email

export const sendInvoiceWithMail = createAsyncThunk(
  'invoiceApp/sendMail',
  async (id, { dispatch }) => {
    try {
      const response = await axios.post(`/api/invoices/send/${id}`);
      const data = await response.data;
      if (data) {
        dispatch(showMessage({ message: 'Invoice successfully sent.' }));
      }
      return data;
    } catch (err) {
      console.log(err);
    }
  }
);

const invoicesBillingSlice = createSlice({
  name: 'invoicesApp/getInvoiceBill',
  initialState,
  reducers: {
    resetInvoice: (state, action) => {
      state.formData = initialState.formData;
    },
    setFormData: (state, action) => {
      state.formData = {
        ...state.formData,
        [action.payload.name]: action.payload.value,
      };
    },
    calculateGrandTotal: (state, action) => {
      state.formData = {
        ...state.formData,
        // grand_total: action.payload,
      };
      // state.grand_total = action.payload;
    },
    setAllFormValue: (state, action) => {
      const temFormData = state.formData.grand_total;
      state.formData = {
        ...state.formData,
        ...action.payload.formData,
      };
      state.items = action.payload.items;
    },
    setInputValueById: (state, action) => {
      // state.formData = action.payload;
    },
    newInvoiceValue: {
      reducer: (state, action) => action.payload,
      prepare: (event) => ({
        payload: {
          formData: {
            clientId: '',
            invoiceDate: new Date(),
            dueDate: new Date(),
            invoiceNumber: '',
            note: '',
            currency: 'Rupee',
            discount: 0,
            discountAmount: 0,
            cgst: 0,
            sgst: 0,
            igst: 0,
            discountTotal: 0,
            taxTotal: 0,
            grand_total: 0,
            filter_grand_total: '',
            invoiceItems: [
              {
                name: '',
                qty: 0,
                rate: 0,
                total: '',
                description: '',
              },
            ],
          },
        },
      }),
    },
  },
  extraReducers: {
    [getInvoice.fulfilled]: (state, action) => {
      state.formData = { ...action.payload, grand_total: 0 };
    },
  },
});

export const {
  setFormData,
  setAllFormValue,
  calculateGrandTotal,
  setInputValueById,
  newInvoiceValue,
  resetInvoice,
} = invoicesBillingSlice.actions;

export default invoicesBillingSlice.reducer;
