import { lazy } from 'react';
import PERMISSION from '../../../fuse-configs/permission.constants';

const CalendarApp = lazy(() => import('./CalendarApp'));

const CalendarAppConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      auth: [PERMISSION.CAN_LEAVE_LIST],
      path: '/apps/calendar',
      element: <CalendarApp />,
    },
  ],
};

export default CalendarAppConfig;
