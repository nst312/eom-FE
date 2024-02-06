import React from 'react';
import Icon from '@mui/material/Icon';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { DialogActions } from '@mui/material';
import { useDispatch } from 'react-redux';
import { deleteSingleInvoice } from '../store/invoicesBillingSlice';

function InvoicesHeader() {
  const navigate = useNavigate();
  const theme = useTheme();
  const url = useParams();
  const dispatch = useDispatch();

  function handleDelete() {
    dispatch(deleteSingleInvoice({ url, navigate }));
  }

  return (
    <div className='flex flex-1 w-full items-center justify-between'>
      <div className='flex flex-col items-start'>
        <motion.div
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1, transition: { delay: 0.3 } }}
        >
          <Typography
            className='flex items-center'
            role='button'
            color='inherit'
            onClick={() => navigate('/app/invoices/list')}
          >
            <Icon className='text-20'>
              {theme.direction === 'ltr' ? 'arrow_back' : 'arrow_forward'}
            </Icon>
            <span className='flex mx-4 font-medium'>Invoice</span>
          </Typography>
        </motion.div>
      </div>

      <div className='flex items-center'>
        <DialogActions className='justify-end p-0'>
          <div>
            <Button
              variant='contained'
              color='secondary'
              onClick={handleDelete}
            >
              Delete
            </Button>
          </div>
        </DialogActions>
      </div>
    </div>
  );
}

export default React.memo(InvoicesHeader);
