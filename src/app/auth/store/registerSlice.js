import { createSlice } from '@reduxjs/toolkit';
import jwtService from 'app/services/jwtService';
import { showMessage } from '../../store/fuse/messageSlice';
import {setUserData} from "./userSlice";
import history from '../../../@history/@history';


export const submitRegister =
  ({ firstName, lastName, displayName, company_name, password, email }) =>
  async (dispatch) => {
    dispatch(setLoading());
    return jwtService
      .createUser({
        firstName,
        lastName,
        displayName,
        company_name,
        password,
        email,
      })
      .then((user) => {
        dispatch(showMessage({ message: `Your account is successfully created ${firstName}` }));
        dispatch(registerSuccess());
        window.location.replace("/apps/wizard-page");
        // history.push({
        //   pathname: '/apps/wizard-page',
        // });
        // dispatch(setUserData(user));
        // return  dispatch(
        //    showMessage({ message: `Your account is successfully created, ${firstName}` })
        //  ).then((res) => {
        //     history.push({
        //         pathname: '/login',
        //     });
        //  });
      })
      .catch((errors) => {
        console.log('errors', errors);
        return dispatch(registerError(errors));
      });
  };

const initialState = {
  success: false,
  errors: [],
  loading: false,
};

const registerSlice = createSlice({
  name: 'auth/register',
  initialState,
  reducers: {
    registerSuccess: (state, action) => {
      state.success = true;
      state.errors = [];
      state.loading = false;
    },
    registerError: (state, action) => {
      state.success = false;
      state.errors = action.payload;
      state.loading = false;
    },
    setLoading: (state, action) => {
      state.loading = true;
    },
  },
  extraReducers: {},
});

export const { registerSuccess, registerError, setLoading } = registerSlice.actions;

export default registerSlice.reducer;
