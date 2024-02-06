import {createSlice, createAsyncThunk, createEntityAdapter} from '@reduxjs/toolkit';
import axios from 'axios';

const employeeSalaryAdapter = createEntityAdapter({});

export const { selectAll: selectEmployeeSalary, selectById: selectedEmployeeSalaryIds} = employeeSalaryAdapter.getSelectors(
    (state) => state.salaryApp.empSalary
);


export const getEmployeeSalary = createAsyncThunk(
    'salaryApp/employee-salary/getEmployee',
    async ({ employeeid, page, perPage }, { dispatch } ) => {
        const response =  await axios.get(`/api/salaries/${employeeid}?page=${page}&perPage=${perPage}`);
        const data = await response.data;
        dispatch(setSalaryCount(data.count))
        return data.data;
    }
);

export const downloadSlip = createAsyncThunk(
    'salaryApp/send-salary-slip/downloadSalarySlip',
    async (salary, { dispatch }) => {
        try {
            const response = await axios.get(`/api/salaries/${salary.empId}/download/${salary.id}`);
            const data = await response.data;
            return data;
        } catch (err) {
            dispatch(showMessage({ message: err.response.data.message }));
        }
    }
);

const empSalarySlice = createSlice({
    name: 'salaryApp',
    initialState: employeeSalaryAdapter.getInitialState({
        searchText: '',
        orderBy: '',
        orderDescending: false,
        routeParams: {},
        totalCount: 0,
    }),
    reducers: {
        setOrdersSearchText: {
            reducer: (state, action) => {
                state.searchText = action.payload;
            },
            prepare: (event) => ({ payload: event.target.value || '' }),
        },
        setSalaryCount: (state, action) => {
            state.totalCount = action.payload;
        }
    },
    extraReducers: {
        [getEmployeeSalary.fulfilled]: employeeSalaryAdapter.setAll
    },
});

export const {
    setOrdersSearchText,
    setSalaryCount,
} = empSalarySlice.actions;

export default empSalarySlice.reducer;
