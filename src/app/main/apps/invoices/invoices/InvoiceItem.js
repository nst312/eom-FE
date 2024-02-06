import { IconButton, TextField } from '@mui/material';
import { Field, useFormikContext } from 'formik';
import React, { useEffect } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import ErrorMessage from './ErrorMessage';
import { useParams } from 'react-router';
import { deleteSingleInvoiceItem } from '../store/invoicesBillingSlice';
import { useDispatch } from 'react-redux';

function InvoiceItem({item, index, helpers }) {

  const { values, setFieldValue } = useFormikContext();

  const dispatch = useDispatch()

  const { invoiceId } = useParams()
  useEffect(() => {
    const total =
      values.formData.invoiceItems[index].qty *
      values.formData.invoiceItems[index].rate;
    setFieldValue(`formData.invoiceItems[${index}].total`, total);
  }, [
    values.formData.invoiceItems[index].qty,
    values.formData.invoiceItems[index].rate,
  ]);

  function deleteSingleItem(id, indexItem) {
    helpers.remove(indexItem)
    if(invoiceId) {
      dispatch(deleteSingleInvoiceItem({invoiceId,id}))
    }
  }

  return (
    <>
      <div className='flex -mx-4 '>
        <Field className='hidden' name={`formData.invoiceItems[${index}.id]`}>
          {({ field, meta }) => {
            return (
              <>
                <div>
                  <TextField
                    {...field}
                    className='mt-8 mb-16 mx-4 hidden'
                    variant='outlined'
                    fullWidth
                    placeholder='Item Name'
                    label='Item Name'
                  />
                  {meta.touched && meta.error && (
                    <ErrorMessage message={meta.error} />
                  )}
                </div>
              </>
            );
          }}
        </Field>
        <Field name={`formData.invoiceItems[${index}.name]`}>
          {({ field, meta  }) => {
            return (
              <>
                <div className='w-full mt-8 mx-4 mb-16'>
                  <TextField
                    {...field}
                    className='mt-8 mb-16 mx-4'
                    variant='outlined'
                    fullWidth
                    placeholder='Item Name'
                    label='Item Name'
                  />
                  {meta.touched && meta.error && (
                    <ErrorMessage message={meta.error} />
                  )}
                </div>
              </>
            );
          }}
        </Field>
        <Field name={`formData.invoiceItems[${index}.qty]`}>
          {({ field, meta }) => {
            return (
              <>
                <div className='w-full mt-8 mx-4 mb-16'>
                  <TextField
                    type='number'
                    {...field}
                    className='mt-8 mb-16  mx-4'
                    variant='outlined'
                    fullWidth
                    placeholder='Qty'
                    label='Qty'
                  />
                  {meta.touched && meta.error && (
                    <ErrorMessage message={meta.error} />
                  )}
                </div>
              </>
            );
          }}
        </Field>
        <Field name={`formData.invoiceItems[${index}.rate]`}>
          {({ field, meta }) => {
            return (
              <>
                <div className='w-full mt-8 mx-4 mb-16'>
                  <TextField
                    {...field}
                    className='mt-8 mb-16  mx-4'
                    variant='outlined'
                    fullWidth
                    placeholder='Rate'
                    label='Rate'
                    type='number'
                  />
                  {meta.touched && meta.error && (
                    <ErrorMessage message={meta.error} />
                  )}
                </div>
              </>
            );
          }}
        </Field>
        <Field name={`formData.invoiceItems[${index}.total]`}>
          {({ field, meta }) => {
            return (
              <>
                <div className='w-full mt-8 mx-4 mb-16'>
                  <TextField
                    {...field}
                    className='mt-8 mb-2 mx-4'
                    variant='outlined'
                    fullWidth
                    label='Total'
                    type='number'
                    disabled
                  />
                </div>
              </>
            );
          }}
        </Field>
        <IconButton
          className='mt-8 mx-4 mb-16'
          aria-label='delete'
          disabled={index === 0 ? true : false}
          onClick={() => deleteSingleItem(item.id, index)}
          // onClick={() => {
          //   helpers.remove(index)
          // } }
        >
          <DeleteIcon />
        </IconButton>
      </div>
      <div className='flex -mx-4'>
      <Field name={`formData.invoiceItems[${index}.hsnCode]`}>
        {({ field, meta }) => {
          return (
            <>
              <div className='w-[25%] mx-4 mb-16'>
                <TextField
                  {...field}
                  className='mb-16 mx-4'
                  variant='outlined'
                  fullWidth
                  placeholder='HSN'
                  label='HSN'
                  type='number'
                />
                {meta.touched && meta.error && (
                  <ErrorMessage message={meta.error} />
                )}
              </div>
            </>
          );
        }}
      </Field>
      <Field name={`formData.invoiceItems[${index}.description]`}>
        {({ field, meta }) => {
          return (
            <>
              <TextField
                {...field}
                className='mb-16 mx-4'
                label='Item Description'
                fullWidth
                placeholder='Item Description'
              />
            </>
          );
        }}
      </Field>
      </div>
    </>
  );
}

export default React.memo(InvoiceItem);
