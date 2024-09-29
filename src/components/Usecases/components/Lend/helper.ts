import data from './data';

import { generateFetchHeaders } from '../../../../utils/helper';
import { Dispatch } from 'redux';
import { reportProgressActions } from '../../../../store/slices/report-progress';

/**
 * Submit report for generation
 * @param reportData report data
 * @param requestData application parameters
 * @param dispatch redux action dispatcher
 * @returns
 */
export const submitReport = async (
    reportData: any,
    requestData: any,
    dispatch: Dispatch
) => {
    dispatch(reportProgressActions.increaseByvalue(5));
    if (!checkForSupportedAccounts(reportData, requestData)) {
        const accountError = new Error(data.text.accountError);
        accountError.cause = 'warning';
        throw accountError;
    }
    const reportId = await generateReport(reportData, requestData);
    dispatch(reportProgressActions.increaseByvalue(10));
    if (await reportGenerated(reportId, requestData, dispatch)) {
        dispatch(reportProgressActions.absoluteValue(90));
        return getReport(reportId, requestData);
    }
};

const checkForSupportedAccounts = (reportData: any, requestData: any) => {
    const accountTypesVoa = requestData.accountData
        .filter((acc: any) =>
            ['transactionAndSavings', 'cd'].includes(acc.type)
        )
        .map((acc: any) => acc.type);
    const accountTypesVoi = requestData.accountData
        .filter((acc: any) => ['transactionAndSavings'].includes(acc.type))
        .map((acc: any) => acc.type);
    if (
        (reportData.identifier === 'voa' && accountTypesVoa.length > 0) ||
        (reportData.identifier === 'voi' && accountTypesVoi.length > 0) ||
        reportData.identifier === 'cfr'
    ) {
        return true;
    } else {
        return false;
    }
};

/**
 * Generate report
 * @param reportData any
 * @param requestData application parameters
 * @returns generate report response
 */
const generateReport = async (reportData: any, requestData: any) => {
    const requestHeaders = await generateFetchHeaders('POST', requestData);
    const requestOptions = { ...requestHeaders, body: reportData.body };
    const result = await fetch(
        reportData.api.replace('<customerId>', requestData.customerId),
        requestOptions
    );
    const reportResult = await result.json();
    return reportResult?.id || reportResult?.reportId;
};

/**
 * Delay
 * @param ms delay time in milliseconds
 * @returns Promise with setTimeout
 */
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Check if report generated or not
 * @param reportId submitted report id
 * @param requestData  application parameters
 * @param dispatch redux action dispatcher
 * @returns report generated or not
 */
const reportGenerated = async (
    reportId: string,
    requestData: any,
    dispatch: Dispatch
) => {
    let retry = 10;
    let reportsPending = await checkReportStatus(
        reportId,
        requestData,
        dispatch
    );
    if (!reportsPending) {
        return true;
    }
    while (retry > 0) {
        retry--;
        await delay(2000);
        reportsPending = await checkReportStatus(
            reportId,
            requestData,
            dispatch
        );
        if (!reportsPending) {
            break;
        }
    }
    return retry > 0;
};

/**
 * Check report status
 * @param reportId submitted report id
 * @param requestData  application parameters
 * @param dispatch redux action dispatcher
 * @returns report generated or not
 */
const checkReportStatus = async (
    reportId: string,
    requestData: any,
    dispatch: Dispatch
) => {
    const requestHeaders = await generateFetchHeaders('GET', requestData);
    const result = await fetch(
        data.url.getReportStatus.replace(
            '<customerId>',
            String(requestData.customerId)
        ),
        { ...requestHeaders }
    );
    const reportsStatusResult = await result.json();
    const pendingReports = reportsStatusResult?.reports
        .filter((report: any) => report?.id === reportId)
        .filter((report: any) => report?.status != 'success');
    dispatch(reportProgressActions.increaseByvalue(5));
    return pendingReports.length > 0;
};

/**
 * Get report
 * @param reportId submitted report id
 * @param requestData application parameters
 * @returns get report (json and pdf)
 */
const getReport = async (reportId: string, requestData: any) => {
    const requestHeadersPDF = await generateFetchHeaders(
        'GET',
        requestData,
        'application/pdf'
    );
    const requestHeadersJSON = await generateFetchHeaders('GET', requestData);

    const getReports = [
        fetch(
            data.url.getReport
                .replace('<customerId>', String(requestData.customerId))
                .replace('<reportId>', reportId),
            { ...requestHeadersPDF }
        ),
        fetch(
            data.url.getReport
                .replace('<customerId>', String(requestData.customerId))
                .replace('<reportId>', reportId),
            { ...requestHeadersJSON }
        ),
    ];

    const reports = await Promise.all(getReports);
    const blob = await reports[0].blob();
    const jsonReport = await reports[1].json();
    return { pdf: blob, json: jsonReport };
};

/**
 * Download report
 * @param report generated report
 * @param filename filename
 * @param isPdf is PDF or not
 */
export const downloadReport = (report: any, filename: string, isPdf = true) => {
    const fileURL = isPdf
        ? window.URL.createObjectURL(report)
        : `data:text/json;charset=utf-8,${encodeURIComponent(
              JSON.stringify(report, null, 2)
          )}`;
    const alink = document.createElement('a');
    alink.href = fileURL;
    alink.download = `${filename}.${isPdf ? 'pdf' : 'json'}`;
    alink.click();
};
