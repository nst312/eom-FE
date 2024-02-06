import { lazy } from 'react';
import PERMISSION from '../../../fuse-configs/permission.constants';

const AdminLeave = lazy(() => import('./admin-leave/AdminLeaveList'));

const AdminLeaveConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      auth: [PERMISSION.CAN_LEAVE_LIST],
      path: '/apps/admin-leave/leaveList',
      element: <AdminLeave />,
    },
  ],
};

export default AdminLeaveConfig;
