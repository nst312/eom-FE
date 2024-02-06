import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { showMessage } from '../../../../store/fuse/messageSlice';

export const getCompany = createAsyncThunk('companyApp/companyProfile', async () => {
  const response = await axios.get('/api/companies/my-company');
  const data = await response.data;
  const swapValue = (obj) => {
    Object.keys(data).forEach((key) => {
      if (!obj[key]) {
        obj[key] = '';
      }
    });
  };
  swapValue(data);

  return data;
});

export const updateCompany = createAsyncThunk(
  'companyApp/companyProfile/updateCompany',
  async (companyData, { dispatch, getState }) => {
    const formData = new FormData();

    formData.append('company_name', companyData.data.company_name);
    formData.append('email', companyData.data.email);
    formData.append('phone', companyData.data.phone);
    formData.append('website', companyData.data.website);
    formData.append('gstin', companyData.data.gstin);
    formData.append('tag_line', companyData.data.tag_line);
    formData.append('company_registry', companyData.data.company_registry);
    // formData.append('working_hour', 10)
    formData.append('company_logo', companyData.uploadFile.fileName);

    try {
      const response = await axios.put(`/api/companies/${companyData.comId.id}`, formData);
      const data = await response.data;
      dispatch(
        showMessage({
          message: 'Company updated successfully.',
          autoHideDuration: 4000,
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'center',
          },
        })
      );
      return data;
    } catch (e) {
      dispatch(
        showMessage({
          message: e.response?.data?.message[0],
          autoHideDuration: 4000,
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'center',
          },
        })
      );
    }
  }
);

const companyDetailsSlice = createSlice({
  name: 'companyApp/companyProfile',
  initialState: null,
  reducers: {
    resetOrder: () => null,
  },
  extraReducers: {
    [getCompany.fulfilled]: (state, action) => action.payload,
  },
});

export const { resetOrder } = companyDetailsSlice.actions;

export default companyDetailsSlice.reducer;
