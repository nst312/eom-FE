import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { showMessage } from '../../../../../store/fuse/messageSlice';

export const getWorks = createAsyncThunk('documents/works', async (userId, { dispatch }) => {
  console.log('sdfadasdsa', userId);
  const response = await axios.get(`api/works/${userId}`);
  return response.data;
});

export const saveWorks = createAsyncThunk(
  'documents/saveWorks',
  async (worksData, { dispatch }) => {
    const formData = new FormData();
    formData.append('title', worksData.data.title);
    formData.append('description', worksData.data.description);
    formData.append('path', worksData.file);

    const response = await axios.post(`/api/works/${worksData.userId}`, formData);
    const data = await response.data;
    if (data) {
      dispatch(getWorks(data.employeeId));
    }
    dispatch(showMessage({ message: 'Works added successfully.' }));
    return data;
  }
);

export const editWork = createAsyncThunk('documents/editWork', async (workData, { dispatch }) => {
  const formData = new FormData();
  formData.append('title', workData.data.title);
  formData.append('description', workData.data.description);
  if (workData && workData.file) {
    formData.append('path', workData.file);
  }
  const response = await axios.put(`/api/works/${workData.workId}`, formData);
  const data = await response.data;
  if (data) {
    dispatch(getWorks(data.employeeId));
  }
  dispatch(showMessage({ message: 'Work Updated successfully.' }));
  return data;
});

export const deleteWork = createAsyncThunk('documents/deleteWork', async (workId, { dispatch }) => {
  const response = await axios.delete(`/api/works/${workId}`);
  const data = await response;
  dispatch(showMessage({ message: 'Work Deleted successfully.' }));
});

export const getWorkById = createAsyncThunk('documents/getWorkById', async (workId) => {
  const response = await axios.get(`/api/works/workId/${workId}`);
  const data = await response.data;
  return data === undefined ? null : data;
});

// Certificate

export const getCertificates = createAsyncThunk(
  'documents/certificates',
  async (userId, { dispatch }) => {
    const response = await axios.get(`/api/course-certification/${userId}`);
    console.log(response);
    return response.data;
  }
);

export const saveCertificates = createAsyncThunk(
  'documents/saveCertificates',
  async (CertificatesData, { dispatch }) => {
    const formData = new FormData();
    formData.append('type', CertificatesData.data.type);
    formData.append('title', CertificatesData.data.title);
    formData.append('path', CertificatesData.file);

    const response = await axios.post(
      `/api/course-certification/add/${CertificatesData.userId}`,
      formData
    );
    const data = await response.data;
    if (data) {
      dispatch(getWorks(data.employeeId));
    }
    dispatch(showMessage({ message: 'Certificate added successfully.' }));
    return data;
  }
);

export const editCertificate = createAsyncThunk(
  'documents/editCertificate',
  async (CertificatesData, { dispatch }) => {
    const formData = new FormData();
    formData.append('type', CertificatesData.data.type);
    formData.append('title', CertificatesData.data.title);
    if (CertificatesData && CertificatesData.file) {
      formData.append('path', CertificatesData.file);
    }
    const response = await axios.put(
      `/api/course-certification/update/${CertificatesData.certificateId}`,
      formData
    );
    const data = await response.data;
    if (data) {
      dispatch(getCertificates(data.employeeId));
    }
    dispatch(showMessage({ message: 'Certificate Updated successfully.' }));
    return data;
  }
);

export const deleteCertificate = createAsyncThunk(
  'documents/deleteCertificate',
  async (CertificatesDataId, { dispatch }) => {
    const response = await axios.delete(`/api/course-certification/${CertificatesDataId}`);
    const data = await response;
    dispatch(showMessage({ message: 'Certificate Deleted successfully.' }));
  }
);

export const getCertificateById = createAsyncThunk(
  'documents/getCertificateById',
  async (CertificatesDataId) => {
    const response = await axios.get(`/api/course-certification/courseId/${CertificatesDataId}`);
    const data = await response.data;
    return data === undefined ? null : data;
  }
);

// IDs

export const getIDs = createAsyncThunk('documents/certificates', async (userId, { dispatch }) => {
  console.log(userId);
  const response = await axios.get(`/api/documents/${userId}`);
  console.log(response);
  return response.data;
});

export const saveIDs = createAsyncThunk('documents/saveIDs', async (IDsData, { dispatch }) => {
  const formData = new FormData();
  formData.append('type', IDsData.data.type);
  formData.append('docNumber', IDsData.data.docNumber);
  formData.append('useFor', IDsData.data.useFor);
  formData.append('path', IDsData.file);

  const response = await axios.post(`/api/documents/add/${IDsData.userId}`, formData);
  const data = await response.data;
  if (data) {
    dispatch(getIDs(data.employeeId));
  }
  dispatch(showMessage({ message: 'ID added successfully.' }));
  return data;
});

