import { lazy } from 'react';
import PERMISSION from '../../../fuse-configs/permission.constants';
import EmployeeCardOptions from './employeeDashboard/EmployeeCardOptions';

const Employee = lazy(() => import('./employee/Employee'));
const Employees = lazy(() => import('./employeeList/EmployeeList'));

const EmployeesConfig = {
  settings: {
    layout: {
      config: {
        footer: false,
      },
    },
  },
  routes: [
    {
      path: '/apps/employees',
      element: <EmployeeCardOptions />,
      auth: [PERMISSION.CAN_EMPLOYEE_LIST],
    },
    {
      path: '/apps/employee/:employeeId',
      element: <Employee />,
    },
    {
      path: '/apps/employees/list',
      element: <Employees />,
      auth: [PERMISSION.CAN_EMPLOYEE_LIST],
    },
    // {
    //     path: '/apps/employees',
    //     element: <Navigate to="/apps/EmployeeList" />,
    // },
  ],
};

export default EmployeesConfig;
