import React from 'react';
import Depart from './Departments';
import PERMISSION from "../../../fuse-configs/permission.constants";

const DepartmentsConfig = {
    settings: {
        layout: {
            config: {},
        },
    },
    routes: [
        {
            path: '/apps/departments',
            element: <Depart/>,
            auth: [PERMISSION.CAN_COMPANY_DEPARTMENT_LIST],
        },
    ],
};

export default DepartmentsConfig;
