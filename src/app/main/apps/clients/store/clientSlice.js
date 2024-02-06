import {createAsyncThunk, createEntityAdapter, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import {showMessage} from "../../../../store/fuse/messageSlice";



export const getClient = createAsyncThunk(
    'clientsApp/client/getClients',
    async ({ searchKeyword, page, perPage }, { dispatch }) => {
        const response = searchKeyword
            ? await axios.get(`/api/clients?perPage=${perPage}&page=${page}&search=${searchKeyword}`)
            : await axios.get(`/api/clients?perPage=${perPage}&page=${page}`);
        const data = await response.data;
        dispatch(setClientCount(data.count));
        return data.data;
    }
);

export const removeClients = createAsyncThunk(
    'clientsApp/client/removeClient',
    async (id, { dispatch }) => {
        try {
            const response = await axios.put(`/api/clients/delete`,  id);
            dispatch(showMessage({ message: 'Clients deleted successfully.' }));
            return response.data;
        } catch (err) {
            return err;
        }
    }
);


const clientAdapter = createEntityAdapter({});

export const { selectAll: selectClient, selectById: selectedClientIds } =
    clientAdapter.getSelectors((state) => state.clientsApp.clients);


const clientSlice = createSlice({
    name: 'clientsApp/client',
    initialState: clientAdapter.getInitialState({
        searchText: '',
        orderBy: '',
        orderDescending: false,
        routeParams: {},
        totalCount: 0,
    }),
    reducers: {
        setClientSearchText: {
            reducer: (state, action) => {
                state.searchText = action.payload;
            },
            prepare: (event) => ({ payload: event.target.value || '' }),
        },
        setClientCount: (state, action) => {
            state.totalCount = action.payload;
        },
    },
    extraReducers: {
        [getClient.fulfilled]: clientAdapter.setAll,
    },
});


export const { setClientSearchText, setClientCount } = clientSlice.actions;

export default clientSlice.reducer;
