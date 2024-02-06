import { Button } from '@mui/material';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useNavigate, useParams } from 'react-router-dom';
import { addClientInvoiceBill, getSingleInvoiceBill, updateInvoice } from '../store/invoicesBillingSlice';
import InvoicesItems from './InvoicesItems';
import InvoiceFooter from './InvoiceFooter';
import FormWrapperComponent from './FormWrapperComponent';
import InvoiceHeader from './InvoiceHeader';
import InvoiceAside from './InvoiceAside';
import { showMessage } from '../../../../store/fuse/messageSlice';

function InvoicesDetails({ initialValue }) {
  const [isDraft, setIsDraft] = useState(false);
  const validationSchema = Yup.object({
    formData: Yup.object().shape({
      clientId: Yup.string().required('Client Name is Require'),
      invoiceNumber: Yup.string().required('Invoice Require'),
      invoiceItems: Yup.array().of(
        Yup.object().shape({
          name: Yup.string().required('Required'),
          qty: Yup.number().required('Reqired').min(1, 'Qty must be greater then 0'),
          rate: Yup.number().required('Reqired'),
        })
      ),
    }),
  });

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const url = useParams();

  function onSubmit(values) {
    const { formData } = values;

    if (url.invoiceId !== 'new') {
      const data = Object.keys(formData).reduce((acc, key) => {
        if (acc !== 'note') {
          acc[key] = formData[key] === '' ? 0 : formData[key];
        }
        return acc;
      }, {});

      if (data.note === 0) {
        data.note = '';
      }

      if (filterGrandTotal < 0 || taxAmountTotal < 0) {
        dispatch(
          showMessage({
            message: 'Filter Grand total value and tax Amount total cannot be negative',
          })
        );
      } else {
        dispatch(
          updateInvoice({
            id: url.invoiceId,
            formData: {
              ...data,
              grandTotal: filterGrandTotal,
              taxTotal: taxAmountTotal,
              status: isDraft ? 'DRAFT' : 'POSTED',
            },
            navigate,
          })
        ).then((resp) => {
          if (resp.payload.id) {
            navigate(`/app/invoices/list`);
          }
        });
        setIsDraft(false);
      }
    } else {
      const data = Object.keys(formData).reduce((acc, key) => {
        if (acc !== 'note') {
          acc[key] = formData[key] === '' ? 0 : formData[key];
        }
        return acc;
      }, {});

      console.log("all data", data)
      if (data.note === 0) {
        data.note = '';
      }

      dispatch(
        addClientInvoiceBill({
          ...data,
          grandTotal: filterGrandTotal,
          taxTotal: taxAmountTotal,
          status: isDraft ? 'DRAFT' : 'POSTED',
          navigate,
        })
      ).then((resp) => {
        if (resp) {
          navigate(`/app/invoices/${resp.payload.id}`);
        }
        setIsDraft(false);
      });
    }
  }

  const [filterGrandTotal, setFilterGrandTotal] = useState(0);
  const [taxAmountTotal, setTaxAmountTotal] = useState(0);

  return (
    <Formik
      initialValues={initialValue}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      validateOnChange={false}
      validateOnBlur
      enableReinitialize
    >
      <Form>
        <FormWrapperComponent
          filterGrandTotal={filterGrandTotal}
          setFilterGrandTotal={setFilterGrandTotal}
          setTaxAmountTotal={setTaxAmountTotal}
        >
          <div className="md:flex justify-between">
            <div className="md:w-5/6 border-r-1 pr-10">
              <div className="md:flex">
                <InvoiceHeader />
              </div>
              <InvoicesItems name="items" />
              <div className="md:w-1/6 md:px-5 md:hidden ">
                <InvoiceAside />
              </div>

              <InvoiceFooter
                name="formData"
                taxAmountTotal={taxAmountTotal}
                filterGrandTotal={filterGrandTotal}
              />
            </div>
            <div className="md:w-1/6 md:px-5 hidden md:block">
              <InvoiceAside />
            </div>
          </div>
          <Button type="submit" variant="contained" color="secondary">
            Post Invoice
          </Button>
          {initialValue.formData.status === 'POSTED' ? null : (
            <Button
              type="submit"
              variant="contained"
              color="secondary"
              className="ml-10"
              onClick={() => setIsDraft(true)}
            >
              Draft Invoice
            </Button>
          )}
        </FormWrapperComponent>
      </Form>
    </Formik>
  );
}

export default InvoicesDetails;
