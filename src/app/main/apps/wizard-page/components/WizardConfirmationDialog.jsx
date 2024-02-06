import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Box } from '@mui/system';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

const WizardConfirmationDialog = ({ loading, open, handleClose, handleSuccessOpen }) => {
  const theme = useTheme();
  return (
    <Box>
      <Dialog
        open={open}
        onClose={handleClose}
      >
        <DialogTitle id='alert-dialog-title'>
          Please Confirm Your Action
        </DialogTitle>
        <DialogContent>

          <DialogContentText className='text-16'>
            This action will send an activation email/message to your employees. <br /> Are you sent you
            want to continue?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button className='rounded-2' variant='contained' disabled={loading} onClick={handleSuccessOpen}
            autoFocus
          >
            Yes
          </Button>
          <Button className='rounded-2' variant='contained' onClick={handleClose}>
            No
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default WizardConfirmationDialog;
