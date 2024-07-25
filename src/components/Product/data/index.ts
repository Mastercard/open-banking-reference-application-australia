const data = {
    products: [
        {
            name: 'Accounts',
            identifier: 'accounts',
            type: 'pay',
            requestType: 'GET',
            description: ' Get a list of shared accounts and their properties.',
            api: '/aggregation/v1/customers/<customerId>/institutionLogins/<institutionLoginId>/accounts',
            link: 'https://developer.mastercard.com/open-banking-au/documentation/api-reference/?view=api#GetCustomerAccounts',
            columns: [
                {
                    accessorKey: 'id',
                    header: 'ID',
                },
                {
                    accessorKey: 'name',
                    header: 'Name ',
                },
                {
                    accessorKey: 'type',
                    header: 'Type',
                },
                {
                    accessorKey: 'balance',
                    header: 'Balance',
                },
                {
                    accessorKey: 'currency',
                    header: 'Currency',
                },
            ],
        },
        {
            name: 'Transactions',
            identifier: 'transactions',
            type: 'pay',
            requestType: 'GET',
            description: 'Get a list of trasactions for given account.',
            api: '/aggregation/v3/customers/<customerId>/accounts/<accountId>/transactions?sort=desc&fromDate=<startDate>&toDate=<endDate>',
            link: 'https://developer.mastercard.com/open-banking-us/documentation/api-reference/?view=api#GetCustomerAccountTransactions',
            columns: [
                {
                    accessorKey: 'date',
                    header: 'Date',
                },
                {
                    accessorKey: 'description',
                    header: 'Description',
                },
                {
                    accessorKey: 'amount',
                    header: 'Amount',
                },
                {
                    accessorKey: 'currency',
                    header: 'Currency',
                },
            ],
        },
        {
            name: 'Money transfer details',
            identifier: 'money_transfer_details',
            type: 'pay',
            requestType: 'GET',
            description:
                'Get the account number and money transfer details that can be used for, e.g., payment use case. Only Transaction & Savings account types are supported.',
            api: '/aggregation/v3/customers/<customerId>/accounts/<accountId>/details',
            link: 'https://developer.mastercard.com/open-banking-au/documentation/api-reference/?view=api#GetMoneyTransferDetails',
            columns: [
                {
                    accessorKey: 'id',
                    header: 'Account Id',
                },
                {
                    accessorKey: 'accountNumber',
                    header: 'Account Number',
                },
                {
                    accessorKey: 'bsbNumber',
                    header: 'BSB Number',
                },
            ],
        },
        {
            name: 'Available balance - Live',
            identifier: 'available_balance',
            type: 'pay',
            requestType: 'GET',
            description:
                'Retrieves the latest cached available & cleared account balances for a customer. Since we update and store balances throughout the day, this is the most accurate balance information available when a connection to a Financial Institution is unavailable or when a faster response is needed.  Only Transaction & Savings and Term Deposit account types are supported.',
            api: '/aggregation/v1/customers/<customerId>/accounts/<accountId>/availableBalance/live',
            link: 'https://developer.mastercard.com/open-banking-au/documentation/api-reference/?view=api#GetAvailableBalanceLive',
            columns: [
                {
                    accessorKey: 'id',
                    header: 'Account Id',
                },
                {
                    accessorKey: 'accountNumber',
                    header: 'Account Number',
                },
                {
                    accessorKey: 'availableBalance',
                    header: 'Available Balance',
                },
                {
                    accessorKey: 'currency',
                    header: 'Currency',
                },
            ],
        },
        {
            name: 'Account owner details',
            identifier: 'account_owner_details',
            type: 'pay',
            requestType: 'GET',
            description:
                ' Retrieve account owner details where available from a financial institution',
            api: '/aggregation/v3/customers/<customerId>/accounts/<accountId>/owner',
            link: 'https://developer.mastercard.com/open-banking-au/documentation/api-reference/?view=api#GetAccountOwnergit',
            columns: [
                {
                    accessorKey: 'id',
                    header: 'Account Id',
                },
                {
                    accessorKey: 'name',
                    header: 'Account Owner Name',
                },
                {
                    accessorKey: 'address',
                    header: 'Account Owner Address',
                },
            ],
        },
        {
            name: 'Verification of Assets',
            identifier: 'voa',
            type: 'lend',
            requestType: 'POST',
            api: '/decisioning/v2/customers/<customerId>/voa',
            link: 'https://developer.mastercard.com/open-banking-au/documentation/api-reference/?view=api#GenerateVOAReport',
            description:
                'The Verification of Assets (VOA) report includes all bank accounts for an individual customer. It retrieves up to twelve months of transaction history for each account type that the customer has permissioned via Connect. Make sure Transaction & Savings or Term Deposit account types are added.',
        },
        {
            name: 'Verification of Income',
            identifier: 'voi',
            type: 'lend',
            requestType: 'POST',
            api: '/decisioning/v2/customers/<customerId>/voi',
            link: 'https://developer.mastercard.com/open-banking-au/documentation/api-reference/?view=api#GenerateVOIReport',
            description:
                'The Verification of Income (VOI) report analyzes both active and inactive income streams, and then ranks them with a confidence score. It retrieves up to 24 months of validated banking data for an individual customer, based on the accounts they have permissioned to access. Make sure Transaction & Savings account types are added.',
        },
        {
            name: 'Cash Flow Report',
            identifier: 'cfr',
            type: 'lend',
            requestType: 'POST',
            api: '/decisioning/v2/customers/<customerId>/cashFlowBusiness',
            link: 'https://developer.mastercard.com/open-banking-au/documentation/api-reference/?view=api#GenerateCashFlowBusinessReport',
            description:
                'The Cash Flow report provides cash flow credit and debit information about a consumer or customer. The availability of consumer report data depends on the financial institution (FI). Some FIs provide only three or four months of transactions while others may provide 12, 18, or 24 months.',
        },
    ],
};

export default data;
