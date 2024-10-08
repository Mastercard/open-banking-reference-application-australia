import { Fragment } from 'react';
import { Tooltip } from '@mui/material';
export const Steps = [
    {
        label: 'Add your first customer',
        description: (
            <div>
                Start with creating a "testing" customer whose financial data
                will be requested. To learn more,{' '}
                <span>
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
            <Fragment>
                <div>
                    Having created a customer, the next step is to obtain
                    consent to access their financial data. For this, generate a
                    Connect URL to launch the Connect application.
                </div>
                <br />
                <div>
                    The Connect application allows customers to select accounts
                    they want to share and give you consent to access them. As
                    soon as consent is given, Mastercard Open Banking Service
                    generates a consent receipt ID required for further API
                    calls. To learn more,{' '}
                    <span>
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
            </Fragment>
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
                    Having obtained consent receipt ID, now you can retrieve
                    some of the latest data from the shared accounts. For that,
                    call the{' '}
                    <span>
                        <a
                            rel='noreferrer'
                            href='https://developer.mastercard.com/open-banking-au/documentation/api-reference/#GetCustomerAccounts'
                            target='_blank'
                        >
                            <b> Get Customer Accounts</b>
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
    {
        label: 'Use cases',
        description: (
            <div className='mt-2'>
                This section provides you with an overview of the different
                solutions offered by Mastercard Open Banking. Find out about the
                APIs that power these solutions and help our partners succeed.
            </div>
        ),
        panel: 'panel3',
        documentationLink:
            'https://developer.mastercard.com/open-banking-au/documentation/usecases/',
    },
];

export default Steps;
