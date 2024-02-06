import { combineReducers } from '@reduxjs/toolkit';
import resume from './resumeSlice';

const reducer = combineReducers({
  resume,
});

export default reducer;
