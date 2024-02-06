import { combineReducers } from '@reduxjs/toolkit';
import expenseCategory from './ExpenseCategorySlice';

const reducer = combineReducers({
    expenseCategory,
});

export default reducer;