export const editID = createAsyncThunk('documents/editID', async (IDsData, { dispatch }) => {
  console.log(IDsData);
  const formData = new FormData();
  formData.append('type', IDsData.data.type);
  formData.append('docNumber', IDsData.data.docNumber);
  formData.append('useFor', IDsData.data.useFor);
  if (IDsData && IDsData.file) {
    formData.append('path', IDsData.file);
  }
  const response = await axios.put(`/api/documents/update/${IDsData.idId}`, formData);
  const data = await response.data;
  if (data) {
    dispatch(getIDs(data.employeeId));
  }
  dispatch(showMessage({ message: 'ID Updated successfully.' }));
  return data;
});

export const deleteID = createAsyncThunk('documents/deleteID', async (IDsDataId, { dispatch }) => {
  const response = await axios.delete(`/api/documents/${IDsDataId}`);
  const data = await response;
  dispatch(showMessage({ message: 'ID Deleted successfully.' }));
});

export const getIDById = createAsyncThunk('documents/getIDById', async (IDsDataId) => {
  const response = await axios.get(`/api/documents/documentId/${IDsDataId}`);
  const data = await response.data;
  return data === undefined ? null : data;
});

const initialState = {
  works: [],
  work: {},
  certificates: [],
  certificate: {},
  ids: [],
  id: {},
  worksDialog: {
    type: 'new',
    props: {
      open: false,
    },
    data: null,
  },
  certificateDialog: {
    type: 'new',
    props: {
      open: false,
    },
    data: null,
  },
  idDialog: {
    type: 'new',
    props: {
      open: false,
    },
    data: null,
  },
};

const documentsSlice = createSlice({
  name: 'documents',
  initialState,
  reducers: {
    // works
    setAllWorks: (state, action) => {
      state.works = action.payload;
    },
    setWork: (state, action) => {
      state.work = action.payload;
    },
    openNewWorksDialog: (state, action) => {
      state.worksDialog = {
        type: 'new',
        props: {
          open: true,
        },
        data: null,
      };
    },
    closeNewWorksDialog: (state, action) => {
      state.worksDialog = {
        type: 'new',
        props: {
          open: false,
        },
        data: null,
      };
    },
    openEditWorksDialog: (state, action) => {
      state.worksDialog = {
        type: 'edit',
        props: {
          open: true,
        },
        data: null,
      };
    },
    closeEditWorksDialog: (state, action) => {
      state.worksDialog = {
        type: 'edit',
        props: {
          open: false,
        },
        data: null,
      };
    },
    // certificate
    setAllCertificates: (state, action) => {
      state.certificates = action.payload?.data;
    },
    setCertificate: (state, action) => {
      state.certificate = action.payload;
    },
    openNewCertificatesDialog: (state, action) => {
      state.certificateDialog = {
        type: 'new',
        props: {
          open: true,
        },
        data: null,
      };
    },
    closeNewCertificatesDialog: (state, action) => {
      state.certificateDialog = {
        type: 'new',
        props: {
          open: false,
        },
        data: null,
      };
    },
    openEditCertificatesDialog: (state, action) => {
      state.certificateDialog = {
        type: 'edit',
        props: {
          open: true,
        },
        data: null,
      };
    },
    closeEditCertificatesDialog: (state, action) => {
      state.certificateDialog = {
        type: 'edit',
        props: {
          open: false,
        },
        data: null,
      };
    },
    //  ids
    setAllIDs: (state, action) => {
      state.ids = action.payload?.data;
    },
    setID: (state, action) => {
      state.id = action.payload;
    },
    openNewIDsDialog: (state, action) => {
      state.idDialog = {
        type: 'new',
        props: {
          open: true,
        },
        data: null,
      };
    },
    closeNewIDsDialog: (state, action) => {
      state.idDialog = {
        type: 'new',
        props: {
          open: false,
        },
        data: null,
      };
    },
    openEditIDsDialog: (state, action) => {
      state.idDialog = {
        type: 'edit',
        props: {
          open: true,
        },
        data: null,
      };
    },
    closeEditIDsDialog: (state, action) => {
      state.idDialog = {
        type: 'edit',
        props: {
          open: false,
        },
        data: null,
      };
    },
  },
  extraReducers: {},
});

export const {
  openNewWorksDialog,
  closeNewWorksDialog,
  closeEditWorksDialog,
  setAllWorks,
  openEditWorksDialog,
  setWork,
  openNewCertificatesDialog,
  closeNewCertificatesDialog,
  closeEditCertificatesDialog,
  setAllCertificates,
  openEditCertificatesDialog,
  setCertificate,
  openNewIDsDialog,
  closeNewIDsDialog,
  closeEditIDsDialog,
  setAllIDs,
  openEditIDsDialog,
  setID,
} = documentsSlice.actions;

export default documentsSlice.reducer;
