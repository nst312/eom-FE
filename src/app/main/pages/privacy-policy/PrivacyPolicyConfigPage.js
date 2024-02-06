import { lazy } from 'react';

const PrivacyPolicyPage = lazy(() => import('./PrivacyPolicy'));

const PrivacyPolicyPageConfig = {
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
    routes: [
        {
            path: 'privacy-policy',
            element: <PrivacyPolicyPage />,
        },
    ],
};

export default PrivacyPolicyPageConfig;