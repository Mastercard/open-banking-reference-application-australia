const requestBody = {
    reportCustomFields: [
        {
            label: 'loanID',
            value: 123456,
            shown: true,
        },
        {
            label: 'loanID',
            value: 123456,
            shown: true,
        },
    ],
    incomeStreamConfidenceMinimum: 50,
};

const data = {
    text: {
        accountError: 'None of the shared accounts are supported for selected report type.',
        waitForReport: 'Report generation in progress',
    },
    reports: [
        {
            name: 'Verification of Assets',
            requestType: 'POST',
            identifier: 'voa',
            shortName: 'VOA',
            api: '/decisioning/v2/customers/<customerId>/voa',
            body: JSON.stringify(requestBody),
        },
        {
            name: 'Verification of Income',
            requestType: 'POST',
            identifier: 'voi',
            shortName: 'VOI',
            api: '/decisioning/v2/customers/<customerId>/voi',
            body: JSON.stringify(requestBody),
        },
        {
            name: 'Cash Flow Report',
            requestType: 'POST',
            identifier: 'cfr',
            shortName: 'cash flow',
            api: '/decisioning/v2/customers/<customerId>/cashFlowBusiness',
            body: JSON.stringify(requestBody),
        },
    ],
    url: {
        getReportStatus: '/decisioning/v1/customers/<customerId>/reports',
        getReport: '/decisioning/v4/customers/<customerId>/reports/<reportId>',
    },
};

export default data;
