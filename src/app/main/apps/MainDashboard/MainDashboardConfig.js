import { lazy } from 'react';
import PERMISSION from '../../../fuse-configs/permission.constants';

const MainDashboard = lazy(() => import('./MainDashboard'));

const MainDashboardConfig = {
  setting: {
    layout: {
      config: {
        footer: false,
      },
    },
  },
  routes: [
    {
      path: '/apps/maindashboard',
      element: <MainDashboard />,
      // auth: [PERMISSION.CAN_USER_LIST],
      settings: {
        layout: {
          config: {
            navbar: {
              display: true,
            },
            toolbar: {
              display: true,
            },
            footer: {
              display: false,
            },
            leftSidePanel: {
              display: false,
            },
            rightSidePanel: {
              display: false,
            },
          },
        },
      },
    },
  ],
};

export default MainDashboardConfig;
