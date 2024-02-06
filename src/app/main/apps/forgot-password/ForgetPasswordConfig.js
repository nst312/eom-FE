import { authRoles } from 'app/auth';
import React from "react";
import ForgetPassword from "./ForgetPassword";
import UpdatePassword from "./UpdatePassword";

const ForgetPasswordConfig = {
    settings: {
        layout: {
            config: {
                navbar: {
                    display: false,
                },
                toolbar: {
                    display: false,
                },
                footer: {
                    display: false,
                },
                leftSidePanel: {
                    display: false,
                },
                rightSidePanel: {
                    display: false,
                },
            },
        },
    },
    auth: authRoles.onlyGuest,
    routes: [
        {
            path: 'forgot-Password',
            element: <ForgetPassword />,
        },
        {
            path: '/apps/forgot-password/validate-token/:token',
            element: <UpdatePassword />,
        },
    ],
};

export default ForgetPasswordConfig;