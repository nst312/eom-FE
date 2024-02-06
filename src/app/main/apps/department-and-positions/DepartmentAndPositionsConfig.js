import React from 'react';
import DepartmentAndPosition from './DepartmentAndPositions';

const DepartmentAndPositionsConfig = {
  settings: {
    layout: {
      config: {
        footer: false,
      },
    },
  },
  routes: [
    {
      path: '/apps/departments-and-positions',
      element: <DepartmentAndPosition />,
    },
  ],
};

export default DepartmentAndPositionsConfig;
