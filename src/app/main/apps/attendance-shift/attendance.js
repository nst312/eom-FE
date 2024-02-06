import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import {styled} from '@mui/material/styles';
import {useEffect, useState} from 'react';
import FusePageCarded from '../../../../@fuse/core/FusePageCarded/FusePageCarded';
import AttendanceShiftHeader from './attendanceShiftHeader';
import AttendanceShiftRules from "./tabs/attendanceShiftRules";
import AttendanceShift from "./tabs/attendanceShift";
import AttendanceShiftDialog from "./tabs/attendanceShiftDialog";
import {useDispatch} from "react-redux";
import {useParams} from "react-router-dom";
import {getAllAttendanceRules} from "./store/attendanceShiftSlice";

const Root = styled(FusePageCarded)(({ theme }) => ({
  '& .FusePageCarded-header': {
    minHeight: 72,
    height: 72,
    alignItems: 'center',
    [theme.breakpoints.up('sm')]: {
      minHeight: 136,
      height: 136,
    },
  },
}));

function AttendanceTime() {
  const dispatch = useDispatch();
  const routeParams = useParams();
  const [attendanceRules, setAttendanceRules] = useState([]);
  const [tabValue, setTabValue] = useState(0);

  const getAttendanceRules = () => {
    dispatch(getAllAttendanceRules(routeParams)).then((res) => {
      setAttendanceRules(res.payload);
    });
  };

  useEffect(() =>{
    getAttendanceRules();
  }, []);

  function handleTabChange(event, value) {
    setTabValue(value);
    if (value === 0) {
      getAttendanceRules();
    } else {
      setAttendanceRules({});
    }
  }

  return (
    <>
      <Root
        header={<AttendanceShiftHeader tabValue={tabValue} />}
        contentToolbar={
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            indicatorColor="primary"
            textColor="primary"
            variant="scrollable"
            scrollButtons="auto"
            classes={{ root: 'w-full h-64' }}
          >
            <Tab className="h-64" label="Work Shift Rules" />
            <Tab className="h-64" label="Assign Work Shift Rules" />
          </Tabs>
        }
        content={
          <div className="p-16">
            <div className={tabValue !== 0 ? 'hidden' : ''}>
              {tabValue === 0 && (
                <AttendanceShiftRules />
              )}
            </div>

            <div className={tabValue !== 1 ? 'hidden' : ''}>
              <AttendanceShift />
            </div>
          </div>
        }
      />
     <AttendanceShiftDialog/>
    </>
  );
}
export default AttendanceTime;
