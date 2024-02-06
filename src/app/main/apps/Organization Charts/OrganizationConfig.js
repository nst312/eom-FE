import React, {lazy} from 'react';
import Organization from './Organization';

const OrganizationConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: '/apps/organization-charts',
      element: <Organization />,
    },
  ],
};

export default OrganizationConfig;
