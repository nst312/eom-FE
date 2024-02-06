import Leave from "./leave";

const LeaveConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: '/apps/leave',
      element: <Leave />,
    },
  ],
};

export default LeaveConfig;
