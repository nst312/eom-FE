import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import FusePageCarded from '@fuse/core/FusePageCarded';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import reducer from '../store';
import withReducer from 'app/store/withReducer';
import InvoicesHeader from './InvoicesHeader';
import InvoicesDetails from './InvoicesDetails';
import { useDeepCompareEffect } from '@fuse/hooks';

import {
  getInvoice,
  getSingleInvoiceBill,
  initialState,
  newInvoiceValue,
  resetInvoice,
} from '../store/invoicesBillingSlice';

const Root = styled(FusePageCarded)(({ theme }) => ({
  '& .FusePageCarded-header': {
    minHeight: 70,
    height: 70,
    alignItems: 'center',
    [theme.breakpoints.up('sm')]: {
      minHeight: 70,
      height: 70,
    },
  },
  '& .FusePageCarded-topBg': {
    height: 95,
    [theme.breakpoints.up('sm')]: {
      height: 134,
    },
  },
}));

function Invoices() {
  const dispatch = useDispatch();
  const [tabValue, setTabValue] = useState(0);
  const routeParams = useParams();

  const initialValue = useSelector(
    (state) => state.invoicesApp.invoicesBillingSlice,
  );

  useDeepCompareEffect(() => {
    const { invoiceId } = routeParams;

    function invoiceFormState() {
      if (invoiceId === 'new') {
        dispatch(newInvoiceValue());
      } else {
        dispatch(getInvoice(invoiceId));
      }
    }

    invoiceFormState();
  }, [routeParams, dispatch]);

  useEffect(() => {
    if (routeParams.invoiceId !== 'new') {
      dispatch(getSingleInvoiceBill(routeParams.invoiceId));
    }

    return () => {
      dispatch(resetInvoice());
    };
  }, []);

  return (
    <Root
      header={<InvoicesHeader />}
      contentToolbar={
        <Tabs
          value={tabValue}
          indicatorColor='primary'
          textColor='primary'
          variant='scrollable'
          scrollButtons='auto'
          classes={{ root: 'w-full h-64' }}
        >
          <Tab className='h-64' label='Details' />
        </Tabs>
      }
      content={
        <>
          <div className='p-16 sm:p-24'>
            <div className={tabValue !== 0 ? 'hidden' : ''}>
              <InvoicesDetails initialValue={initialValue} />
            </div>
          </div>
        </>
      }
    />
  );
}

export default withReducer('invoicesApp', reducer)(Invoices);
