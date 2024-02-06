import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';

export const getFolders = createAsyncThunk('postApp/folders/getFolders', async () => {
  const response = await axios.get('/api/post-app/folders');
  const data = await response.data;

  return data;
});

const foldersAdapter = createEntityAdapter({});

export const { selectAll: selectFolders, selectById: selectFolderById } =
  foldersAdapter.getSelectors((state) => state.postApp.folders);

const foldersSlice = createSlice({
  name: 'postApp/folders',
  initialState: foldersAdapter.getInitialState({}),
  reducers: {},
  extraReducers: {
    [getFolders.fulfilled]: foldersAdapter.setAll,
  },
});

export default foldersSlice.reducer;
