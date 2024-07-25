import { generateFetchHeaders, handleFetchCall } from '../../utils/helper';

/**
 * Process product API request
 * @param product product details
 * @param requestData application parameters
 * @returns product API response
 */
export const proccessSendRequest = async (product: any, requestData: any) => {
    const requestHeaders = generateFetchHeaders('GET', requestData);
    switch (product.identifier.toLowerCase()) {
        case 'accounts':
            return getAccountsInformation(product, requestData, requestHeaders);
        case 'transactions':
            return getTransactions(product, requestData, requestHeaders);
        case 'money_transfer_details':
            return getMoneyTransferDetails(
                product,
                requestData,
                requestHeaders
            );
        case 'available_balance':
            return getAvailableBalanceLive(
                product,
                requestData,
                requestHeaders
            );
        case 'account_owner_details':
            return getAccountOwners(product, requestData, requestHeaders);
        default:
            throw new Error('Invalid product');
    }
};

/**
 * Get accounts information
 * @param product product details
 * @param requestData application parameters
 * @param requestHeaders requestHeaders
 * @returns get account information response
 */
const getAccountsInformation = async (
    product: any,
    requestData: any,
    requestHeaders: any
): Promise<any> => {
    const response = await handleFetchCall(
        product.api,
        requestData,
        requestHeaders
    );
    const tableData = getTableData(response.accounts, product.columns);
    return { tableData, response };
};

/**
 * Get account transactions
 * @param product product details
 * @param requestData application parameters
 * @param requestHeaders requestHeaders
 * @returns get transaction response
 */
const getTransactions = async (
    product: any,
    requestData: any,
    requestHeaders: any
): Promise<any> => {
    const tableDataArray: any = [];
    const todayDate = new Date();
    const endDate = Math.floor(todayDate.getTime() / 1000);
    todayDate.setMonth(todayDate.getMonth() - 1);
    const startDate = Math.floor(todayDate.getTime() / 1000);
    requestData.startDate = startDate;
    requestData.endDate = endDate;
    const response = await handleFetchCall(
        product.api,
        requestData,
        requestHeaders,
        requestData.currentAccount
    );
    if (response.transactions.length > 0) {
        for (const trxn of response.transactions) {
            const date = new Date(trxn.postedDate * 1000).toLocaleDateString(
                'en-au',
                { day: '2-digit', month: 'long', year: 'numeric' }
            );
            tableDataArray.push({
                date: date,
                description: trxn.description,
                amount: trxn.amount,
                currency: trxn.currencySymbol,
            });
        }
        requestData.accountData.map((account: any) => {
            if (account.id === requestData.currentAccount.id) {
                account['transactions'] = tableDataArray;
                account['transactionsJson'] = response;
            }
        });
    }

    return { tableData: tableDataArray, response: response };
};

/**
 * Get money transfer details
 * @param product product details
 * @param requestData application parameters
 * @param requestHeaders requestHeaders
 * @returns money transfer details response
 */
const getMoneyTransferDetails = async (
    product: any,
    requestData: any,
    requestHeaders: any
): Promise<any> => {
    const accounts = requestData.accountData;
    const tableDataArray = [];
    const jsonArray = [];
    for (const account of accounts) {
        if (account.type === 'transactionAndSavings') {
            const response = await handleFetchCall(
                product.api,
                requestData,
                requestHeaders,
                account
            );
            const paymentInstruction = {
                id: account.id,
                accountNumber: response?.paymentInstruction[0].accountNumber,
                bsbNumber: response?.paymentInstruction[0].descriptors[0].value,
            };
            tableDataArray.push(paymentInstruction);
            jsonArray.push(response);
        }
    }

    if (jsonArray.length === 0) {
        const accountTypeError = new Error();
        accountTypeError.message =
            'None of the Added accounts are supported for money transfer detail product';
        accountTypeError.cause = 'warning';
        throw accountTypeError;
    }

    return { tableData: tableDataArray, response: jsonArray };
};

/**
 * Get live available response
 * @param product product details
 * @param requestData application parameters
 * @param requestHeaders requestHeaders
 * @returns get available balance live response
 */
const getAvailableBalanceLive = async (
    product: any,
    requestData: any,
    requestHeaders: any
): Promise<any> => {
    const accounts = requestData.accountData;
    const tableDataArray = [];
    const jsonArray = [];
    for (const account of accounts) {
        if (account.type === 'transactionAndSavings' || account.type === 'cd') {
            const response = await handleFetchCall(
                product.api,
                requestData,
                requestHeaders,
                account
            );
            const paymentInstruction = {
                id: account.id,
                accountNumber: response.realAccountNumberLast4,
                availableBalance: response.availableBalance,
                currency: account.currency,
            };
            tableDataArray.push(paymentInstruction);
            jsonArray.push(response);
        }
    }

    if (jsonArray.length === 0) {
        const accountTypeError = new Error();
        accountTypeError.message =
            'None of the  Added accounts are supported for available balance live product';
        accountTypeError.cause = 'warning';
        throw accountTypeError;
    }
    return { tableData: tableDataArray, response: jsonArray }; //3 rows
};

/**
 * Get account owners
 * @param product product details
 * @param requestData application parameters
 * @param requestHeaders requestHeaders
 * @returns account owners response
 */
const getAccountOwners = async (
    product: any,
    requestData: any,
    requestHeaders: any
): Promise<any> => {
    const accounts = requestData.accountData;
    const tableDataArray = [];
    const jsonArray = [];
    for (const account of accounts) {
        const response = await handleFetchCall(
            product.api,
            requestData,
            requestHeaders,
            account
        );
        const holderDetails = response?.holders[0];
        const paymentInstruction = {
            id: account.id,
            name: holderDetails.ownerName,
            address: holderDetails?.addresses[0].ownerAddress,
        };
        tableDataArray.push(paymentInstruction);
        jsonArray.push(response);
    }
    return { tableData: tableDataArray, response: jsonArray };
};

/**
 * Process data to display on table
 * @param jsonData json response
 * @param columns table columns
 * @returns table response
 */
const getTableData = (jsonData: any, columns: any) => {
    return jsonData.map((data: any) => {
        const candidate: any = {};
        columns.forEach((column: any) => {
            candidate[column.accessorKey] = data[column.accessorKey];
        });
        return candidate;
    });
};
