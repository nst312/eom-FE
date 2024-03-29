import React from 'react';
import { authRoles } from '../../../auth';
import AcceptInvitation from './AcceptInvitation';


const InvitationConfig = {
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
            path: '/apps/invitation/validate-token/:token',
            element: <AcceptInvitation />,
        },
    ],
};

export default InvitationConfig;
