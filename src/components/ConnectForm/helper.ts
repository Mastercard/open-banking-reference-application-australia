import { generateFetchHeaders, handleFetchResponse } from '../../utils/helper';

import data from './data';

/**
 * Generate app token
 * @param requestData application parameters
 * @returns token (string)
 */
export const generateAppToken = async (requestData: any) => {
    const requestHeaders = generateFetchHeaders('POST', requestData);
    const body = JSON.stringify({
        partnerId: requestData.partnerId,
        partnerSecret: requestData?.partnerSecret,
    });
    const requestOptions = {
        ...requestHeaders,
        body,
    };
    const { token } = await handleFetchResponse(
        await fetch(data.url.generateAppToken, requestOptions)
    );
    return token;
};

/**
 * Create a new active customer
 * @param userName unique username for customer
 * @param requestData application parameters
 * @returns activate customer response
 */
export const activateCustomer = async (userName: string, requestData: any) => {
    const requestHeaders = generateFetchHeaders('POST', requestData);
    let body = JSON.parse(data.body.activateCustomer);
    body = JSON.stringify({ ...body, username: userName });
    const requestOptions = {
        ...requestHeaders,
        body,
    };
    return handleFetchResponse(
        await fetch(data.url.activateCustomer, requestOptions)
    );
};

/**
 * Generate connect url
 * @param requestData application parameters
 * @returns connect url
 */
export const generateConnectUrl = async (requestData: any) => {
    const requestHeaders = generateFetchHeaders('POST', requestData);
    const body = JSON.stringify({
        partnerId: requestData.partnerId,
        customerId: requestData?.customerId,
    });
    const requestOptions = {
        ...requestHeaders,
        body,
    };
    const { link } = await handleFetchResponse(
        await fetch(data.url.generateConnectUrl, requestOptions)
    );
    return link;
};

/**
 * Create consumer for existing customer
 * @param requestData application parameters
 * @returns create consumer response
 */
export const createConsumer = async (requestData: any) => {
    const requestHeaders = generateFetchHeaders('POST', requestData);
    const requestOptions = {
        ...requestHeaders,
        body: data.body.createConsumer,
    };
    const result = await fetch(
        data.url.createConsumer.replace(
            '<customerId>',
            String(requestData.customerId)
        ),
        requestOptions
    );
    return result.json();
};

/**
 * Refresh active accounts using institutionLoginId
 * @param requestData application parameters
 * @returns refresh accounts response
 */
export const refreshAccounts = async (requestData: any) => {
    const requestHeaders = generateFetchHeaders('POST', requestData);
    const result = await fetch(
        data.url.refreshAccounts
            .replace('<customerId>', String(requestData.customerId))
            .replace(
                '<institutionLoginId>',
                String(requestData.institutionLoginId)
            ),
        { ...requestHeaders }
    );
    return result.json();
};
