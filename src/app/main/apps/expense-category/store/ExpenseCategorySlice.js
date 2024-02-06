import {createAsyncThunk, createEntityAdapter, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {showMessage} from "../../../../store/fuse/messageSlice";


export const getExpenseCategory = createAsyncThunk(
    'expenseCategoryApp/getExpenseCategory',
    async ({page, perPage},{dispatch} ) => {
        const response = await axios.get(`/api/expense-category?page=${page}&perPage=${perPage}`);
        const data = await response.data;
        dispatch(setExpenseCategoryData(data.data))
        dispatch(setExpenseCategoryCount(data.count))
        return data === undefined ? null : data.data;
    }
);


export const createExpenseCategory = createAsyncThunk(
    'expenseCategoryApp/addExpenseCategory',
    async (expenseCategoryData,{ dispatch}) => {
        console.log("ExpenseCategoryData",expenseCategoryData)
        try {
            const response = await axios.post(`/api/expense-category/add/${expenseCategoryData.companyId}`,{category: expenseCategoryData.category});
            dispatch(showMessage({ message: 'Expense Category added successfully.' }));
            dispatch(getExpenseCategory({ page: 1, perPage: 10 }))
            const data = await response.data;
            return data;
        }catch (err) {
            dispatch(showMessage({ message: err.response.data.message }));
        }
    }
);


export const updateExpenseCategory = createAsyncThunk(
    'expenseCategoryApp/updateExpenseCategory',
    async ( item , { dispatch }) => {
        try {
            const response = await axios.put(`/api/expense-category/update/${item.id}`,{category: item.category});
            dispatch(showMessage({ message: 'Job position updated successfully.' }));
            dispatch(getExpenseCategory({ page: 1, perPage: 10 }))
            return response.data;
        } catch (err) {
            dispatch(showMessage({ message: err.response.data.message }));
        }
    }
);


export const deleteExpenseCategory = createAsyncThunk(
    'expenseCategoryApp/deleteExpenseCategory',
    async ({ id }, { dispatch}) => {
        try {
            const response = await axios.delete(`/api/expense-category/${id}`);
            dispatch(showMessage({ message: 'Expense Category deleted successfully.' }));
            dispatch(getExpenseCategory({ page: 1, perPage: 10 }))
            return response.data;
        } catch (err) {
            return err;
        }
    },
);




const ExpenseCategoryAdapter = createEntityAdapter({});




const ExpenseCategorySlice = createSlice({
    name: 'expenseCategoryApp/expenseCategory',
    initialState: ExpenseCategoryAdapter.getInitialState({
        categoryData:[],
        searchText: '',
        orderBy: '',
        orderDescending: false,
        routeParams: {},
        totalCount: 0,
        ExpenseCategoryDialog: {
            props: {
                open: false,
            },
            data: null,
        },
    }),
    reducers: {
        setExpenseCategorySearchText: {
            reducer: (state, action) => {
                state.searchText = action.payload;
            },
            prepare: (event) => ({ payload: event.target.value || '' }),
        },
        toggleOrderDescending: (state, action) => {
            state.orderDescending = !state.orderDescending;
        },
        changeOrder: (state, action) => {
            state.orderBy = action.payload;
        },
        openExpenseCategoryDialog: (state, action) => {
            state.ExpenseCategoryDialog = {
                type: 'new',
                props: {
                    open: true,
                },
                data: null,
            };
        },
        openEditExpenseCategoryDialog: (state, action) => {
            state.ExpenseCategoryDialog = {
                type: 'edit',
                props: {
                    open: true,
                },
                data: action.payload,
            };
        },
        closeExpenseCategoryDialog: (state, action) => {
            state.ExpenseCategoryDialog = {
                props: {
                    open: false,
                },
                data: null,
            };
        },
        setExpenseCategoryCount: (state, action) => {
            state.totalCount = action.payload;
        },
        setExpenseCategoryData : (state, action) =>{
          state.categoryData = action.payload
        },
        pushExpenseCategory: ExpenseCategoryAdapter.addOne,
        updateExpenseCategory: ExpenseCategoryAdapter.updateOne,
        removeExpenseCategory: ExpenseCategoryAdapter.removeOne,
        ExpenseCategoryError: (state, action) => {
            state.success = false;
            state.errors = action.payload;
            state.loading = false;
        },
    },
    extraReducers: {
    },
});

export const {
    setExpenseCategorySearchText,
    setExpenseCategoryCount,
    openExpenseCategoryDialog,
    openEditExpenseCategoryDialog,
    closeExpenseCategoryDialog,
    ExpenseCategoryError,
    setExpenseCategoryData
} = ExpenseCategorySlice.actions;

export default ExpenseCategorySlice.reducer;
