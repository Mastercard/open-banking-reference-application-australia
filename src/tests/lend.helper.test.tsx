import { submitReport } from '../components/Usecases/components/Lend/helper';
import data from '../components/Usecases/components/Lend/data';
import requestData from './Mocks/request-data';

describe('Testing lend helper', () => {
    describe('Testing submit report', () => {
        test('should submit report with not supported account types for VOA', async () => {
            try {
                let newRequestData = requestData;
                newRequestData.accountData = [];
                await submitReport(data.reports[0], newRequestData, jest.fn());
            } catch (error: any) {
                expect(error.message).toEqual(
                    'None of the shared accounts are supported for selected report type.'
                );
            }
        });

        test('should submit report with not supported account types for VOI', async () => {
            try {
                let newRequestData = { ...requestData, accountData: [] };
                await submitReport(data.reports[1], newRequestData, jest.fn());
            } catch (error: any) {
                expect(error.message).toEqual(
                    'None of the shared accounts are supported for selected report type.'
                );
            }
        });

        test('should wait for report generation', async () => {
            try {
                window.fetch = jest
                    .fn()
                    .mockResolvedValue({
                        json: () => {
                            return {
                                reportId: '1234567890',
                                reports: [
                                    {
                                        id: '1234567890',
                                        status: 'success',
                                    },
                                ],
                            };
                        },
                    })
                    .mockRejectedValueOnce({
                        json: () => {
                            return {
                                reportId: '1234567890',
                                reports: [
                                    {
                                        id: '1234567890',
                                        status: 'inProgress',
                                    },
                                ],
                            };
                        },
                    });
                await submitReport(data.reports[2], requestData, jest.fn());
            } catch (error) {
                console.log('------error---------', error);
            }
        });
    });
});
