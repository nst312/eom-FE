import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import { showMessage } from 'app/store/fuse/messageSlice';

export const getAllPosts = createAsyncThunk(
  'postApp/posts/getAllPost',
  async ({ userId, searchKeyword, page, perPage }, { dispatch }) => {
    const response = searchKeyword ? await axios.get(`/api/posts?search="${searchKeyword}"&page=${page}&perPage=${perPage}`) : await axios.get(`/api/posts?page=${page}&perPage=${perPage}`);
    const data = await response.data;
    if (data.data.length > 0) {
      for (let i = 0; i < data.data.length; i++) {
        let postsAccepted = data.data[i].postsAccepted
        if (postsAccepted.length > 0) {
          if (data.data[i].createById !== userId) {
            for (let a = 0; a < postsAccepted.length; a++) {
              console.log('data.data----', postsAccepted[a].userId, userId)
              if (postsAccepted[a].userId === userId) {
                data.data[i]['isAcceptedByMe'] = true
              } else {
                data.data[i]['isAcceptedByMe'] = false
              }
            }
          }
        } else {
          data.data[i]['isAcceptedByMe'] = false
        }
      }
    }
    dispatch(setPostCount(data.count))
    return data.data;
  }
);


export const getMyPosts = createAsyncThunk(
  'postApp/posts/getMyPost',
  async ({ userId, searchKeyword, page, perPage }, { dispatch }) => {
    const response = searchKeyword ? await axios.get(`/api/posts/me?search="${searchKeyword}"&page=${page}&perPage=${perPage}`) : await axios.get(`/api/posts/me?page=${page}&perPage=${perPage}`);
    const data = await response.data;
    if (data.data.length > 0) {
      for (let i = 0; i < data.data.length; i++) {
        let postsAccepted = data.data[i].postsAccepted
        if (postsAccepted.length > 0) {
          if (data.data[i].createById !== userId) {
            for (let a = 0; a < postsAccepted.length; a++) {
              if (postsAccepted[a].userId === userId) {
                data.data[i]['isAcceptedByMe'] = true
              } else {
                data.data[i]['isAcceptedByMe'] = false
              }
            }
          }
        } else {
          data.data[i]['isAcceptedByMe'] = false
        }
      }
    }
    dispatch(setPostCount(data.count))
    return data.data;
  }
);

export const savePost = createAsyncThunk('postApp/savePost', async (postData, { dispatch }) => {
  const response = await axios.post('/api/posts', postData.data);
  const data = await response.data;
  dispatch(showMessage({ message: 'Question added successfully.' }));
  dispatch(getAllPosts({ userId: postData.userId, page: 1, perPage: 10 }));
  return data;
});

export const updatePost = createAsyncThunk('postApp/posts/updatePost', async (post, { dispatch, getState }) => {
  const response = await axios.put(`/api/posts/${post.postId}`, post.data);
  const data = await response.data;
  dispatch(getAllPosts({ userId: post.userId, page: 1, perPage: 10 }));
  dispatch(showMessage({ message: 'Post updated successfully.' }));
  return data;
}
);

export const removePost = createAsyncThunk(
  'postApp/posts/removePost',
  async (postId, { dispatch, getState }) => {
    const response = await axios.post('/api/post-app/remove-post', postId);
    const data = await response.data;

    dispatch(getAllPosts({ userId: data.userId, page: 1, perPage: 10 }));

    return data;
  }
);

export const acceptPost = createAsyncThunk(
  'postApp/posts/acceptPost',
  async (postId, { dispatch, getState }) => {
    const response = await axios.post(`/api/posts/${postId}/accept`);
    const data = await response.data;
    dispatch(showMessage({ message: 'Post accepted successfully.' }));
    dispatch(getAllPosts({ userId: data.userId, page: 1, perPage: 10 }));
    return data;
  }
);

export const ratingPost = createAsyncThunk(
  'postApp/posts/ratingPost',
  async (ratingData, { dispatch, getState }) => {
    const response = await axios.post(`/api/posts/${ratingData.id}/rating`, ratingData.data);
    const data = await response.data;
    dispatch(showMessage({ message: 'Rating added successfully.' }));
    dispatch(getAllPosts({ userId: data.userId, page: 1, perPage: 10 }));
    return data;
  }
);

const postsAdapter = createEntityAdapter({});

export const { selectAll: selectAllPost, selectById: selectPostsById } = postsAdapter.getSelectors(
  (state) => state.postApp.posts
);

const postsSlice = createSlice({
  name: 'postApp/posts',
  initialState: postsAdapter.getInitialState({
    searchText: '',
    orderBy: '',
    orderDescending: false,
    routeParams: {},
    totalCount: 0,
    postDialog: {
      type: 'new',
      props: {
        open: false,
      },
      data: null,
    },
  }),
  reducers: {
    setPostsSearchText: {
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
    openNewPostDialog: (state, action) => {
      state.postDialog = {
        type: 'new',
        props: {
          open: true,
        },
        data: null,
      };
    },
    closeNewPostDialog: (state, action) => {
      state.postDialog = {
        type: 'new',
        props: {
          open: false,
        },
        data: null,
      };
    },
    openEditPostDialog: (state, action) => {
      state.postDialog = {
        type: 'edit',
        props: {
          open: true,
        },
        data: action.payload,
      };
    },
    closeEditPostDialog: (state, action) => {
      state.postDialog = {
        type: 'edit',
        props: {
          open: false,
        },
        data: null,
      };
    },
    setPostCount: (state, action) => {
      state.totalCount = action.payload;
    }
  },
  extraReducers: {
    [updatePost.fulfilled]: postsAdapter.upsertOne,
    [getAllPosts.fulfilled]: postsAdapter.setAll,
    [getMyPosts.fulfilled]: postsAdapter.setAll,
  },
});

export const {
  setPostsSearchText,
  toggleOrderDescending,
  changeOrder,
  openNewPostDialog,
  closeNewPostDialog,
  openEditPostDialog,
  closeEditPostDialog,
  setPostCount,
} = postsSlice.actions;

export default postsSlice.reducer;
