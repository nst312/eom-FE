import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import Icon from '@mui/material/Icon';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import { useDispatch } from 'react-redux';
import { openInvitationDialog } from './store/invitationsSlice';
import { useNavigate } from 'react-router';

function InvitationHeader() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  return (
    <div className="flex flex-1 w-full items-center justify-between">
      <div className="flex items-center">
        <Typography
          className="flex items-center mr-12"
          role="button"
          color="inherit"
          onClick={() => navigate('/apps/employees')}
        >
          <Icon className="text-20">arrow_back</Icon>
        </Typography>
        {/*<Icon*/}
        {/*  component={motion.span}*/}
        {/*  initial={{ scale: 0 }}*/}
        {/*  animate={{ scale: 1, transition: { delay: 0.2 } }}*/}
        {/*  className="text-24 md:text-32"*/}
        {/*>*/}
        {/*  view_list*/}
        {/*</Icon>*/}
        <Typography
          component={motion.span}
          initial={{ x: -20 }}
          animate={{ x: 0, transition: { delay: 0.2 } }}
          delay={300}
          className="hidden sm:flex text-16 md:text-24 mx-12 font-semibold"
        >
          Employee Invitations
        </Typography>
      </div>
      <div className="flex items-center">
        <DialogActions className="justify-end px-8 py-16" onClick={() => {
            dispatch(openInvitationDialog());
        }}>
          <div className="px-16" data-tour="sendInvitation">
            <Button
              type="submit"
              variant="contained"
              color="secondary"
            >
              Invite Employee
            </Button>
          </div>
        </DialogActions>
      </div>
    </div>
  );
}

export default InvitationHeader;
