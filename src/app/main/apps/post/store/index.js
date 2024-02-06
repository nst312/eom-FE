import { combineReducers } from '@reduxjs/toolkit';
import filters from './filtersSlice';
import folders from './foldersSlice';
import labels from './labelsSlice';
import posts from './postsSlice';

const reducer = combineReducers({
  posts,
  folders,
  labels,
  filters,
});

export default reducer;
