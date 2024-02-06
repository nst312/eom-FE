import Pricing from './Pricing';
import PERMISSION from '../../../fuse-configs/permission.constants';

const PricingConfig = {
  settings: {
    layout: {
      config: {
        header: false,
        footer: false,
      },
    },
  },
  routes: [
    {
      path: '/apps/pricing',
      auth: [PERMISSION.CAN_EMPLOYEE_LIST],
      element: <Pricing />,
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
              display: true,
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

export default PricingConfig
