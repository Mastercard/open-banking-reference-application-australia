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

/* Stepper: All the steps and the respective text content are added here. */
export const STEPS = [
    {
        label: 'Create your first customer',
        description: (
            <div>
                Here, we start with creating a "testing" customer record. We
                will use this customer later with FinBank test profiles.
            </div>
        ),
        panel: 'panel0',
        documentationLink:
            'https://developer.mastercard.com/open-banking-au/documentation/quick-start-guide/#2-welcome-your-first-test-customer',
    },
    {
        label: 'Attach a bank account to customer',
        description: (
            <React.Fragment>
                <div>
                    Now that you have created a customer, the next step is to
                    generate a Connect URL. That is needed to start a Connect
                    session and grant Mastercard Open Banking access to their
                    accounts and financial data.
                </div>
                <br />
                <div>
                    The Connect application allows customers to connect to their
                    financial institutions and give consent to their savings and
                    other accounts that they consent to share. This allows third
                    parties to access financial data from the consumer’s
                    consented accounts.
                    <Tooltip title='Consent is when a customer voluntarily gives permission to the data recipient to access and use the customer’s financial data for a limited period of time defined by the consent.'>
                        <span>
                            {' '}
                            See{' '}
                            <a
                                rel='noreferrer'
                                href='https://developer.mastercard.com/open-banking-au/documentation/consent/'
                                target='_blank'
                            >
                                <b>Consent</b></a>.
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
                    We are now interested in retrieving some of the most recent
                    information about the accounts. For that, we call the{' '}
                    <b className='text-[14px]'>Refresh Customer Accounts </b>{' '}
                    endpoint followed by{' '}
                    <b className='text-[14px]'>Get Customer Accounts </b>{' '}
                    endpoint.
                </div>
                <br />
                <div>
                    Access to any customer account data requires the Consent
                    Receipt Id the customer has given when linking these
                    accounts (obtained from previous steps).
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
export const ACHTEXT =
    'Return the account number and bank routing number details based on market.';
export const AVAILBTEXT = `Retrieve the latest cached available & cleared account balances for a customer. Since we update & store balances throughout the day,
this is the most accurate balance information available when a connection to a financial institution is unavailable or when a faster response is needed. Only deposit account types are supported: Checking, Savings, Money Market, and CD.`;
