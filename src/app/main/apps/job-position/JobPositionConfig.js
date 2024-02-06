import JobPosition from './JobPosition';
import PERMISSION from '../../../fuse-configs/permission.constants';

const JobPositionConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      auth: [PERMISSION.CAN_JOB_POSITION_LIST],
      path: '/apps/job-position',
      element: <JobPosition />,
    },
  ],
};

export default JobPositionConfig;
