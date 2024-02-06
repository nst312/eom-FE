import { DatePicker, LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { Autocomplete, TextField } from "@mui/material";
import { id } from "date-fns/locale";
import { FastField, Field, useFormikContext } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getClientName, getInvoiceNumber } from "../store/invoicesBillingSlice";
import ErrorMessage from "./ErrorMessage";

function InvoiceHeader({ formik }) {
  const { values, setFieldValue } = useFormikContext();
  const [clientsList, setClientList] = useState([]);

  const dispatch = useDispatch();

  const data = useParams();
  useEffect(() => {
    dispatch(getClientName()).then((resp) => {
      setClientList(resp.payload);
    });
  }, []);

  useEffect(() => {
    if (data.invoiceId === "new") {
      dispatch(getInvoiceNumber()).then((resp) =>
        setFieldValue("formData.invoiceNumber", resp.payload.invoiceNumber)
      );
    }
  }, []);

  const [defaultClientName, setDefaultClientName] = useState("");

  return (
    <>
      <Field name="formData.clientId" id="clientId">
        {({ field, form, meta, field: { onChange, value } }) => {
          let data2 = clientsList.find((item) => item.id == value);

          if (!data2) {
            data2 = { client_name: "" };
          }

          return (
            <>
              <Autocomplete
                id="formData.clientId"
                name="formData.clientId"
                options={clientsList}
                getOptionLabel={(option) => option.client_name}
                className="mt-8 mx-4 mb-16"
                fullWidth
                onChange={(event, newValue) => {
                  setFieldValue("formData.clientId", newValue?.id);
                }}
                value={data2}
                renderInput={(params) => (
                  <>
                    <TextField
                      {...params}
                      className="m-0"
                      label="Select Client"
                      // value={values["formData.clientId"]}
                    />
                    {meta.touched && meta.error && (
                      <p className="text-red">{meta.error}</p>
                    )}
                  </>
                )}
              />
            </>
          );
        }}
      </Field>
      <Field name="formData.invoiceDate" id="invoiceDate">
        {({ field, form, meta, field: { onChange, value } }) => (
          <>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Invoice Date"
                value={value}
                inputFormat='dd-MM-yyyy'
                onChange={(newValue) => {
                  setFieldValue("formData.invoiceDate", newValue);
                }}
                renderInput={(params) => {
                  return (
                    <TextField
                      {...params}
                      fullWidth
                      className="mt-8 mb-16 mx-4"
                    />
                  );
                }}
              />
            </LocalizationProvider>
          </>
        )}
      </Field>
      <Field name="formData.dueDate" id="dueDate">
        {({ field, meta, field: { onChange, value } }) => {
          return (
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Due Date"
                value={value}
                inputFormat='dd-MM-yyyy'
                onChange={(newValue) => {
                  setFieldValue("formData.dueDate", newValue);
                }}
                renderInput={(params) => {
                  return (
                    <TextField
                      {...params}
                      fullWidth
                      className="mt-8 mb-16 mx-4"
                    />
                  );
                }}
              />
            </LocalizationProvider>
          );
        }}
      </Field>
      <Field name="formData.invoiceNumber">
        {({ field, meta, field: { onChange, value } }) => {
          return (
            <>
              <div className="w-full">
                <TextField
                  {...field}
                  className="mt-8 mb-16  mx-4"
                  fullWidth
                  disabled
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

export default InvoiceHeader;
