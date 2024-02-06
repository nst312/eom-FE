import React from 'react';
import Invitation from './Invitation';

const InvitationConfig = {
    settings: {
        layout: {
            config: {},
        },
    },
    routes: [
        {
            path: '/apps/invitation',
            element: <Invitation/>,
        },
    ],
};

export default InvitationConfig;
