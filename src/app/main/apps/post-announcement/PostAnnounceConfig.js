import React, { lazy } from 'react';
import PERMISSION from "../../../fuse-configs/permission.constants";

const PostAnnouncement = lazy(() => import('./post-announcement/PostAnnouncement'));

const PostAnnouncementConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: '/apps/announcement',
      element: <PostAnnouncement/>,
      auth: [PERMISSION.CAN_ANNOUNCEMENT_LIST],
    },
  ],
};

export default PostAnnouncementConfig;
