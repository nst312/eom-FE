import React, { lazy } from 'react';
import {Navigate} from 'react-router-dom';

const Department = lazy(() => import('./newDepartment/Department'));
const Departments = lazy(() => import('./departmentList/DepartmentList'));


const DepartmentConfig = {
  settings: {
    layout: {
      config: {
        footer: false,
      },
    },
  },
  routes: [
    {
      path: '/apps/department/:departmentId',
      element: <Department/>,
    },
    {
      path: '/apps/departmentList',
      element: <Departments/>,
    },
    {
      path: '/apps/department',
      element: <Navigate to="/apps/departmentList" />,
    },
  ]
};

export default DepartmentConfig;
