import { combineReducers } from '@reduxjs/toolkit';
import documents from './documentSlice';

const reducer = combineReducers({
  documents,
});

export default reducer;
