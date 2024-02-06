import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Box } from '@mui/system';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Typography from '@mui/material/Typography';

const WizardSuccessDialog = ({ open, handleSuccess }) => {
  return (
    <Box>
      <Dialog
        open={open}
      >
        <DialogContent>
          <Box className='flex justify-center items-center mb-16'><img src='/assets/images/logos/success.svg' alt='Success' /></Box>
          <Typography variant='h5' fontWeight='bold' className='text-center mb-16'>Success</Typography>
          <DialogContentText className='text-16 text-center'>
            Co.Hora has been rolled out. <br /> All employees will get an activate their Co.Hora account
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button className='rounded-2' variant='contained' onClick={handleSuccess} autoFocus>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default WizardSuccessDialog;
