import { TextField } from '@mui/material';
import { Field, useFormikContext } from 'formik';
import React, { useEffect } from 'react';

function InvoiceFooter({ name, filterGrandTotal, taxAmountTotal }) {
  const { values, setFieldValue } = useFormikContext();

  useEffect(() => {
    const total =
      values.formData.invoiceItems.length > 0 &&
      values.formData.invoiceItems.map((item) => item.qty * item.rate).reduce((a, b) => a + b);
    setFieldValue('formData.grand_total', total);

    const discountedPrice = values.formData.grand_total * (values.formData.discount / 100);

    setFieldValue('formData.discountTotal', values.formData.discountAmount || discountedPrice);
  }, [values]);

  return (
    <>
      <div className="md:flex gap-10">
        <div className="md:w-full md:h-full">
          <Field name={`${name}.note`}>
            {({ field }) => {
              return (
                <>
                  <div className="h-full">
                    <TextField
                      className="w-full h-full mb-16 mt-8 mx-4"
                      placeholder="Add Notes"
                      label="Add Notes"
                      {...field}
                    />
                  </div>
                </>
              );
            }}
          </Field>
        </div>
        <div>
          {/* <Field name={`taxAmountTotal`}> */}
          {/*   {({ field }) => { */}
          {/*     return ( */}
          {/*       <> */}
          {/*         <div> */}
          {/*           <TextField */}
          {/*             className="w-full mt-8 mx-4 mb-16" */}
          {/*             placeholder="Tax Total" */}
          {/*             label="Tax Total" */}
          {/*             disabled */}
          {/*             value={taxAmountTotal} */}
          {/*             {...field} */}
          {/*           /> */}
          {/*         </div> */}
          {/*       </> */}
          {/*     ); */}
          {/*   }} */}
          {/* </Field> */}
          {/* <Field name={`${name}.taxTotal`}> */}
          {/*   {({ field }) => { */}
          {/*     return ( */}
          {/*       <> */}
          {/*         <div> */}
          {/*           <TextField */}
          {/*             className="w-full mt-8 mx-4 mb-16" */}
          {/*             placeholder="Tax Total" */}
          {/*             label="Tax Total" */}
          {/*             disabled */}
          {/*             {...field} */}
          {/*           /> */}
          {/*         </div> */}
          {/*       </> */}
          {/*     ); */}
          {/*   }} */}
          {/* </Field> */}
          <Field name={`${name}.grand_total`}>
            {({ field }) => {
              return (
                <>
                  <div>
                    <TextField
                      placeholder="Grand Total"
                      className="w-full mt-8 mx-4 mb-16"
                      label="Grand Total"
                      disabled
                      {...field}
                    />
                  </div>
                </>
              );
            }}
          </Field>
          <Field name={`${name}.discountTotal`}>
            {({ field }) => {
              return (
                <>
                  <div>
                    <TextField
                      className="w-full mt-8 mx-4 mb-16"
                      placeholder="Discount Total"
                      label="Discount Total"
                      disabled
                      {...field}
                    />
                  </div>
                </>
              );
            }}
          </Field>
          <TextField
            className="w-full mt-8 mx-4 mb-16"
            placeholder="Discount Total"
            label="Tax Amount Total"
            disabled
            value={taxAmountTotal.toFixed(2)}
          />
          <TextField
            className="w-full mt-8 mx-4 mb-16"
            placeholder="Final grand total"
            label="Final Total"
            disabled
            value={filterGrandTotal.toFixed(2)}
          />
          {/* <p>Tax Total : {taxAmountTotal}</p> */}
          {/* <p>filter Grand Total : {filterGrandTotal} </p> */}
          {/* <Field name="grand_total"> */}
          {/*   {({ field }) => { */}
          {/*     return ( */}
          {/*       <> */}
          {/*         <div> */}
          {/*           <TextField */}
          {/*             placeholder="Filter Grand Total" */}
          {/*             className="w-full mt-8 mx-4 mb-16" */}
          {/*             label="Filter Grand Total" */}
          {/*             {...field} */}
          {/*             value={filterGrandTotal} */}
          {/*             disabled */}
          {/*           /> */}
          {/*         </div> */}
          {/*       </> */}
          {/*     ); */}
          {/*   }} */}
          {/* </Field> */}
        </div>
      </div>
    </>
  );
}

export default React.memo(InvoiceFooter);
