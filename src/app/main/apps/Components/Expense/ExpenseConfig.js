import React, { lazy } from 'react';

const Expense = lazy(() => import('./Expense/Expense'));

const ExpensesConfig = {
    settings: {
        layout: {
            config: {},
        },
    },
    routes: [
        {
            path: '/apps/expense',
            element: <Expense/>,
        },
    ],
};

export default ExpensesConfig;
