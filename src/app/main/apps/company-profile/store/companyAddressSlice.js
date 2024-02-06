import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { showMessage } from '../../../../store/fuse/messageSlice';


export const getCompanyAddress = createAsyncThunk(
    'company/address',
    async () => {
        const response = await axios.get('api/company-address');
        const data = await response.data;
        return data;
    }
);

export const updateCompanyAddress = createAsyncThunk(
    'company/updateAddress',
    async (newData, { dispatch }) => {
        try {
            const response = await axios.put(`api/company-address/${newData.id}`, newData.value);
            const data = await response.data;
            dispatch(
                showMessage({
                    message: 'Company address updated successfully.',
                    autoHideDuration: 4000,
                    anchorOrigin: {
                        vertical: 'top',
                        horizontal: 'center'
                    }
                })
            );
            return data;
        } catch (err) {
            dispatch(showMessage({ message: err.response.data.message }));
        }
    });

export const deleteCompanyAddress = createAsyncThunk(
    'company/deleteAddress',
    async (id, { dispatch }) => {
        try {
            const response = await axios.delete(`api/company-address/${id}`,);
            const data = await response.data;
            dispatch(
                showMessage({
                    message: 'Company address deleted successfully.',
                    autoHideDuration: 4000,
                    anchorOrigin: {
                        vertical: 'top',
                        horizontal: 'center'
                    }
                })
            );
            return data;
        } catch (err) {
            dispatch(showMessage({ message: err.response.data.message }));
        }
    });

export const addCompanyAddress = createAsyncThunk(
    'company/addAddress',
    async (newData, { dispatch }) => {
        try {
            const response = await axios.post('api/company-address', newData);
            const data = await response.data;
            dispatch(
                showMessage({
                    message: 'Company address added successfully.',
                    autoHideDuration: 4000,
                    anchorOrigin: {
                        vertical: 'top',
                        horizontal: 'center'
                    }
                })
            );
            return data;
        } catch (err) {
            dispatch(showMessage({ message: err.response.data.message }));
        }
    });



const companyAddressSlice = createSlice({
    name: 'companyAddress',
    initialState: {},
    reducers: {
        companyAddress: {
            reducer: (state, action) => {
                state.searchText = action.payload;
            },
            prepare: (event) => ({ payload: event.target.value || '' }),
        },
    },
    extraReducers: {
        [getCompanyAddress.fulfilled]: (state, action) => action.payload,
        [updateCompanyAddress.fulfilled]: (state, action) => action.payload,
        [deleteCompanyAddress.fulfilled]: (state, action) => action.payload
    }
});


export default companyAddressSlice.reducer;
