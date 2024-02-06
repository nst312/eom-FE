import { Button } from '@mui/material';
import { FieldArray, useFormikContext } from 'formik';
import React from 'react';
import InvoiceItem from './InvoiceItem';

function InvoicesItems({ name }) {
  const { values, setFieldValue } = useFormikContext();

  const { formData } = values;
  const { invoiceItems } = formData;

  function setDefaultValue(helpers) {
    helpers.push({
      name: '',
      qty: '',
      rate: '',
      total: '',
      description: '',
    })
    setFieldValue('formData.cgst', 0);
    setFieldValue('formData.sgst', 0);
    setFieldValue('formData.igst', 0);
    }

  return (
    <FieldArray
      name="formData.invoiceItems"
      render={(helpers) => (
        <div>
          {invoiceItems.map((item, index) => {
            return <InvoiceItem key={index} item={item} index={index} helpers={helpers} />;
          })}
          <Button
            type="button"
            onClick={() =>
              // helpers.push({
              //   name: '',
              //   qty: '',
              //   rate: '',
              //   total: '',
              //   description: '',
              // })
              setDefaultValue(helpers)
            }
          >
            + Add New Item
          </Button>
        </div>
      )}
    />
  );
}

export default React.memo(InvoicesItems);
