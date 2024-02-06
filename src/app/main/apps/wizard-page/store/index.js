import { combineReducers } from '@reduxjs/toolkit';
import wizard from './WizardSlice';

const reducer = combineReducers({
    wizard,
});

export default reducer;
