import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { showMessage } from '../../../../../store/fuse/messageSlice';

export const getCompanyPolicy = createAsyncThunk(
    'companyPolicyApp/getDetails',
    async  (all, {dispatch}) => {
        const response = await axios.get('api/company-policy');
        const data = await response.data;
        console.log("data",data)
        dispatch(setCompanyPolicyData(data.data))
        return data;
    }
);


export const addCompanyPolicy = createAsyncThunk(
    'companyPolicyApp/addPolicy',
    async (policyData, { dispatch }) => {
        const formData = new FormData();
        formData.append('title', policyData.title)
        formData.append('description', policyData.description)
        formData.append('path', policyData.path)
        try {
            const response = await axios.post('api/company-policy/add', formData);
            const data = await response.data;
            dispatch(getCompanyPolicy())
            dispatch(
                showMessage({
                    message: 'Company Policy added successfully.',
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


export const deleteCompanyPolicy = createAsyncThunk(
    'companyPolicyApp/deletePolicy',
    async ({ id }, { dispatch}) => {
        try {
            const response = await axios.delete(`/api/company-policy/${id}`);
            dispatch(getCompanyPolicy())
            dispatch(showMessage({ message: 'Company policy deleted successfully.' }));
            return response.data;
        } catch (err) {
            return err;
        }
    },
);


export const updateCompanyPolicy = createAsyncThunk(
    'companyPolicyApp/updatePolicy',
    async (policyData, { dispatch, getState }) => {
        console.log("policyData",policyData);
        const formData = new FormData();
        formData.append('title', policyData.data.title)
        formData.append('description', policyData.data.description)
        formData.append('path', policyData.data.path)

        try {
            const response = await axios.put(`/api/company-policy/update/${policyData.id}`, formData);
            dispatch(getCompanyPolicy())
            const data = await response.data;
            dispatch(
                showMessage({
                    message: 'Company Policy updated successfully.',
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





const companyPolicySlice = createSlice({
    name: 'companyPolicyApp',
    initialState: {
        policyData: [],
        CompanyPolicyDialog: {
            type: 'new',
            props: {
                open: false,
            },
            data: null,
        },

        CompanyViewerDialog: {
            type: 'new',
            props: {
                open: false,
            },
            data: null,
        }
    },
    reducers: {
        resetOrder: () => null,
        setCompanyPolicyData:(state, action) =>{
            state.data = action.payload
        },
        openCompanyPolicyDialog: (state, action) => {
            state.CompanyPolicyDialog = {
                type: 'new',
                props: {
                    open: true,
                },
                data: null,
            };
        },
        openEditCompanyPolicyDialog: (state, action) => {
            state.CompanyPolicyDialog = {
                type: 'edit',
                props: {
                    open: true,
                },
                data: action.payload,
            };
        },
        closeCompanyPolicyDialog: (state, action) => {
            state.CompanyPolicyDialog = {
                props: {
                    open: false,
                },
                data: null,
            };
        },
    },
    extraReducers: {
        [getCompanyPolicy.fulfilled]: (state, action) => action.payload
    },
});

export const {setCompanyPolicyData, openEditCompanyPolicyDialog,openCompanyPolicyDialog, closeCompanyPolicyDialog } = companyPolicySlice.actions

export default companyPolicySlice.reducer;