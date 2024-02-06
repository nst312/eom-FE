import { lazy } from 'react';

const WizardPage = lazy(() => import('./WizardPage'));
const UserListAppConfig = {
  settings: {
    layout: {
      config: {
        navbar: {
          display: false,
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
  routes: [
    {
      path: '/apps/wizard-page',
      element: <WizardPage />,
    },
  ],
};

export default UserListAppConfig;
