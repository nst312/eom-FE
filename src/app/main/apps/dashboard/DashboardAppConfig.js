import React from 'react';
import Dashboard from './Dashboard';

const ForgotPasswordPageConfig = {
    settings: {
        layout: {
            config: {},
        },
    },
    routes: [
        {
            path: '/apps/dashboard',
            element: <Dashboard/>,
        },
    ],
};

export default ForgotPasswordPageConfig;

