import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { showMessage } from '../../../../store/fuse/messageSlice';

export const getClientDetails = createAsyncThunk(
  'clientsApp/client/getClientDetails',
  async (params) => {
    const response = await axios.get(`/api/clients/${params.clientId}`);
    const data = await response.data;
    return data === undefined ? null : data;
  },
);

export const addClient = createAsyncThunk(
  'clientsApp/client/addNewClient',
  async (clientData, { dispatch }) => {
    const formData = new FormData();
    formData.append('client_type', clientData.client_type);
    formData.append('client_name', clientData.client_name);
    formData.append('contact_number', clientData.contact_number);
    formData.append('gstin', clientData.gstin);
    formData.append('website', clientData.website);
    formData.append('work_email', clientData.work_email);
    formData.append('files', clientData.fileName);
    Object.keys(clientData.address).forEach(key => formData.append(key, clientData.address[key]));

    try {
      const response = await axios.post('/api/clients', formData);
      dispatch(showMessage({ message: 'Client added successfully.' }));
      const { data } = response;
      return data;
    } catch (err) {
      dispatch(showMessage({ message: err.response.data.errors.work_email }));
    }
  },
);

export const updateClientDetails = createAsyncThunk(
  'clientsApp/client/updateClientDetails',
  async (clientData, { dispatch }) => {
    try {
      const formData = new FormData();
      formData.append('client_type', clientData.data.client_type);
      formData.append('client_name', clientData.data.client_name);
      formData.append('contact_number', clientData.data.contact_number);
      formData.append('gstin', clientData.data.gstin);
      formData.append('website', clientData.data.website);
      formData.append('work_email', clientData.data.work_email);
      formData.append('files', clientData.fileName);
      Object.keys(clientData.data.address).forEach(key => formData.append(key, clientData.data.address[key]));
      const response = await axios.put(`/api/clients/${clientData.id}`, formData);
      dispatch(
        showMessage({
          message: 'Client details successfully updated.',
          autoHideDuration: 4000,
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'center',
          },
        }),
      );
      const data = await response.data;

      return data;
    } catch (err) {
      dispatch(showMessage({ message: err.response.data.message }));
    }
  },
);

const clientDetailSlice = createSlice({
  name: 'clientsApp/client',
  initialState: {},
  reducers: {},
  extraReducers: {
    [getClientDetails.fulfilled]: (state, action) => action.payload,
  },
});

export default clientDetailSlice.reducer;
