import { combineReducers } from '@reduxjs/toolkit';
import clients from './clientSlice';
import client from './clientDetailSlice';


const reducer = combineReducers({
    clients,
    client
});

export default reducer;
