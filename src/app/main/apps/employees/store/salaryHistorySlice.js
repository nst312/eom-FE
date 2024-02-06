import {createSlice, createAsyncThunk, createEntityAdapter} from '@reduxjs/toolkit';
import axios from 'axios';
import {showMessage} from "../../../../store/fuse/messageSlice";

export const getSalaryHistory = createAsyncThunk(
    'eomApp/salary-history/getSalaryHistory',
    async (params,{ dispatch }) => {
        const response  = params.searchKeyword
           ? await axios.get(`/api/salaries/getSalaryHistory/${params.employeeId}?perPage=${params.perPage}&Page=${params.page}&search=${params.searchKeyword}`)
           : await axios.get(`/api/salaries/getSalaryHistory/${params.employeeId}?page=${params.page}&perPage=${params.perPage}`);
        const data = await response.data;
        dispatch(setSalaryHistoryCount(data.count));
        return data === undefined ? null : data;
    }
);


export const downloadSalaryHistory = createAsyncThunk(
    'eomApp/salary-history/downloadSalaryHistory',
    async (history, { dispatch }) => {
        try {
            const response = await axios.get(`/api/salaries/download/${history.id}`);
            const data = await response.data;
            return data;
        } catch (err) {
            dispatch(showMessage({ message: err.response.data.message }));
        }
    }
);

const salaryHistoryAdapter = createEntityAdapter({});

export const { selectAll: selectSalaryHistory, selectById: selectedSalaryHistoryIds } =
    salaryHistoryAdapter.getSelectors((state) => state.eomApp.salaryHistories);

const salaryHistorySlice = createSlice({
    name: 'eomApp/salary-history',
    initialState: salaryHistoryAdapter.getInitialState({
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
        setSalaryHistoryCount: (state, action) => {
            state.totalCount = action.payload;
        },
    },
    extraReducers: {
        [getSalaryHistory.fulfilled]: (state, action) => action.payload,
    },
});

export const { setOrdersSearchText, setSalaryHistoryCount } = salaryHistorySlice.actions;

export default salaryHistorySlice.reducer;
