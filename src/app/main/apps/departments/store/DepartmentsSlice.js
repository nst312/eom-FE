import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { showMessage } from "app/store/fuse/messageSlice";
import axios from "axios";

export const getDepartments = createAsyncThunk(
  "departmentApp/newDepartment/getDepartment",
  async () => {
    const response = await axios.get("/api/departments");
    const data = await response.data;
    return data;
  }
);

export const addDepartments = createAsyncThunk(
  "departmentApp/newDepartment/addDepartment",
  async (department, { dispatch }) => {
    try {
      const response = await axios.post(
        "/api/companies/department",
        department
      );
      dispatch(showMessage({ message: "Department added successfully." }));
      const data = await response.data;
      return data;
    } catch (e) {
      dispatch(
        showMessage({ message: e.response.data.errors.department_name })
      );
    }
  }
);

export const getAllDepartments = createAsyncThunk(
  "departmentApp/newDepartment/getAllDepartment",
  async ({ searchKeyword, page, perPage }, { dispatch }) => {
    const response = searchKeyword
      ? await axios.get(
          `/api/companies/department?page=${page}&perPage=${perPage}&search=${searchKeyword}`
        )
      : await axios.get(
          `/api/companies/department?page=${page}&perPage=${perPage}`
        );
    const data = await response.data;
    dispatch(setDepartmentCount(data.count));
    return data.data;
  }
);

export const removeDepartments = createAsyncThunk(
  "departmentApp/newDepartment/removeDepartment",
  async ({ id }, { dispatch }) => {
    try {
      const response = await axios.delete(`/api/companies/department/${id}`);
      dispatch(showMessage({ message: "Department deleted successfully." }));
      return response.data;
    } catch (err) {
      return err;
    }
  }
);

export const getDepartmentById = createAsyncThunk(
  "departmentApp/newDepartment/getDepartmentById",
  async (id) => {
    const response = await axios.get(`/api/companies/department/${id}`);
    const data = await response.data;
    return data === undefined ? null : data;
  }
);

export const editDepartments = createAsyncThunk(
  "departmentApp/newDepartment/editDepartment",
  async (empDetails, { dispatch }) => {
    const updateData = {
      id: empDetails.id,
      department_name: empDetails.department_name.department_name,
    };
    try {
      const response = await axios.put(
        `/api/companies/department/${empDetails.id}`,
        updateData
      );
      const data = await response.data;
      dispatch(
        showMessage({
          message: "Department updated successfully.",
          autoHideDuration: 4000,
          anchorOrigin: {
            vertical: "top",
            horizontal: "center",
          },
        })
      );
      return data;
    } catch (e) {
      dispatch(
        showMessage({ message: e.response.data.errors.department_name })
      );
    }
  }
);

const DepartmentAdapter = createEntityAdapter({});

export const { selectAll: selectDepartment, selectById: selectDepartmentById } =
  DepartmentAdapter.getSelectors((state) => state.DepartmentApp.department);

const DepartmentSlice = createSlice({
  name: "departmentApp/department",
  initialState: DepartmentAdapter.getInitialState({
    searchText: "",
    orderBy: "",
    orderDescending: false,
    routeParams: {},
    totalCount: 0,
    DepartmentErrorDialog: {
      props: {
        open: false,
      },
      data: null,
    },
  }),
  reducers: {
    setDepartmentSearchText: {
      reducer: (state, action) => {
        state.searchText = action.payload;
      },
      prepare: (event) => ({ payload: event.target.value || "" }),
    },
    toggleOrderDescending: (state, action) => {
      state.orderDescending = !state.orderDescending;
    },
    changeOrder: (state, action) => {
      state.orderBy = action.payload;
    },
    setDepartmentCount: (state, action) => {
      state.totalCount = action.payload;
    },
    openDepartmentDialog: (state, action) => {
      state.DepartmentDialog = {
        type: "new",
        props: {
          open: true,
        },
        data: null,
      };
    },
    openEditDepartmentDialog: (state, action) => {
      state.DepartmentDialog = {
        type: "edit",
        props: {
          open: true,
        },
        data: null,
      };
    },
    closeDepartmentDialog: (state, action) => {
      state.DepartmentDialog = {
        props: {
          open: false,
        },
        data: null,
      };
    },
    setPostCount: (state, action) => {
      state.totalCount = action.payload;
    },
    pushDepartment: DepartmentAdapter.addOne,
    updateDepartment: DepartmentAdapter.updateOne,
    removeDepartment: DepartmentAdapter.removeOne,
    DepartmentError: (state, action) => {
      state.success = false;
      state.errors = action.payload;
      state.loading = false;
    },
  },
  extraReducers: {
    [getAllDepartments.fulfilled]: DepartmentAdapter.setAll,
  },
});

export const {
  setDepartmentSearchText,
  toggleOrderDescending,
  openDepartmentDialog,
  closeDepartmentDialog,
  openEditDepartmentDialog,
  DepartmentError,
  setDepartmentCount,
} = DepartmentSlice.actions;

export default DepartmentSlice.reducer;
