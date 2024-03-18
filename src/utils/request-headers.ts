import { APP_KEY, REQUEST_BODY, HeadersType } from '../config/config';

export const generateFetchHeaders = (
    method: string,
    token = '',
    headerType: HeadersType = 'AGGREGATION'
) => {
    const myHeaders = new Headers();
    myHeaders.append(
        headerType === 'WEBHOOK' ? 'App-Key' : 'Finicity-App-Key',
        APP_KEY
    );
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Accept', 'application/json');
    if (token) {
        myHeaders.append(
            headerType === 'WEBHOOK' ? 'App-Token' : 'Finicity-App-Token',
            token
        );
    }
    return {
        method: method,
        headers: myHeaders,
        mode: 'cors' as RequestMode,
    };
};

export const getFetchBody = (step: any) => {
    return REQUEST_BODY[step as keyof typeof REQUEST_BODY];
};
