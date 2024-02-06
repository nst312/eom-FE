import { lazy } from 'react';
import PERMISSION from '../../../fuse-configs/permission.constants';

const Resumes = lazy(() => import('./resumes-list/Resumes'));
const Resume = lazy(() => import('./resumes/Resume'));

const ResumesConfig = {
  settings: {
    layout: {
      config: {
        navbar: {
          // display: false,
        },
        // toolbar: {
        //   display: false,
        // },
        footer: {
          // display: false,
        },
        leftSidePanel: {
          // display: false,
        },
        rightSidePanel: {
          // display: false,
        },
      },
    },
  },
  routes: [
    {
      auth: [PERMISSION.CAN_RESUME_LIST],
      path: '/apps/resume/:resumeId',
      element: <Resume />,
      settings: {
        layout: {
          config: {
            navbar: {
              display: false,
            },
            toolbar: {
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
    },
    {
      auth: [PERMISSION.CAN_RESUME_LIST],
      path: '/apps/resume/new',
      element: <Resume />,
      settings: {
        layout: {
          config: {
            navbar: {
              display: false,
            },
            toolbar: {
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
    },
    {
      auth: [PERMISSION.CAN_RESUME_LIST],
      path: 'apps/resumes/all',
      element: <Resumes />,
    },
  ],
};

export default ResumesConfig;
