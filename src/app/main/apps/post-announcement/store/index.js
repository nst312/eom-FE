import { combineReducers } from '@reduxjs/toolkit';
import announcement from './announcementSlice';

const reducer = combineReducers({
  announcement,
});

export default reducer;
