import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { showMessage } from '../../../../store/fuse/messageSlice';

export const getAllAnnouncement = createAsyncThunk(
  'announcementApp/addAnnounce',
  async ({ page, perPage, companyId }, { dispatch }) => {
    try {
      const response = await axios.get(`/api/post-announce/list/${companyId}?page=${page}&perPage=${perPage}`);
      const data = await response.data;
      dispatch(setAnnouncementData(data.data));
      dispatch(setAnnouncementCount(data.count));
      return data.data;
    } catch (err) {
      dispatch(showMessage({ message: err.response.data.message }));
    }
  }
);

export const addAnnouncement = createAsyncThunk(
  'announcementApp/addAnnounce',
  async (announceData, { dispatch }) => {
    try {
      const companyId = announceData.companyId
      const response = await axios.post(`/api/post-announce/add/${announceData.companyId}`, {
        message: announceData.message,
      });
      dispatch(showMessage({ message: 'Announcement added successfully.' }));
      const data = await response.data;
      dispatch(getAllAnnouncement({ page: 1, perPage: 10, companyId }));
      return data;
    } catch (err) {
      dispatch(showMessage({ message: err.response.data.message }));
    }
  }
);

export const updateAnnouncement = createAsyncThunk(
  'announcementApp/updateAnnouncement',
  async (item, { dispatch, getState }) => {
    const response = await axios.put(`/api/post-announce/update/${item.id}`, {
      message: item.message,
    });
    const data = await response.data;
    dispatch(getAllAnnouncement({ page: 1, perPage: 10, companyId: item.companyId}));
    dispatch(showMessage({ message: 'Announcement updated successfully.' }));
    return data;
  }
);

export const removeAnnouncement = createAsyncThunk(
    'announcementApp/deleteAnnouncement',
    async (id, { dispatch }) => {
      try {
        const response = await axios.delete(`/api/post-announce/${id}`);
        dispatch(showMessage({ message: 'Announcement deleted successfully.' }));
        return response.data;
      } catch (err) {
        return err;
      }
    }
);

const AnnouncementSlice = createSlice({
  name: 'announcementApp',
  initialState: {
    announcementData: [],
    AnnouncementDialog: {
      type: 'new',
      props: {
        open: false,
      },
      data: null,
    },
  },
  reducers: {
    openAnnouncementDialog: (state, action) => {
      state.AnnouncementDialog = {
        type: 'new',
        props: {
          open: true,
        },
        data: null,
      };
    },
    openEditAnnouncementDialog: (state, action) => {
      state.AnnouncementDialog = {
        type: 'edit',
        props: {
          open: true,
        },
        data: action.payload,
      };
    },
    closeAnnouncementDialog: (state, action) => {
      state.AnnouncementDialog = {
        props: {
          open: false,
        },
        data: null,
      };
    },
    setAnnouncementData: (state, action) => {
      state.announcementData = action.payload;
    },
    setAnnouncementCount: (state, action) => {
      state.totalCount = action.payload;
    },
  },
  extraReducers: {
    [getAllAnnouncement.fulfilled]: (state, action) => {
      state.announcementData = action.payload;
    },
  },
});

export const {
  openAnnouncementDialog,
  openEditAnnouncementDialog,
  closeAnnouncementDialog,
  setAnnouncementData,
  setAnnouncementCount,
} = AnnouncementSlice.actions;

export default AnnouncementSlice.reducer;
