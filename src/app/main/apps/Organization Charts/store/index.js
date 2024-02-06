import { combineReducers } from '@reduxjs/toolkit';
import organizationChart from './organizationChartSlice';


const reducer = combineReducers({
  organizationChart,
});

export default reducer;