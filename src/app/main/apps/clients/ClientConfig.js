import React, { lazy } from 'react';
import PERMISSION from "../../../fuse-configs/permission.constants";

const Client = lazy(() => import('./client/Client'));
const ClientsList = lazy(() => import('./clientList/ClientList'));


const ClientConfig = {
    settings: {
        layout: {
            config: {
                footer: true,
                header:false,
            },
        },
    },
    routes: [
        {
            path: '/apps/client/:clientId',
            element: <Client/>,
            auth: [PERMISSION.CAN_CLIENT_LIST],
        },
        {
            path: '/apps/client/new',
            element: <Client/>,
            auth: [PERMISSION.CAN_CLIENT_LIST],
        },
        {
            path: '/apps/clients',
            element: <ClientsList/>,
            auth: [PERMISSION.CAN_CLIENT_LIST],
        },
        // {
        //     path: '/apps/employees',
        //     element: <Navigate to="/apps/EmployeeList" />,
        // },
    ]
};

export default ClientConfig;
