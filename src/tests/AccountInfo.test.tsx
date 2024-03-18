import { render, screen } from '@testing-library/react';
import AccountInfo from '../components/AccountInfo/AccountInfo';
const accountData: any = [
    {
        id: '13266915',
        number: 'xxxx-xxxx-xxxx-0001',
        accountNumberDisplay: 'xxxx-xxxx-xxxx-0001',
        name: 'Transaction',
        balance: 22327.3,
        type: 'transactionAndSavings',
        status: 'active',
        customerId: '2098045',
        institutionId: '200003',
        balanceDate: 1709196870,
        createdDate: 1709196870,
        lastUpdatedDate: 1709236472,
        currency: 'AUD',
        institutionLoginId: 1967693,
        accountNickname: 'Transaction',
        marketSegment: 'personal',
        achData: {
            paymentInstruction: [
                {
                    type: 'moneyTransfer',
                    accountNumber: '410001',
                    descriptors: [
                        {
                            type: 'bsbNumber',
                            value: '033-547',
                        },
                    ],
                },
            ],
        },
    },
    {
        id: '13266916',
        number: 'xxxx-xxxx-xxxx-0002',
        accountNumberDisplay: 'xxxx-xxxx-xxxx-0002',
        name: 'savings',
        balance: 786000.0,
        type: 'transactionAndSavings',
        status: 'active',
        customerId: '2098045',
        institutionId: '200003',
        balanceDate: 1709196870,
        createdDate: 1709196870,
        lastUpdatedDate: 1709236472,
        currency: 'AUD',
        institutionLoginId: 1967693,
        accountNickname: 'savings',
        marketSegment: 'personal',
        achData: {
            paymentInstruction: [
                {
                    type: 'moneyTransfer',
                    accountNumber: '410002',
                    descriptors: [
                        {
                            type: 'bsbNumber',
                            value: '033-547',
                        },
                    ],
                },
            ],
        },
    },
    {
        id: '13266917',
        number: 'xxxx-xxxx-xxxx-0003',
        accountNumberDisplay: 'xxxx-xxxx-xxxx-0003',
        name: 'creditCard',
        balance: -1952.71,
        type: 'creditCard',
        status: 'active',
        customerId: '2098045',
        institutionId: '200003',
        balanceDate: 1709196870,
        createdDate: 1709196870,
        lastUpdatedDate: 1709236472,
        currency: 'AUD',
        institutionLoginId: 1967693,
        accountNickname: 'creditCard',
        marketSegment: 'personal',
    },
    {
        id: '13266918',
        number: 'xxxx-xxxx-xxxx-0004',
        accountNumberDisplay: 'xxxx-xxxx-xxxx-0004',
        name: 'Loan',
        balance: -600.0,
        type: 'loan',
        status: 'active',
        customerId: '2098045',
        institutionId: '200003',
        balanceDate: 1709196870,
        createdDate: 1709196870,
        lastUpdatedDate: 1709236472,
        currency: 'AUD',
        institutionLoginId: 1967693,
        accountNickname: 'Loan',
        marketSegment: 'personal',
    },
];

