import { APP_KEY } from '../config';

/**
 * Get request headers for fetch call
 * @param method method type
 * @param requestData application parameters
 * @param accept accept type
 * @returns request headers
 */
export const generateFetchHeaders = (
    method: string,
    requestData: any = {},
    accept = 'application/json'
) => {
    const myHeaders = new Headers();
    myHeaders.append('App-Key', APP_KEY);
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Accept', accept);
    if (requestData?.token) {
        myHeaders.append('App-Token', requestData.token);
    }

    if (requestData?.consentReceiptId) {
        myHeaders.append('Consent-Receipt-Id', requestData.consentReceiptId);
    }

    return {
        method: method,
        headers: myHeaders,
        mode: 'cors' as RequestMode,
    };
};

/**
 * Handle fetch call
 * @param url fetch call URL
 * @param requestData application parameters
 * @param requestHeaders request headers
 * @param account account
 * @returns fetch response
 */
export const handleFetchCall = async (
    url: any,
    requestData: any,
    requestHeaders: any,
    account?: any
) => {
    const { institutionLoginId, customerId, startDate, endDate } = requestData;
    const api = url
        .replace('<institutionLoginId>', institutionLoginId)
        .replace('<customerId>', customerId)
        .replace('<accountId>', account?.id)
        .replace('<startDate>', startDate)
        .replace('<endDate>', endDate);
    return handleFetchResponse(await fetch(api, { ...requestHeaders }));
};

/**
 * Fetch response handler
 * @param response fetch response
 * @returns processed fetch response
 */
export const handleFetchResponse = async (response: any) => {
    if (response.status !== 200 && response.status !== 201) {
        if (response.status === 401) {
            const responseText = await response.text();
            throw new Error(responseText);
        } else if (response.status === 403) {
            throw new Error(
                'Applications accessing the Open Banking APIs must be hosted within the Australia.'
            );
        } else {
            const { message } = await response.json();
            throw new Error(message);
        }
    }
    return response.json();
};
