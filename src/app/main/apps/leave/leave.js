import { styled } from '@mui/material/styles';
import Tabs from '@mui/material/Tabs';
import {useEffect, useState} from 'react';
import Tab from '@mui/material/Tab';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import FusePageCarded from '../../../../@fuse/core/FusePageCarded/FusePageCarded';
import LeaveHeader from './LeaveHeader';
import LeaveRules from './tabs/LeaveRules';
import withReducer from '../../../store/withReducer';
import reducer from './store';
import LeavesDialog from './tabs/LeaveDialog';
import { getAllLeaveRules } from './store/leaveRulesSlice';
import LeaveAssignRules from './tabs/LeaveAssignRules';

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

function Leave() {
  const dispatch = useDispatch();
  const routeParams = useParams();
  const [tabValue, setTabValue] = useState(0);
  const [leaveRules, setLeaveRules] = useState([]);
  const getLeaveData = useSelector(({ leavesApp }) => leavesApp.leaveRules.leaveData);

  const getLeaveRules = () => {
    dispatch(getAllLeaveRules(routeParams)).then((res) => {
      setLeaveRules(res.payload);
    });
  };

  useEffect(() =>{
    getLeaveRules()
  },[])

  function handleTabChange(event, value) {
    setTabValue(value);
    if (value === 0) {
      getLeaveRules();
    } else {
      setLeaveRules({});
    }
  }

  return (
    <>
      <Root
        header={<LeaveHeader tabValue={tabValue} />}
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
            <Tab className="h-64" label="Leave Rules" />
            <Tab className="h-64" label="Assign Leave Rules" />
          </Tabs>
        }
        content={
          <div className="p-16 sm:p-24 max-w-2xl">

            <div className={tabValue !== 0 ? 'hidden' : ''}>
              {tabValue === 0 && (
                <LeaveRules setLeaveRules={setLeaveRules} leaveRules={leaveRules} />
              )}
            </div>

            <div className={tabValue !== 1 ? 'hidden' : ''}>
              <LeaveAssignRules />
            </div>
          </div>
        }
      />
      <LeavesDialog />
    </>
  );
}
export default Leave;