describe('Testing AccountInfo Component', () => {
    test('should render AccountInfo', () => {
        render(
            (<AccountInfo accountData={accountData} />) as React.ReactElement
        );
        expect(
            screen.getByText(`${accountData.length} accounts.`, {
                exact: false,
            })
        ).toBeInTheDocument();
    });

    test('Should render Available Balance section', () => {
        render(
            (<AccountInfo accountData={accountData} />) as React.ReactElement
        );
        expect(
            screen.getByText(/available balance/i, { exact: false })
        ).toBeInTheDocument();
    });

    test('Should render account information : Id', () => {
        render(
            (<AccountInfo accountData={accountData} />) as React.ReactElement
        );
        expect(screen.getByText(/id/i, { exact: false })).toBeInTheDocument();
    });

    test('Should render account information : Id value', () => {
        render(
            (<AccountInfo accountData={accountData} />) as React.ReactElement
        );
        const accountIdElement = screen.getByTestId('account-id');
        expect(
            accountIdElement.textContent
                ?.replace(/\\/g, '')
                .replace(/"/g, '')
                ?.replace(/\\/g, '')
                .replace(/"/g, '')
        ).toEqual(`${accountData[0].id}`);
    });

    test('Should Render account information : realAccountNumberLast4', () => {
        render(
            (<AccountInfo accountData={accountData} />) as React.ReactElement
        );
        expect(
            screen.getByText(/realAccountNumberLast4/i, { exact: false })
        ).toBeInTheDocument();
    });

    test('Should Render account information :realAccountNumberLast4 value', () => {
        render(
            (<AccountInfo accountData={accountData} />) as React.ReactElement
        );
        const realAccountNumberLast4Element = screen.getByTestId(
            'real-account-number-last-4'
        );
        expect(
            realAccountNumberLast4Element.textContent
                ?.replace(/\\/g, '')
                .replace(/"/g, '')
                ?.replace(/\\/g, '')
                .replace(/"/g, '')
        ).toEqual(`${accountData[0].number?.slice(-4) ?? ''}`);
    });

    test('Should Render account information : availableBalance', () => {
        render(
            (<AccountInfo accountData={accountData} />) as React.ReactElement
        );
        expect(
            screen.getByText(/availableBalance :/i, { exact: false })
        ).toBeInTheDocument();
    });

    test('Should Render account information :availableBalance value', () => {
        render(
            (<AccountInfo accountData={accountData} />) as React.ReactElement
        );
        const availableBalanceElement = screen.getByTestId('available-balance');
        expect(
            availableBalanceElement.textContent
                ?.replace(/\\/g, '')
                .replace(/'/g, '')
        ).toEqual(`${accountData[0].balance}`);
    });

    test('Should Render account information : availableBalanceDate', () => {
        render(
            (<AccountInfo accountData={accountData} />) as React.ReactElement
        );
        expect(
            screen.getByText(/availableBalanceDate/i, { exact: false })
        ).toBeInTheDocument();
    });

    test('Should Render account information :availableBalanceDate value', () => {
        render(
            (<AccountInfo accountData={accountData} />) as React.ReactElement
        );
        const availableBalanceDateElement = screen.getByTestId(
            'available-balance-date'
        );
        expect(
            availableBalanceDateElement.textContent
                ?.replace(/\\/g, '')
                .replace(/'/g, '')
        ).toEqual(
            `${new Date(accountData[0].balanceDate * 1000).toDateString()}`
        );
    });

    test('Should Render account information : clearedBalance', () => {
        render(
            (<AccountInfo accountData={accountData} />) as React.ReactElement
        );
        expect(
            screen.getByText(/clearedBalance :/i, { exact: false })
        ).toBeInTheDocument();
    });

    test('Should Render account information :clearedBalance value', () => {
        render(
            (<AccountInfo accountData={accountData} />) as React.ReactElement
        );
        const clearedBalanceElement = screen.getByTestId('cleared-balance');
        expect(
            clearedBalanceElement.textContent
                ?.replace(/\\/g, '')
                .replace(/'/g, '')
        ).toEqual(`${accountData[0].balance}`);
    });

    test('Should Render account information : clearedBalancedate', () => {
        render(
            (<AccountInfo accountData={accountData} />) as React.ReactElement
        );
        expect(
            screen.getByText(/clearedBalancedate/i, { exact: false })
        ).toBeInTheDocument();
    });

    test('Should Render account information :clearedBalancedate value', () => {
        render(
            (<AccountInfo accountData={accountData} />) as React.ReactElement
        );
        const clearedBalancedateElement = screen.getByTestId(
            'cleared-balance-date'
        );
        expect(
            clearedBalancedateElement.textContent
                ?.replace(/\\/g, '')
                .replace(/'/g, '')
        ).toEqual(
            `${new Date(accountData[0].balanceDate * 1000).toDateString()}`
        );
    });

    test('Should Render account information : currency', () => {
        render(
            (<AccountInfo accountData={accountData} />) as React.ReactElement
        );
        expect(
            screen.getByText(/currency/i, { exact: false })
        ).toBeInTheDocument();
    });

    test('Should Render account information :currency value', () => {
        render(
            (<AccountInfo accountData={accountData} />) as React.ReactElement
        );
        const currencyElement = screen.getByTestId('currency');
        expect(
            currencyElement.textContent
                ?.replace(/\\/g, '')
                .replace(/"/g, '')
                .replace(/\\/g, '')
                .replace(/"/g, '')
        ).toEqual(`${accountData[0].currency}`);
    });

    test('Should not render money transfer detail section for non deposit account types', () => {
        render(
            (
                <AccountInfo accountData={[accountData[3]]} />
            ) as React.ReactElement
        );
        expect(accountData[3].type).not.toEqual('savings');
        expect(accountData[3].type).not.toEqual('checking');
        expect(
            screen.queryByText(/money transfer detail/i, { exact: false })
        ).not.toBeInTheDocument();
    });

    test('Should Render money transfer detail for deposit account types', () => {
        render(
            (
                <AccountInfo accountData={[accountData[1]]} />
            ) as React.ReactElement
        );
        expect(accountData[1].type).toEqual('transactionAndSavings');
        expect(accountData[1].type).not.toEqual('loan');
        expect(
            screen.getByText(/money transfer detail/i, { exact: false })
        ).toBeInTheDocument();
    });

    test('Should Render routing number in money transfer detail for deposit account types', () => {
        render(
            (
                <AccountInfo accountData={[accountData[1]]} />
            ) as React.ReactElement
        );
        expect(
            screen.getByText(/binNumber :/i, { exact: false })
        ).toBeInTheDocument();
    });

    test('Should Render routing number value in money transfer detail for deposit account types', () => {
        render(
            (
                <AccountInfo accountData={[accountData[1]]} />
            ) as React.ReactElement
        );
        const binNumber = screen.getByTestId('bin-number');
        expect(
            binNumber.textContent
                ?.replace(/\\/g, '')
                .replace(/"/g, '')
                .replace(/\\/g, '')
                .replace(/"/g, '')
        ).toEqual(
            `${accountData[1]?.achData?.paymentInstruction?.[0]?.descriptors?.[0]?.value}`
        );
    });

    test('Should Render real account number in ACH detail for deposit account types', () => {
        render(
            (
                <AccountInfo accountData={[accountData[1]]} />
            ) as React.ReactElement
        );
        expect(
            screen.getByText(/accountNumber :/i, { exact: false })
        ).toBeInTheDocument();
    });

    test('Should Render real account value in ACH detail for deposit account types', () => {
        render(
            (
                <AccountInfo accountData={[accountData[1]]} />
            ) as React.ReactElement
        );
        const accountNumber = screen.getByTestId('account-number');
        expect(
            accountNumber.textContent
                ?.replace(/\\/g, '')
                .replace(/"/g, '')
                .replace(/\\/g, '')
                .replace(/"/g, '')
        ).toEqual(
            `${accountData[1]?.achData?.paymentInstruction?.[0]?.accountNumber}`
        );
    });
});
