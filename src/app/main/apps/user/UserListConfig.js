import React, { lazy } from 'react';

const UserList = lazy(() => import('./user-list/UserList'));

const UserListAppConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: 'apps/user/all',
      element: <UserList />,

    },
  ],
};

export default UserListAppConfig;
