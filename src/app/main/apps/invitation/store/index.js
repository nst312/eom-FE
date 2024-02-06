import { combineReducers } from '@reduxjs/toolkit';
import invitations from './invitationsSlice';

const reducer = combineReducers({
  invitations,
});

export default reducer;
