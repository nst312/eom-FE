import React, { lazy } from "react";
import Invoices from "./invoices/Invoices";
import PERMISSION from "../../../fuse-configs/permission.constants";

const InvoicesList = lazy(() => import("./invoiceList/InvoicesList"));

const InvoicesConfig = {
  setting: {
    layout: {
      config: {
        footer: false,
      },
    },
  },
  routes: [
    {
      path: "/app/invoices/list",
      element: <InvoicesList />,
      auth: [PERMISSION.CAN_INVOICE_LIST],
    },
    {
      path: "/app/invoices/:invoiceId",
      element: <Invoices />,
      auth: [PERMISSION.CAN_INVOICE_LIST],
    },
  ],
};

export default InvoicesConfig;
