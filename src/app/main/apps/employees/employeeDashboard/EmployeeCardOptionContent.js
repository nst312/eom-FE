import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import { Icon } from '@material-ui/core';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router';
import { getEmployee } from '../store/employeeSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import withReducer from '../../../../store/withReducer';
import reducer from '../store';
import { getAllInvitation, selectInvitations } from '../../invitation/store/invitationsSlice';

function EmployeeCardOptionContent() {

  const totalCount = useSelector(({ eomApp }) => eomApp.employees.totalCount);
  const invitations = useSelector(selectInvitations);
  const totalInvitationCount = useSelector(({ invitationApp }) => invitationApp.invitations.invitationCount);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getEmployeeData = () => {
    dispatch(getEmployee({ page: 0, perPage: 10 }));
  };

  useEffect(() => {
    dispatch(getAllInvitation())
  }, []);

  useEffect(() => {
    getEmployeeData();
  }, []);


  return (
    <div className="w-full flex items-center p-76">
      <div className="grid md:grid-cols-2 gap-40 md:gap-[300px] w-full">
        <Paper className="w-full rounded-none shadow-2xl flex flex-col justify-between cursor-pointer" onClick={() => navigate('/apps/employees/list')}>
          <div className="text-center font-700 border-1 p-12 text-white" style={{ background: "#FF445D" }}>
            <h3>Current Employees - {totalCount}</h3>
          </div>
          <div className="text-center flex justify-center gap-16 items-center py-[150px]">
            <IconButton aria-label="more" size="xl">
              <Icon style={{ fontSize: '32px' }}>people</Icon>
            </IconButton>
            <Typography className="text-28 font-semibold leading-none tracking-tighter">
              Employees
            </Typography>
          </div>
        </Paper>
        <Paper className="w-full rounded-none shadow-2xl flex flex-col justify-between cursor-pointer"   onClick={() => navigate('/apps/invitation')}>
          <div className="text-center font-700 border-1 p-12 text-white" style={{ background: "#FF445D" }}>
            <h3>Current invitations - {totalInvitationCount}</h3>
          </div>
          <div className="text-center flex justify-center gap-16 items-center py-[150px]">
            <IconButton aria-label="more" size="xl">
              <Icon style={{ fontSize: '32px' }} >people</Icon>
            </IconButton>
            <Typography className="text-28 font-semibold leading-none tracking-tighter">
              Invitations
            </Typography>
          </div>
        </Paper>
      </div>
    </div>
  )
}

export default withReducer('eomApp', reducer)(EmployeeCardOptionContent);