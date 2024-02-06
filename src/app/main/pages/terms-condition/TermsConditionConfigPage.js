import { lazy } from 'react';

const TermsConditionPage = lazy(() => import('./TermsCondition'));

const TermsConditionPageConfig = {
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
            path: 'terms-condition',
            element: <TermsConditionPage />,
        },
    ],
};

export default TermsConditionPageConfig;