import { combineReducers } from '@reduxjs/toolkit';
import leaveRules from './leaveRulesSlice';
import leaveAssignRules from './LeaveAssignRulesSlice';

const reducer = combineReducers({
    leaveRules,
    leaveAssignRules,
});

export default reducer;