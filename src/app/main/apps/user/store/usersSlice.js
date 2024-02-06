import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import { showMessage } from '../../../../store/fuse/messageSlice';

export const getUsers = createAsyncThunk('comApp/users/getAllUsers', async () => {
  const response = await axios.get('/api/users');
  const data = await response.data;

  return data.data;
});

const usersAdapter = createEntityAdapter({});

export const removeUsers = createAsyncThunk(
  'comApp/users/removeClient',
  async (id, { dispatch }) => {
    try {
      const response = await axios.put(`/api/users/delete`, id);
      dispatch(showMessage({ message: 'Users deleted successfully.' }));
      return response.data;
    } catch (err) {
      return err;
    }
  }
);

export const { selectAll: selectUsers, selectById: selectOrderById } = usersAdapter.getSelectors(
  (state) => state.comApp.users
);

const usersSlice = createSlice({
  name: 'comApp/users',
  initialState: usersAdapter.getInitialState({
    searchText: '',
  }),
  reducers: {
    setOrdersSearchText: {},
  },
  extraReducers: {
    [getUsers.fulfilled]: usersAdapter.setAll,
  },
});

export default usersSlice.reducer;
