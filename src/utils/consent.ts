import { Dispatch } from '@reduxjs/toolkit';

import { url } from '../config';
import { snackbarActions } from '../store/slices/snackbar';

import { generateFetchHeaders } from './helper';

/**
 * Subscribes for cosent notification
 * @param dispatch Dispatch event for redux store
 * @param token App token for request authorization
 * @returns webHookEndpoint
 */
export const subscribeForConsentNotification = async (
    dispatch: Dispatch,
    token: string
): Promise<string> => {
    try {
        const activeSubscription = await getActiveSubscriptions(
            token,
            dispatch
        );
        if (activeSubscription) {
            const subscriptionUuid = getSubscriptionUuid(activeSubscription);
            return getValidSubscriptionUuid(
                activeSubscription,
                subscriptionUuid,
                dispatch,
                token
            );
        }
        dispatch(
            snackbarActions.open({
                message: 'Subscribing for consent notification',
                severity: 'info',
                timeout: 2000,
            })
        );
        const webHookEndpoint = await createWebhookEndPoint();
        if (webHookEndpoint) {
            await subscribeForConsent(token, webHookEndpoint);
            return webHookEndpoint;
        } else {
            throw new Error('Failed to create webhook endpoint');
        }
    } catch (error: any) {
        if (error.cause === 'source') {
            throw error;
        }
        throw new Error('Failed to subscribe for consent notification');
    }
};

/**
 *
 * @param subscription subscription for consent notification
 * @param subscriptionUuid Unique Uuid for active subscription
 * @param dispatch Dispatch event for redux store
 * @param token App token for request authorization
 * @returns get valid subscriptionUuid
 */
const getValidSubscriptionUuid = async (
    subscription: any,
    subscriptionUuid: string,
    dispatch: Dispatch,
    token: string
): Promise<string> => {
    const result = await fetchWebhookToken(subscriptionUuid);
    if ((!result?.success && result?.error) || result.total > 99) {
        /** update subscriptionUuid as current notification webhook has expired or limit exhausted for receiving notifications*/
        dispatch(
            snackbarActions.open({
                message: 'Updating subscription',
                severity: 'info',
                timeout: 20000,
            })
        );
        return updateSubscriptionUuid(subscription.id, token);
    } else {
        return subscriptionUuid;
    }
};

/**
 * Update webhook notification Url (subscriptionUuid)
 * @param subscriptionId subscription Id
 * @param token App token for request authorization
 * @returns return updated subscriptionUuid
 */
const updateSubscriptionUuid = async (
    subscriptionId: string,
    token: string
) => {
    const webHookEndpoint = await createWebhookEndPoint();
    const requestHeaders = await generateFetchHeaders('PUT', { token });
    const body = JSON.stringify({
        url: `https://webhook.site/${webHookEndpoint}`,
    });
    await fetch(
        url.updateSubscriptionUrl.replace('<subscriptionUuid>', subscriptionId),
        { ...requestHeaders, body }
    );
    return webHookEndpoint;
};

/**
 * Retrieves consent receipt Id
 * @param subscriptionUuid Unique Uuid for active subscription
 * @param customerId Current customer Id
 * @param dispatch Dispatch event for redux store
 * @returns consent receipt Id
 */
export const retrieveConsent = async (
    subscriptionUuid: string,
    customerId: string,
    dispatch: Dispatch
): Promise<any> => {
    try {
        dispatch(
            snackbarActions.open({
                message: 'Retrieving consent',
                severity: 'info',
                timeour: 2000,
            })
        );
        const result = await fetchWebhookToken(subscriptionUuid);
        if (result?.data) {
            const record = result.data.find(
                (request: any) =>
                    JSON.parse(request?.content) !== '{}' &&
                    JSON.parse(request?.content).customerId === customerId
            );
            dispatch(
                snackbarActions.open({
                    message: 'Consent retrieved successfully',
                    severity: 'success',
                    timeour: 2000,
                })
            );
            return JSON.parse(record?.content)?.payload?.consent
                ?.consentReceiptId;
        }
    } catch (error) {
        throw new Error('Failed to retrieve consent receipt id');
    }
};

/**
 *
 * @param subscriptionUuid Unique Uuid for active subscription
 * @returns fetch Webhook token
 */
const fetchWebhookToken = async (subscriptionUuid: string): Promise<any> => {
    const headers = new Headers();
    headers.append('Accept', 'application/json');
    const response = await fetch(
        url.retrieveConsent.replace('<subscriptionUuid>', subscriptionUuid),
        { headers, method: 'GET' }
    );
    return response.json();
};

/**
 * Get active subscription
 * @param token App token for request authorization
 * @param dispatch Dispatch event for redux store
 * @returns active subscription
 */
const getActiveSubscriptions = async (
    token: string,
    dispatch: Dispatch
): Promise<string> => {
    try {
        dispatch(
            snackbarActions.open({
                message: 'Fetching active subscriptions',
                severity: 'info',
                timeout: 2000,
            })
        );
        const requestHeaders = await generateFetchHeaders('GET', { token });
        const result = await fetch(url.getSubscriptions, { ...requestHeaders });
        const subscriptions = (await result.json())?.subscriptions;
        let activeSubscription;
        if (subscriptions?.length > 0) {
            activeSubscription = subscriptions.find(
                (subscription: any) => subscription.status === 'ACTIVE'
            );
        }
        return activeSubscription;
    } catch (error) {
        throw new Error('Failed to get active Subscriptions', {
            cause: 'source',
        });
    }
};

/**
 * Get subscription uuid
 * @param subscription active subscription url
 * @returns subscription uuid
 */
const getSubscriptionUuid = (subscription: any): string => {
    return subscription?.url?.split('/')?.reverse()?.[0];
};

/**
 * Create new webhook endpoint for subscription
 * @returns subscription uuid
 */
const createWebhookEndPoint = async (): Promise<string> => {
    const headers = new Headers();
    headers.append('Accept', 'application/json');
    const response = await fetch(url.createWebhookEndPoint, {
        headers,
        method: 'POST',
    });
    const result = await response.json();
    return result?.uuid;
};

/**
 * Subscribe for consent notification
 * @param token App token for request authorization
 * @param webHookEndpoint webhook endpoint used for creating subscription
 */
const subscribeForConsent = async (
    token: string,
    webHookEndpoint: string
): Promise<void> => {
    const requestHeaders = await generateFetchHeaders('POST', { token });
    const body = JSON.stringify({
        url: `https://webhook.site/${webHookEndpoint}`,
        notificationType: 'CONSENT',
    });
    await fetch(url.getSubscriptions, { ...requestHeaders, body });
};
