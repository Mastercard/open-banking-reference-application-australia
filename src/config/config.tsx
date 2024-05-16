import React from 'react';
import { Tooltip } from '@mui/material';

/* Configure App key, Partner ID and Partner Secret */
export const PARTNERID = process.env.REACT_APP_PARTNERID ?? '';
export const PARTNERSECRET = process.env.REACT_APP_SECRET ?? '';
export const APP_KEY = process.env.REACT_APP_KEY ?? '';

/* URL's  */
export const URL = {
    genTokenUrl: '/aggregation/v2/partners/authentication',
    activateCustomerUrl: '/aggregation/v2/customers/testing',
    genConnectUrl: '/connect/v2/generate',
    accountInfoUrl: '/aggregation/v1/customers/<customerId>/accounts',
    achUrl: '/aggregation/v3/customers/<customerId>/accounts/<accountId>/details',
    getSubscriptions: '/notifications/webhooks/subscriptions',
    createWebhookEndPoint: '/token',
    updateSubscriptionUrl:
        '/notifications/webhooks/subscriptions/<subscriptionUuid>/url',
    subscibeForConsentNotifications: '/notifications/webhooks/subscriptions',
    retrieveConsent: 'token/<subscriptionUuid>/requests?sorting=newest&page=1',
};

export type HeadersType = 'AGGREGATION' | 'WEBHOOK';
/* DEPOSIT ACCOUNT TYPES FOR ACH  */
export const DEPOSIT_ACCOUNTS = [
    'checking',
    'savings',
    'transactionAndSavings',
];

/* Request body the fetch call */
export const REQUEST_BODY = {
    generateAppToken: {
        partnerId: PARTNERID,
        partnerSecret: PARTNERSECRET,
    },
    activateCustomer: {
        firstName: 'John',
        lastName: 'Smith',
        email: `john_smith_${Date.now()}@domain.com`,
        phone: '6786786786',
    },
};

export const LINKS = {
    accountInfo: {
        moneyTransferDetails:
            'https://developer.mastercard.com/open-banking-au/documentation/api-reference/?view=api#GetMoneyTransferDetails',
        availableBalance:
            'https://developer.mastercard.com/open-banking-au/documentation/api-reference/?view=api#GetCustomerAccounts',
    },
    cards: {
        apiProducts:
            'https://developer.mastercard.com/open-banking-au/documentation/api-reference/',
        quickStart:
            'https://developer.mastercard.com/open-banking-au/documentation/quick-start-guide/',
    },
    header: {
        openbanking: 'https://developer.mastercard.com',
        github: 'https://github.com/Mastercard/open-banking-reference-application-australia/',
    },
    modal: {
        product:
            'https://developer.mastercard.com/open-banking-au/documentation/',
        github: 'https://github.com/Mastercard/open-banking-reference-application',
    },
};

export const TEXTS: any = {
    accountInfo: {
        accountList: 'You have successfully connected',
        moneyTransferDetails: 'Money Transfer Details',
        moneyTransferDetailsDescription:
            'Returns the account number and money transfer details that can be used for, e.g., payment use case.',
        availableBalance:
            'Retrieves the latest cached available & cleared account balances for a customer. Since we update and store balances throughout the day, this is the most accurate balance information available when a connection to a Financial Institution is unavailable or when a faster response is needed. Only Transaction & Savings and Term Deposit account types are supported.',
    },
    alertBox: {
        invalidConfiguration: 'Invalid Configuration',
        invalidKeys:
            'Looks like you have configured incorrect Partner ID, Partner Secret, or App key.',
    },
    cards: {
        apiProducts:
            'Check out the full product catalog of Mastercard Open Banking Services APIs',
        quickStart:
            'Learn about key concepts and find out how to quickly connect to our service',
    },
    createCustomerForm: {
        description: 'Enter a unique identifier for the customer',
    },
    modal: {
        description:
            "Easily connect your customer's financial data to your product.",
        more: ' Learn more about the product',
    },
    sandbox: {
        tip: ' Please select Finbank Aus OAuth and use the following username and password.',
        usernameField: 'User ID',
        usernameValue: 'profile_4100',
        passwordField: 'Banking Password',
        passwordValue: 'profile_4100',
    },
};

/* Stepper: All the steps and the respective text content are added here. */
export const STEPS = [
    {
        label: 'Add your first customer',
        description: (
            <div>
                Start with creating a "testing" customer whose financial data
                will be requested. To learn more,
                <span>
                    {' '}
                    see{' '}
                    <a
                        rel='noreferrer'
                        href='https://developer.mastercard.com/open-banking-au/documentation/access-and-config/customers'
                        target='_blank'
                    >
                        <b>Customers.</b>
                    </a>
                </span>
            </div>
        ),
        panel: 'panel0',
        documentationLink:
            'https://developer.mastercard.com/open-banking-au/documentation/quick-start-guide/#2-welcome-your-first-test-customer',
    },
    {
        label: 'Obtain access to the customer’s accounts',
        description: (
            <React.Fragment>
                <div>
                    Having created a customer, the next step is to obtain
                    consent to access their financial data. For this, generate a
                    Connect URL to launch the Connect application.
                </div>
                <br />
                <div>
                    The Connect application allows customers to select accounts
                    they want to share and give you consent to access them. As
                    soon as consent it given, Mastercard Open Banking Service
                    generates a consent receipt ID required for further API
                    calls. To learn more,
                    <span>
                        {' '}
                        see{' '}
                        <a
                            rel='noreferrer'
                            href='https://developer.mastercard.com/open-banking-au/documentation/connect/integrating-with-connect/'
                            target='_blank'
                        >
                            <b>Connect Application</b> and
                        </a>
                    </span>
                    <Tooltip title='Consent is when a customer voluntarily gives permission to the data recipient to access and use the customer’s financial data for a limited period of time defined by the consent.'>
                        <span>
                            {' '}
                            <a
                                rel='noreferrer'
                                href='https://developer.mastercard.com/open-banking-au/documentation/consent/'
                                target='_blank'
                            >
                                <b>Consent</b>
                            </a>{' '}
                            documentation.
                        </span>
                    </Tooltip>
                </div>
            </React.Fragment>
        ),
        panel: 'panel1',
        documentationLink:
            'https://developer.mastercard.com/open-banking-au/documentation/connect/',
    },
    {
        label: 'Pull account information',
        description: (
            <div>
                <div className='mt-2'>
                    Having obtained consent receipt ID, now you can retrive some
                    of the latest data from the shared accounts. For that, call
                    the
                    <span>
                        {' '}
                        <a
                            rel='noreferrer'
                            href='https://developer.mastercard.com/open-banking-au/documentation/api-reference/?view=api#RefreshCustomerAccountsByInstitutionLogin'
                            target='_blank'
                        >
                            <b>Refresh Customer Accounts</b>
                        </a>
                    </span>{' '}
                    endpoint.
                </div>
            </div>
        ),
        panel: 'panel2',
        documentationLink:
            'https://developer.mastercard.com/open-banking-au/documentation/api-reference/#GetCustomerAccounts',
    },
];

/* Accordion: The title is configured here, the content will be added at the run time */
export const ACCORDIANS = [
    {
        id: 'panel0',
        title: 'CREATE CUSTOMER',
        content: '',
        nextId: 'panel1',
    },
    {
        id: 'panel1',
        title: 'CONNECT BANK ACCOUNT',
        content: '',
        nextId: 'panel2',
    },
    {
        id: 'panel2',
        title: 'ACCOUNT INFORMATION',
        content: '',
        nextId: 'panel3',
    },
];

export const PANELS = ['panel0', 'panel1', 'panel2'];
