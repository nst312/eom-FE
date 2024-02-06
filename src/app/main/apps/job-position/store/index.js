import { combineReducers } from '@reduxjs/toolkit';
import jobPosition from './JobPositionSlice';
import jobPositionData from './jobPositiondataSlice';

const reducer = combineReducers({
    jobPosition,
    jobPositionData
});

export default reducer;
