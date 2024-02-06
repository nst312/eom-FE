import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from "axios";
import {showMessage} from "../../../../../store/fuse/messageSlice";


export const getExpenseCategory = createAsyncThunk('expenseApp/getExpenseCategory', async () => {
    const response = await axios.get('/api/expense-category');
    const data = await response.data;
    return data;
});

export const allExpense = createAsyncThunk(
    'expenseApp/getExpense',
    async (aaa,{dispatch}) => {
        const response = await axios.get('/api/expense');
        const data = await response.data;
        dispatch(setExpenseData(data.data))
        return data.data;
    }
);

export const addExpense = createAsyncThunk(
    'expenseApp/addExpense',
    async (formData, { dispatch }) => {
        try {
            const response = await axios.post('api/expense', formData);
            const data = await response.data;
            dispatch(allExpense())
            dispatch(
                showMessage({
                    message: 'Expense added successfully.',
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

export const deleteExpense = createAsyncThunk(
    'expenseApp/deleteExpense',
    async ({ id }, { dispatch}) => {
        try {
            const response = await axios.delete(`/api/expense/${id}`);
            dispatch(allExpense())
            dispatch(showMessage({ message: 'Expense deleted successfully.' }));
            return response.data;
        } catch (err) {
            return err;
        }
    },
);



export const updateExpense = createAsyncThunk(
    'expenseApp/updateExpense',
    async ({formData,id}, { dispatch}) => {
        try {
            const response = await axios.put(`/api/expense/update/${id}`, formData);
            const data = await response.data;
            dispatch(
                showMessage({
                    message: 'Expense updated successfully.',
                    autoHideDuration: 4000,
                    anchorOrigin: {
                        vertical: 'top',
                        horizontal: 'center',
                    },
                })
            );
            dispatch(allExpense())
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

export const approvedExpenseStatus = createAsyncThunk(
    'expenseApp/getApproved',
    async (data, { dispatch } ) =>
    {
        try {
            const response = await axios.put(`/api/expense/${data.id}/approved`,{approvedAmount: data.approvedAmount});
            dispatch(showMessage({ message: 'Approved successfully.'}));
            dispatch(allExpense())
            return response.data;
        } catch (err) {
            dispatch(showMessage({ message: err.response.data.message }));
            // return err;
        }
    }
);

export const rejectExpenseStatus = createAsyncThunk(
    'expenseApp/getReject',
    async (data, { dispatch } ) =>
    {
        try {
            const response = await axios.put(`/api/expense/${data.id}/rejected`,{rejectReason: data.rejectReason});
            dispatch(showMessage({ message: 'Rejected successfully.'}));
            dispatch(allExpense())
            return response.data;
        } catch (err) {
            dispatch(showMessage({ message: err.response.data.message }));
            // return err;
        }
    }
);



const ExpenseSlice = createSlice({
    name: 'expenseApp',
    initialState: {
        expenseData: [],
        ExpenseDialog: {
            type: 'new',
            props: {
                open: false,
            },
            data: null,
        },
        ExpenseStatusDialog: {
            type: 'new',
            props: {
                open: false,
            },
            data: null,
        },
    },
    reducers: {
        openExpenseDialog: (state, action) => {
            state.ExpenseDialog = {
                type: 'new',
                props: {
                    open: true,
                },
                data: null,
            };
        },
        openEditExpenseDialog: (state, action) => {
            state.ExpenseDialog = {
                type: 'edit',
                props: {
                    open: true,
                },
                data: action.payload,
            };
        },
        closeExpenseDialog: (state, action) => {
            state.ExpenseDialog = {
                props: {
                    open: false,
                },
                data: null,
            };
        },
        closeExpenseStatusDialog: (state, action) => {
            state.ExpenseStatusDialog = {
                props: {
                    open: false,
                },
                data: null,
            };
        },
        openExpenseStatusDialog: (state, action) => {
            state.ExpenseStatusDialog = {
                type: 'new',
                props: {
                    open: true,
                },
                data: action.payload,
            };
        },
        setExpenseData: (state, action) => {
            state.expenseData = action.payload;
        },
        setExpenseCount: (state, action) => {
            state.totalCount = action.payload;
        },
    },
    extraReducers: {
        [allExpense.fulfilled]: (state, action) => {
            state.expenseData = action.payload;
        },
    },
});

export const {
    openExpenseDialog,
    openEditExpenseDialog,
    closeExpenseDialog,
    setExpenseData,
    closeExpenseStatusDialog,
    openExpenseStatusDialog,
    setExpenseCount,
} = ExpenseSlice.actions;

export default ExpenseSlice.reducer;
