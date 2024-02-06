import { lazy } from 'react';

const CompanyProfilePage = lazy(() => import('./CompanyProfilePage'));

const CompanyProfilePageConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: 'company-profile',
      element: <CompanyProfilePage />,
    },
  ],
};

export default CompanyProfilePageConfig;
