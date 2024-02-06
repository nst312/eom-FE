import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { showMessage } from 'app/store/fuse/messageSlice';
import axios from 'axios';

export const allJobPosition = createAsyncThunk(
    'jobPositionApp/jobPosition/getAllJobPosition',
    async ({ searchKeyword, page, perPage },{dispatch}) => {
        const response = searchKeyword ? await axios.get(`/api/job-position?page=${page}&perPage=${perPage}&search=${searchKeyword}`) : await axios.get(`/api/job-position?page=${page}&perPage=${perPage}`);
        const data = await response.data;
        dispatch(setJobPositionCount(data.count))
        return data.data;
    }
);

export const getJobPosition = createAsyncThunk(
  'jobPositionApp/jobPosition/getPosition',
  async (id ) => {
      const response = await axios.get(`/api/job-position/${id}`);
      const data = await response.data;
      return data === undefined ? null : data;
  }
);

export const createJobPosition = createAsyncThunk(
  'jobPositionApp/jobPosition/addJobPosition',
  async (jobPositionData,{ dispatch}) => {
      try {
          const response = await axios.post('/api/job-position/add',jobPositionData);
          dispatch(showMessage({ message: 'Job position added successfully.' }));
          const data = await response.data;
          return data;
      }catch (err) {
          dispatch(showMessage({ message: err.response.data.message }));
      }
  }
);

export const updateJobPosition = createAsyncThunk(
  'jobPositionApp/jobPosition/updateJobPosition',
  async ( params , { dispatch }) => {
      const jobData = {
          jobPosition : params.jobPosition,
          companyDepartmentId: params.companyDepartmentId
      }
      try {
          const response = await axios.put(`/api/job-position/${params.id}`, jobData);
          dispatch(showMessage({ message: 'Job position updated successfully.' }));
          return response.data;
      } catch (err) {
          dispatch(showMessage({ message: err.response.data.message }));
      }
  }
);


export const deleteJobPosition = createAsyncThunk(
    'jobPositionApp/jobPosition/delPosition',
    async ({ id }, { dispatch}) => {
        try {
            const response = await axios.delete(`/api/job-position/${id}`);
            dispatch(showMessage({ message: 'Job position deleted successfully.' }));
            return response.data;
        } catch (err) {
            return err;
        }
    },
);

const JobPositionAdapter = createEntityAdapter({});

export const { selectAll: selectJobPosition, selectById: selectJobPositionById } =
    JobPositionAdapter.getSelectors((state) => state.JobPositionApp.jobPosition);


const JobPositionSlice = createSlice({
    name: 'jobPositionApp/jobPosition',
    initialState: JobPositionAdapter.getInitialState({
        searchText: '',
        orderBy: '',
        orderDescending: false,
        routeParams: {},
        totalCount: 0,
        JobPositionDialog: {
            props: {
                open: false,
            },
            data: null,
        },
    }),
    reducers: {
        setJobPositionSearchText: {
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
        openJobPositionDialog: (state, action) => {
            state.JobPositionDialog = {
                props: {
                    open: true,
                },
                data: null,
            };
        },
        closeJobPositionDialog: (state, action) => {
            state.JobPositionDialog = {
                props: {
                    open: false,
                },
                data: null,
            };
        },
        setJobPositionCount: (state, action) => {
            state.totalCount = action.payload;
        },
        pushJobPosition: JobPositionAdapter.addOne,
        updateJobPosition: JobPositionAdapter.updateOne,
        removeJobPosition: JobPositionAdapter.removeOne,
        JobPositionError: (state, action) => {
            state.success = false;
            state.errors = action.payload;
            state.loading = false;
        },
    },
  extraReducers: {
    [allJobPosition.fulfilled]: JobPositionAdapter.setAll,
  },
});

export const {
    setJobPositionSearchText,
    setJobPositionCount,
    openJobPositionDialog,
    closeJobPositionDialog,
    jobPositionError,
} = JobPositionSlice.actions;

export default JobPositionSlice.reducer;
