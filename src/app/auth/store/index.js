import { combineReducers } from '@reduxjs/toolkit';
import login from './loginSlice';
import register from './registerSlice';
import user from './userSlice';
import country from './countrySlice';
import state from './stateSlice';
import city from './citySlice';


const authReducers = combineReducers({
  user,
  login,
  register,
  country,
  state,
  city
});

export default authReducers;
