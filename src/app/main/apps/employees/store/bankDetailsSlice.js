import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { showMessage } from '../../../../store/fuse/messageSlice';

export const getBankDetails = createAsyncThunk(
    'eomApp/getBankDetails',
    async  (all, {dispatch}) => {
        const response = await axios.get('https://ifsc.razorpay.com/HDFC0005804',{mode: 'no-cors'});
        const data = await response.data;
        return data;
    }
);


export const getBankDetailsData = createAsyncThunk(
    'eomApp/employee/getBankDetails',
    async (params) => {
        const response = await axios.get(`/api/bank-details/${params.employeeId}`);
        const data = await response.data;

        return data === undefined ? null : data;
    }
);



export const addBankDetails = createAsyncThunk(
    'employee/addBankDetails',
    async (newData, { dispatch ,id}) => {
        try {
            const response = await axios.post(`api/bank-details/add/${newData.id}`,newData.data);
            const data = await response.data;
            dispatch(
                showMessage({
                    message: 'Bank details added successfully.',
                    autoHideDuration: 4000,
                    anchorOrigin: {
                        vertical: 'top',
                        horizontal: 'center',
                    },
                })
            );
            return data;
        } catch (err) {
            dispatch(showMessage({ message: err.response.data.message }));
        }
    }
);

export const updateBankDetails = createAsyncThunk(
    'eomApp/employee/updateBankDetails',
    async (newData, { dispatch }) => {
        const response = await axios.put(`/api/bank-details/update/${newData.bankId}`, newData.data);
        dispatch(
            showMessage({
                message: 'Bank details successfully updated.',
                autoHideDuration: 4000,
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'center',
                },
            })
        );
        const data = await response.data;

        return data;
    }
);



const bankDetailsSlice = createSlice({
    name: 'eomApp/bankDetails',
    initialState: {
        bankData: [],
        searchData:null,
        BankDetailsDialog: {
            type: 'new',
            props: {
                open: false,
            },
            data: null,
        },
    },
    reducers: {
        resetOrder: () => null,
        setBankDetailsData:(state, action) =>{
            state.data = action.payload
        },
        openBankDetailsDialog: (state, action) => {
            state.BankDetailsDialog = {
                type: 'new',
                props: {
                    open: true,
                },
                data: null,
            };
            state.searchData = null;
        },
        openEditBankDetailsDialog: (state, action) => {
            state.BankDetailsDialog = {
                type: 'edit',
                props: {
                    open: true,
                },
                data: action.payload,
            };
        },
        closeBankDetailsDialog: (state, action) => {
            state.BankDetailsDialog = {
                props: {
                    open: false,
                },
                data: null,
            };
        },
        setSearchIfscData:(state, action) =>{
            state.searchData = action.payload
        }
    },
    extraReducers: {
        [getBankDetails.fulfilled]: (state, action) => action.payload
    },
});

export const {closeBankDetailsDialog, openBankDetailsDialog, setSearchIfscData} = bankDetailsSlice.actions

export default bankDetailsSlice.reducer;