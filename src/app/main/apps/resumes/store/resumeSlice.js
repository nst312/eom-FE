import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { showMessage } from 'app/store/fuse/messageSlice';
import axios from 'axios';
import constants from '../../../../fuse-configs/constants';

export const createResume = createAsyncThunk(
  'resumeApp/resume/createResume',
  async (payload, { dispatch }) => {
    try {
      const response = await axios.post('/api/resume-master', payload);
      dispatch(
        showMessage({
          message: 'Resume submitted successfully.',
          autoHideDuration: 4000,
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'center',
          },
        })
      );
      const data = await response.data;
      return data;
    } catch (err) {
      dispatch(showMessage({ message: err.response.data.message }));
    }
  }
);

export const updateResume = createAsyncThunk(
  'resumeApp/resume/updateResume',
  async (payload, { dispatch }) => {
    try {
      const response = await axios.put(`/api/resume-master/${payload.id}`, payload.data);
      dispatch(
        showMessage({
          message: 'Resume updated successfully.',
          autoHideDuration: 4000,
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'center',
          },
        })
      );
      const data = await response.data;
      return data;
    } catch (err) {
      dispatch(showMessage({ message: err.response.data.message }));
    }
  }
);

export const updateAvatar = createAsyncThunk(
  'resumeApp/resume/update-avatar',
  async (resumeData, { dispatch }) => {
    try {
      const formData = new FormData();
      formData.append('photo', resumeData.photo);
      const response = await axios.put(`/api/resume-master/${resumeData.id}/avatar`, formData);
      const data = await response.data;
      return data;
    } catch (err) {
      dispatch(showMessage({ message: err.response.data.message }));
    }
  }
);

export const getAllResume = createAsyncThunk(
  'resumeApp/resume/all',
  async (pageNo, { dispatch }) => {
    try {
      const response = await axios.get(`/api/resume-master?page=${pageNo}&perPage=10`);
      const data = await response.data;
      return data;
    } catch (err) {
      dispatch(showMessage({ message: err.response.data.message }));
    }
  }
);

export const downloadResume = createAsyncThunk(
  'resumeApp/resume/download',
  async (id, { dispatch }) => {
    try {
      const response = await axios.get(`/api/resume-master/${id}/download`);
      const data = await response.data;
      return data;
    } catch (err) {
      dispatch(showMessage({ message: err.response.data.message }));
    }
  }
);

export const getResumeById = createAsyncThunk('resumeApp/resume/byId', async (id, { dispatch }) => {
  try {
    const response = await axios.get(`/api/resume-master/${id}`);
    const data = await response.data;
    let updatedData = {};
    if (data.personalDetails.photo) {
      updatedData = {
        ...data,
        personalDetails: {
          ...data.personalDetails,
          photo: {
            img: {
              url: `${constants.API_URL}/api/resume-master/image/${data.personalDetails.photo}`,
            },
            file: null,
          },
        },
      };
    } else {
      updatedData = {
        ...data,
        personalDetails: {
          ...data.personalDetails,
          photo: {
            img: null,
            file: null,
          },
        },
      };
    }

    return updatedData;
  } catch (err) {
    dispatch(showMessage({ message: err.response.data.message }));
  }
});

export const initialState = {
  themeCode: 1,
  personalDetails: {
    photo: { img: null, file: null },
    firstName: '',
    lastName: '',
    email: '',
    headline: '',
    phone: '',
    address: '',
    postCode: '',
    city: '',
    dob: null,
    placeBirth: '',
  },
  certificates: [],
  educations: [],
  profiles: {
    description: '',
  },
  employments: [],
  hobbies: [],
  languages: [],
  skills: [],
};

export const updateThemeImage = createAsyncThunk(
  'resumeApp/resume/update-themeImage',
  async (resumeData, { dispatch }) => {
    try {
      const formData = new FormData();
      formData.append('themeImage', resumeData.photo);
      const response = await axios.put(`/api/resume-master/${resumeData.id}/themeImage`, formData);
      const data = await response.data;
      return data;
    } catch (err) {
      dispatch(showMessage({ message: err.response.data.message }));
    }
  }
);

const resumeSlice = createSlice({
  name: 'resumeApp/resume',
  initialState,

  reducers: {
    setResume: (state, action) => {
      return action.payload;
    },
  },
});

export const { setResume } = resumeSlice.actions;
export default resumeSlice.reducer;
