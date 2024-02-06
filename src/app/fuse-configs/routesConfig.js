import FuseUtils from '@fuse/utils';
import appsConfigs from 'app/main/apps/appsConfigs';
import LoginConfig from 'app/main/login/LoginConfig';
import LogoutConfig from 'app/main/logout/LogoutConfig';
import pagesConfigs from 'app/main/pages/pagesConfigs';
import RegisterConfig from 'app/main/register/RegisterConfig';
import FuseLoading from '@fuse/core/FuseLoading';
import { Navigate } from 'react-router-dom';
import FuseProgress from '../main/apps/Components/FuseProgress';

const routeConfigs = [
  ...appsConfigs,
  ...pagesConfigs,
  LogoutConfig,
  LoginConfig,
  RegisterConfig,
  LogoutConfig
];

const routes = [
  // if you want to make whole app auth protected by default change defaultAuth for example:
  // ...FuseUtils.generateRoutesFromConfigs(routeConfigs, ['admin','staff','user']),
  // The individual route configs which has auth option won't be overridden.
  ...FuseUtils.generateRoutesFromConfigs(routeConfigs, null),
  {
    path: 'err',
    element: <Navigate to="pages/errors/error-404" />,
  },
  {
    path: '/',
    element: <Navigate to="/login" />,
  },
  {
    path: 'loading',
    element: <FuseProgress />,
  },
  {
    path: '*',
    element: <Navigate to="pages/errors/error-404" />,
  },

];

export default routes;
