import AttendanceTime from "./attendance";
import PERMISSION from "../../../fuse-configs/permission.constants";

const AttendanceShiftConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      auth: [PERMISSION.CAN_ATTENDANCE_RULES_LIST],
      path: '/apps/attendance-shift',
      element: <AttendanceTime />,
    },
  ],
};
export default AttendanceShiftConfig;
