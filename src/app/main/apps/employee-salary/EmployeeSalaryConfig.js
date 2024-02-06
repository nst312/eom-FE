import React, { lazy } from 'react';
import {Navigate} from 'react-router-dom';
import PERMISSION from "../../../fuse-configs/permission.constants";

const Employee = lazy(() => import('./employee-salary/EmployeeSalaryLists'));


const EmployeesSalaryConfig = {
    settings: {
        layout: {
            config: {
                footer: false,
            },
        },
    },
    routes: [
        {
            path: '/apps/employees/salary',
            element: <Employee/>,
            // auth: [PERMISSION.CAN_SALA],
        },
    ]
};

export default EmployeesSalaryConfig;
