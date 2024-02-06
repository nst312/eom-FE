import { DatePicker, LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { Autocomplete, InputAdornment, TextField } from "@mui/material";
import { Field, useFormikContext } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { calculateGrandTotal } from "../store/invoicesBillingSlice";
import ErrorMessage from "./ErrorMessage";

function InvoiceAside({ formik }) {
  const { values, setFieldValue, handleChange } = useFormikContext();
  const [filterGrandTotal, setGrandTotal] = useState();

  const [discountInPercentage, setDiscountInPercentage] = useState(true);

  // const { handleChange } = formik;
  const dispatch = useDispatch();

  let tempGrandTotal = function () {
    let calculatedValue;
    if (values.formData.discountAmount) {
      calculatedValue =
        values.formData.grand_total - values.formData.discountAmount;
      return calculatedValue;
    }

    if (values.formData.discount) {
      calculatedValue =
        values.formData.grand_total -
        values.formData.grand_total * (values.formData.discount / 100);

      return calculatedValue;
    }

    return values.formData.grand_total;
  };

  const currencyList = [
    {
      id: 1,
      currency: "Rupee",
    },
    {
      id: 2,
      currency: "Dollar",
    },
  ];

  return (
    <>
      <Field name="formData.currency">
        {({ field, meta, field: { onChange, value } }) => {
          let data2 = currencyList.find((item) => item.currency == value);

          if (!data2) {
            data2 = { currency: "" };
          }
          return (
            <>
              <Autocomplete
                id="formData.currency"
                name="formData.currency"
                options={currencyList}
                getOptionLabel={(option) => option.currency}
                className="mt-8 mb-16 mx-4"
                fullWidth
                value={data2}
                onChange={(event, value) => {
                  setFieldValue("formData.currency", value?.currency);
                }}
                renderInput={(params) => (
                  <>
                    <TextField
                      {...params}
                      className="m-0"
                      onChange={handleChange}
                      label="Select Current"
                      value={values["formData.currency"]}
                    />
                    {meta.touched && meta.error && <p>{meta.error}</p>}
                  </>
                )}
              />
            </>
          );
        }}
      </Field>
      <Field name="formData.discountAmount">
        {({ field, meta, field: { onChange, value } }) => {
          return (
            <>
              <div>
                <TextField
                  {...field}
                  className="mt-8 mb-16 mx-4"
                  variant="outlined"
                  fullWidth
                  placeholder="Discount Amount"
                  label="Discount Amount"
                  type="number"
                  // value={value}
                  // disabled={values.formData.discount > 0 }
                  disabled={values.formData.discount > 0 || values.formData.cgst > 0 || values.formData.sgst > 0 || values.formData.igst > 0}
                />
                {meta.touched && meta.error && (
                  <ErrorMessage message={meta.error} />
                )}
              </div>
            </>
          );
        }}
      </Field>
      <Field name="formData.discount">
        {({ field, meta, field: { onChange, value } }) => {
          return (
            <>
              <div>
                <TextField
                  {...field}
                  className="mt-8 mb-16 mx-4"
                  variant="outlined"
                  fullWidth
                  placeholder="Discount"
                  label="Discount"
                  type="number"
                  // disabled={values.formData.discountAmount > 0}
                  disabled={values.formData.discountAmount > 0 || values.formData.cgst > 0 || values.formData.sgst > 0 || values.formData.igst > 0}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="start">%</InputAdornment>
                    ),
                  }}
                />
                {meta.touched && meta.error && (
                  <ErrorMessage message={meta.error} />
                )}
              </div>
            </>
          );
        }}
      </Field>
      <Field name="formData.cgst">
        {({ field, meta, field: { onChange, value } }) => {
          return (
            <>
              <div>
                <TextField
                  {...field}
                  className="mt-8 mb-16 mx-4"
                  variant="outlined"
                  fullWidth
                  placeholder="CGST"
                  label="CGST"
                  type="number"
                  disabled={values.formData.igst > 0}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="start">%</InputAdornment>
                    ),
                  }}
                />
                {meta.touched && meta.error && (
                  <ErrorMessage message={meta.error} />
                )}
              </div>
            </>
          );
        }}
      </Field>
      <Field name="formData.sgst">
        {({ field, meta, field: { onChange, value } }) => {
          return (
            <>
              <div>
                <TextField
                  {...field}
                  className="mt-8 mb-16 mx-4"
                  variant="outlined"
                  fullWidth
                  placeholder="SGST"
                  label="SGST"
                  type="number"
                  disabled={values.formData.igst > 0}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="start">%</InputAdornment>
                    ),
                  }}
                />
                {meta.touched && meta.error && (
                  <ErrorMessage message={meta.error} />
                )}
              </div>
            </>
          );
        }}
      </Field>
      <Field name="formData.igst">
        {({ field, meta, field: { onChange, value } }) => {
          return (
            <>
              <div>
                <TextField
                  {...field}
                  className="mt-8 mb-16 mx-4"
                  variant="outlined"
                  fullWidth
                  placeholder="IGST"
                  label="IGST"
                  type="number"
                  disabled={values.formData.sgst > 0 || values.formData.cgst > 0}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="start">%</InputAdornment>
                    ),
                  }}
                />
                {meta.touched && meta.error && (
                  <ErrorMessage message={meta.error} />
                )}
              </div>
            </>
          );
        }}
      </Field>
    </>
  );
}

export default InvoiceAside;
