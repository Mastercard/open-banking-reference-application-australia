import { proccessSendRequest } from '../components/Product/helper';

import data from '../components/Product/data';
import requestData from './Mocks/request-data';

describe('Testing product helper', () => {
    test('should test proccessSendRequest - accounts', async () => {
        window.fetch = jest.fn().mockResolvedValue({
            json: () => {
                return {
                    accounts: [
                        {
                            id: '123',
                            name: 'foo',
                            type: 'savings',
                            balance: '1230',
                            currency: 'AUD',
                        },
                    ],
                };
            },
            status: 200,
        });
        const result = await proccessSendRequest(data.products[0], requestData);
        expect(result.response.accounts[0].type).toEqual('savings');
        expect(result.tableData[0].type).toEqual('savings');
    });

    test('should test proccessSendRequest - transactions', async () => {
        window.fetch = jest.fn().mockResolvedValue({
            json: () => {
                return {
                    transactions: [
                        {
                            id: '123',
                            description: 'foo',
                            postedDate: 1726228800,
                            amount: '1230',
                            currencySymbol: 'AUD',
                        },
                    ],
                };
            },
            status: 200,
        });
        const result = await proccessSendRequest(data.products[2], requestData);
        expect(result.response.transactions[0].currencySymbol).toEqual('AUD');
        expect(result.tableData[0].currency).toEqual('AUD');
    });

    test('should test proccessSendRequest - transactions (no transactions)', async () => {
        window.fetch = jest.fn().mockResolvedValue({
            json: () => {
                return {
                    transactions: [],
                };
            },
            status: 200,
        });
        const result = await proccessSendRequest(data.products[2], requestData);
        expect(result.response.transactions.length).toEqual(0);
        expect(result.tableData.length).toEqual(0);
    });

    test('should test proccessSendRequest - ACH details', async () => {
        window.fetch = jest.fn().mockResolvedValue({
            json: () => {
                return {
                    paymentInstruction: [
                        {
                            type: 'moneyTransfer',
                            accountNumber: '123456',
                            descriptors: [
                                {
                                    type: 'bsbNumber',
                                    value: '123-456',
                                },
                            ],
                        },
                    ],
                };
            },
            status: 200,
        });
        const result = await proccessSendRequest(data.products[3], requestData);
        expect(result.response[0].paymentInstruction[0].accountNumber).toEqual(
            '123456'
        );
        expect(
            result.response[0].paymentInstruction[0].descriptors[0].value
        ).toEqual('123-456');
        expect(result.tableData[0].accountNumber).toEqual('123456');
        expect(result.tableData[0].bsbNumber).toEqual('123-456');
    });

    test('should test proccessSendRequest - ACH details - no supported accounts', async () => {
        try {
            window.fetch = jest.fn().mockResolvedValue({
                json: () => {
                    return {
                        routingNumber: '123456789',
                        realAccountNumber: '1234567890',
                    };
                },
                status: 200,
            });
            await proccessSendRequest(data.products[3], {
                ...requestData,
                accountData: [],
            });
        } catch (error: any) {
            expect(error.message).toEqual(
                'None of the shared accounts are supported for Money Transfer Details product.'
            );
        }
    });

    test('should test proccessSendRequest - Available balance live', async () => {
        window.fetch = jest.fn().mockResolvedValue({
            json: () => {
                return {
                    id: 12345678890,
                    realAccountNumberLast4: '7890',
                    availableBalance: 18349.6,
                    availableBalanceDate: 1726224599,
                    clearedBalance: 22327.3,
                    clearedBalanceDate: 1726224599,
                    aggregationStatusCode: 0,
                    currency: 'AUD',
                };
            },
            status: 200,
        });
        const result = await proccessSendRequest(data.products[4], requestData);
        expect(result.response[0].availableBalance).toEqual(18349.6);
        expect(result.tableData[0].availableBalance).toEqual(18349.6);
    });

    test('should test proccessSendRequest - Available balance live  - no supported accounts', async () => {
        try {
            window.fetch = jest.fn().mockResolvedValue({
                json: () => {
                    return {
                        id: 12345678890,
                        realAccountNumberLast4: '7890',
                        availableBalance: 18349.6,
                        availableBalanceDate: 1726224599,
                        clearedBalance: 22327.3,
                        clearedBalanceDate: 1726224599,
                        aggregationStatusCode: 0,
                        currency: 'AUD',
                    };
                },
                status: 200,
            });
            await proccessSendRequest(data.products[4], {
                ...requestData,
                accountData: [],
            });
        } catch (error: any) {
            expect(error.message).toEqual(
                'None of the shared accounts are supported for Available Balance Live product.'
            );
        }
    });

    test('should test proccessSendRequest - account owners', async () => {
        window.fetch = jest.fn().mockResolvedValue({
            json: () => {
                return {
                    holders: [
                        {
                            ownerName: 'John Doe',
                            nameClassification: 'person',
                            nameClassificationconfidencescore: 1.0,
                            addresses: [
                                {
                                    ownerAddress: '21 B Bakers street',
                                },
                            ],
                        },
                    ],
                };
            },
            status: 200,
        });
        const result = await proccessSendRequest(data.products[5], requestData);
        expect(result.response[0].holders[0].ownerName).toEqual('John Doe');
        expect(result.response[0].holders[0].addresses[0].ownerAddress).toEqual(
            '21 B Bakers street'
        );
        expect(result.tableData[0].name).toEqual('John Doe');
        expect(result.tableData[0].address).toEqual('21 B Bakers street');
    });

    test('Should through error for invalid product', async () => {
        try {
            await proccessSendRequest(
                { identifier: 'aggregation' },
                requestData
            );
        } catch (error: any) {
            expect(error.message).toEqual('Invalid product');
        }
    });
});
