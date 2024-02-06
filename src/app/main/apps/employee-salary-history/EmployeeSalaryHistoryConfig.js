import { lazy } from 'react';

const EmployeeSalary = lazy(() => import('./employee-salary-history/SalaryHisotryLists'));

const EmployeesSalaryHistoryConfig = {
  settings: {
    layout: {
      config: {
        footer: false,
      },
    },
  },
  routes: [
    {
      path: '/apps/employees/salary-history',
      element: <EmployeeSalary />,
    },
  ],
};

export default EmployeesSalaryHistoryConfig;
