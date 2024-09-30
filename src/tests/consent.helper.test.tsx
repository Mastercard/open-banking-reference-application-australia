import {
    subscribeForConsentNotification,
    retrieveConsent,
} from '../utils/consent';

describe('Testing consent helper', () => {
    describe('Testing subscribeForConsentNotification', () => {
        test('should subscribe for consent notification', async () => {
            window.fetch = jest.fn().mockResolvedValue({
                json: () => {
                    return {
                        uuid: '1234567890',
                        subscriptions: [],
                    };
                },
            });
            const endPoint = await subscribeForConsentNotification(
                jest.fn(),
                'qwertyuiop'
            );
            expect(endPoint).toEqual('1234567890');
        });

        test('should failed to subscribe for consent notification', async () => {
            try {
                window.fetch = jest.fn().mockResolvedValue({
                    json: () => {
                        return {
                            subscriptions: [],
                        };
                    },
                });
                await subscribeForConsentNotification(jest.fn(), 'qwertyuiop');
            } catch (error: any) {
                expect(error.message).toEqual(
                    'Failed to subscribe for consent notification'
                );
            }
        });

        test('should get active subscription', async () => {
            window.fetch = jest.fn().mockResolvedValue({
                json: () => {
                    return {
                        uuid: '1234567890',
                        subscriptions: [
                            {
                                status: 'ACTIVE',
                                url: 'https://webhook/subscriptions/12345',
                            },
                        ],
                        success: true,
                    };
                },
            });
            const subscription = await subscribeForConsentNotification(
                jest.fn(),
                'qwertyuiop'
            );
            expect(subscription).toEqual('12345');
        });

        test('should update and get active subscription', async () => {
            window.fetch = jest.fn().mockResolvedValue({
                json: () => {
                    return {
                        uuid: '1234567890',
                        subscriptions: [
                            {
                                status: 'ACTIVE',
                                url: 'https://webhook/subscriptions/12345',
                            },
                        ],
                        success: false,
                        error: 'INACTIVE',
                    };
                },
            });
            const subscription = await subscribeForConsentNotification(
                jest.fn(),
                'qwertyuiop'
            );
            expect(subscription).toEqual('1234567890');
        });

        test('should failed to get active subscription', async () => {
            try {
                window.fetch = jest.fn().mockResolvedValue(new Error());
                await subscribeForConsentNotification(jest.fn(), 'qwertyuiop');
            } catch (error: any) {
                expect(error.message).toEqual(
                    'Failed to get active Subscriptions'
                );
            }
        });
    });

    describe('Testing retrieveConsent', () => {
        test('should retrieve consent notification', async () => {
            window.fetch = jest.fn().mockResolvedValue({
                json: () => {
                    return {
                        data: [
                            {
                                content: JSON.stringify({
                                    customerId: '1234567890',
                                    payload: {
                                        consent: {
                                            consentReceiptId: 'qwerty',
                                        },
                                    },
                                }),
                            },
                        ],
                    };
                },
            });
            const consent = await retrieveConsent(
                '12345',
                '1234567890',
                jest.fn()
            );
            expect(consent).toEqual('qwerty');
        });

        test('should not be able retrieve consent notification', async () => {
            window.fetch = jest.fn().mockResolvedValue({
                json: () => {
                    return {};
                },
            });
            const consent = await retrieveConsent(
                '12345',
                '1234567890',
                jest.fn()
            );
            expect(consent).toEqual(undefined);
        });

        test('should failed to retrieve consent notification', async () => {
            try {
                window.fetch = jest.fn().mockResolvedValue(new Error());
                await retrieveConsent('12345', '1234567890', jest.fn());
            } catch (error: any) {
                expect(error.message).toEqual(
                    'Failed to retrieve consent receipt id'
                );
            }
        });
    });
});
