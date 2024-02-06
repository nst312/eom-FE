import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import { showMessage } from '../../../../store/fuse/messageSlice';

export const getDepartment = createAsyncThunk(
  'departmentApp/newDepartment/getDepartment',
  async () => {
    const response = await axios.get('/api/departments');
    const data = await response.data;
    return data;
  }
);

export const addDepartments = createAsyncThunk(
  'departmentApp/newDepartment/addDepartment',
  async (department,{ dispatch }) => {
      try {
          const response = await axios.post('/api/companies/department', department);
          dispatch(showMessage({ message: 'Department added successfully.' }));
          const data = await response.data;
          return data;
      }catch (e) {
          dispatch(showMessage({ message: e.response.data.errors.department_name}));
      }

  }
);

export const getAllDepartments = createAsyncThunk(
  'departmentApp/newDepartment/getAllDepartment',
  async () => {
    const response = await axios.get('/api/companies/department');
    const data = await response.data;
    return data.data;
  }
);

export const removeDepartments = createAsyncThunk(
  'departmentApp/newDepartment/removeDepartment',
  async (id, { dispatch }) => {
    await axios.delete(`/api/companies/department/${id}`);
      dispatch(showMessage({ message: 'Department deleted successfully.' }));
    return id;
  }
);

export const editDepartments = createAsyncThunk(
  'departmentApp/newDepartment/editDepartment',
  async ({deptId, departmentName}, { dispatch }) => {
      // console.log('dep_data', dep_data);

      try {
          const response = await axios.put(
              `/api/companies/department/${deptId}`,
              {department_name: departmentName},
          );
          const data = await response.data;
          dispatch(
              showMessage({
                  message: 'Department updated successfully.',
                  autoHideDuration: 4000,
                  anchorOrigin: {
                      vertical: 'top',
                      horizontal: 'center',
                  },
              })
          );
          return data;
      }catch (e) {
          dispatch(showMessage({ message: e.response.data.errors.department_name}));
      }


  }
);

const departmentAdapter = createEntityAdapter({});

export const { selectAll: selectDepartment, selectById: selectOrderById } =
  departmentAdapter.getSelectors((state) => state.eCommerceApp.department);

const departmentSlice = createSlice({
  name: 'departmentApp/newDepartment',
  initialState: departmentAdapter.getInitialState({
    searchText: '',
  }),
  reducers: {
    setDepartmentSearchText: {
      reducer: (state, action) => {
        state.searchText = action.payload;
      },
      prepare: (event) => ({ payload: event.target.value || '' }),
    },
  },
  extraReducers: {
    [getDepartment.fulfilled]: departmentAdapter.setAll,
    [addDepartments.fulfilled]: (state, action) => action.payload,
    [getAllDepartments.fulfilled]: departmentAdapter.setAll,
  },
});

export const { setDepartmentSearchText } = departmentSlice.actions;

export default departmentSlice.reducer;
