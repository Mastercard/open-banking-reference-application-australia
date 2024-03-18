import { URL } from '../config/config';
import { generateFetchHeaders } from './request-headers';

/**
 * Subscribes for cosent notification
 * @param token App token for request authorization
 * @returns webHookEndpoint
 */
export const subscribeForConsentNotification = async (
    token = ''
): Promise<string> => {
    const activeSubscription = await getActiveSubsriptions(token);
    if (activeSubscription) {
        return getSubscriptionUuid(activeSubscription);
    }
    const webHookEndpoint = await createWebhookEndPoint();
    if (webHookEndpoint) {
        await subscribeForConsent(token, webHookEndpoint);
        return webHookEndpoint;
    } else {
        throw new Error('Failed to create webhook endpoint');
    }
};

/**
 * Retrieves consent receipt Id
 * @param subscriptionUuid Unique Uuid for active subscription
 * @param customerId Current customer Id
 * @returns consent receipt Id
 */
export const retrieveConsent = async (
    subscriptionUuid: string,
    customerId: string
): Promise<any> => {
    try {
        const headers = new Headers();
        headers.append('Accept', 'application/json');
        const response = await fetch(
            URL.retrieveConsent.replace('<subscriptionUuid>', subscriptionUuid),
            { headers, method: 'GET' }
        );
        const result = await response.json();
        if (result?.data) {
            const record = result.data.find(
                (request: any) =>
                    JSON.parse(request?.content) !== '{}' &&
                    JSON.parse(request?.content).customerId === customerId
            );
            return JSON.parse(record?.content)?.payload?.consent
                ?.consentReceiptId;
        }
    } catch (error) {
        throw new Error('Failed to retrieve consent receipt id');
    }
};

/**
 * Get active subscription
 * @param token App token for request authorization
 * @returns active subscription
 */
const getActiveSubsriptions = async (token: string): Promise<string> => {
    try {
        const requestHeaders = generateFetchHeaders('GET', token, 'WEBHOOK');
        const result = await fetch(URL.getSubscriptions, { ...requestHeaders });
        const subscriptions = (await result.json())?.subscriptions;
        let activeSubscription;
        if (subscriptions?.length > 0) {
            activeSubscription = subscriptions.find(
                (subscription: any) => subscription.status === 'ACTIVE'
            );
        }
        return activeSubscription;
    } catch (error) {
        throw new Error('Failed to get active Subscriptions');
    }
};

/**
 * Get subscription uuid
 * @param subscription active subscription url
 * @returns subscription uuid
 */
const getSubscriptionUuid = (subscription: any): string => {
    try {
        return subscription?.url?.split('/')?.reverse()?.[0];
    } catch (error) {
        throw new Error('Failed to get Subscription Uuid');
    }
};

/**
 * Create new webhook endpoint for subscription
 * @returns subscription uuid
 */
const createWebhookEndPoint = async (): Promise<string> => {
    try {
        const headers = new Headers();
        headers.append('Accept', 'application/json');
        const response = await fetch(URL.createWebhookEndPoint, {
            headers,
            method: 'POST',
        });
        const result = await response.json();
        return result?.uuid;
    } catch (error) {
        throw new Error('Failed to create webhook endpoint');
    }
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
    try {
        const requestHeaders = generateFetchHeaders('POST', token, 'WEBHOOK');
        const body = JSON.stringify({
            url: `https://webhook.site/${webHookEndpoint}`,
            notificationType: 'CONSENT',
        });
        await fetch(URL.getSubscriptions, { ...requestHeaders, body });
    } catch (error) {
        throw new Error('Failed to subscribe for consent notification');
    }
};
