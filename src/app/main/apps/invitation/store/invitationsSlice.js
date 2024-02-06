  import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { showMessage } from 'app/store/fuse/messageSlice';
import axios from 'axios';

export const getAllInvitation = createAsyncThunk(
  'invitationApp/invitations/getAllPost',
  async (user, { dispatch }) => {
    const response = await axios.get(`/api/invitations`);
    const data = await response.data;

    dispatch(totalInvitationCount(data));
    return data
  },
);

export const sendInvitation = createAsyncThunk(
  'invitationApp/invitation/employee',
  async (invitationData, { dispatch }) => {
    try {
      const response = await axios.post('/api/invitations/employee', invitationData);
      dispatch(showMessage({ message: 'Invitation send successfully.' }));
      return response.data;
    } catch (err) {
      const error = dispatch(invitationError(err?.response))
      return error.payload;
    }
  }
);

export const resendInvitation = createAsyncThunk(
  'invitationApp/resend/invitation/employee',
  async ({ id }, { dispatch }) => {
    try {
      const response = await axios.put(`/api/invitations/resend/${id}`);
      dispatch(showMessage({ message: 'Invitation re-send successfully.' }));
      return response.data;
    } catch (err) {
      console.log(err);
      return err;
    }
  }
);

export const deleteInvitation = createAsyncThunk(
  'invitationApp/delete/invitation/employee',
  async ({ id }, { dispatch}) => {
    try {
      const response = await axios.delete(`/api/invitations/delete/${id}`);
      dispatch(showMessage({ message: 'Invitation deleted successfully.' }));
      return response.data;
    } catch (err) {
      console.log(err);
      return err;
    }
  },
);

export const validateToken = createAsyncThunk(
  'invitationApp/invitation/validate-token',
  async ({ token }, { dispatch}) => {
    try {
      const response = await axios.get(`/api/invitations/validate/${token}`);
      dispatch(showMessage({ message: 'You have accepted invitation.Please set the password and use the system.' }));
      return response.data;
    } catch (err) {
      dispatch(showMessage({ message: err.response.data.message }));
      return err
    }
  },
);

export const acceptInvitationByCreateUser = createAsyncThunk(
  'invitationApp/invitation/validate-token',
  async ({ token, data }, { dispatch}) => {
    try {
      console.log(token, data);
      const response = await axios.post(`/api/invitations/accept/${token}`, {password: data});
      dispatch(showMessage({ message: 'You have successfully set password.' }));
      return response.data;
    } catch (err) {
      dispatch(showMessage({ message: err.response.data.message }));
    }
  },
);

const invitationsAdapter = createEntityAdapter({});

export const { selectAll: selectInvitations, selectById: selectInvitationsById } =
  invitationsAdapter.getSelectors((state) => state.invitationApp.invitations);

const invitationsSlice = createSlice({
  name: 'invitationApp/invitations',
  initialState: invitationsAdapter.getInitialState({
    searchText: '',
    orderBy: '',
    orderDescending: false,
    routeParams: {},
    totalCount: 0,
    invitationDialog: {
      props: {
        open: false,
      },
      data: null,
    },
    invitationCount: 0,
  }),
  reducers: {
    setInvitationsSearchText: {
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
    openInvitationDialog: (state, action) => {
      state.invitationDialog = {
        props: {
          open: true,
        },
        data: null,
      };
    },
    closeInvitationDialog: (state, action) => {
      state.invitationDialog = {
        props: {
          open: false,
        },
        data: null,
      };
    },
    setPostCount: (state, action) => {
      state.totalCount = action.payload;
    },
    pushInvitation: invitationsAdapter.addOne,
    updateInvitation: invitationsAdapter.updateOne,
    removeInvitation: invitationsAdapter.removeOne,
    invitationError: (state, action) => {
      state.success = false;
      state.errors = action.payload;
      state.loading = false;
    },
    totalInvitationCount: (state, action) => {
      state.invitationCount = action.payload.length
    }
  },
  extraReducers: {
    [resendInvitation.fulfilled]: invitationsAdapter.upsertOne,
    [getAllInvitation.fulfilled]: invitationsAdapter.setAll,
    
  },
});

export const {
  setInvitationsSearchText,
  toggleOrderDescending,
  openInvitationDialog,
  closeInvitationDialog,
  pushInvitation,
  updateInvitation,
  removeInvitation,
  invitationError,
  totalInvitationCount
} = invitationsSlice.actions;

export default invitationsSlice.reducer;
