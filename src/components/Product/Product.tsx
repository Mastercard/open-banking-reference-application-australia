import { Fragment, useState, useEffect } from 'react';
import {
    Grid,
    Stack,
    Chip,
    Typography,
    Button,
    ToggleButtonGroup,
    ToggleButton,
    Select,
    MenuItem,
    SelectChangeEvent,
    Divider,
    CircularProgress,
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

import {
    CurlCommand,
    DataTable,
    ExternalIcon,
    JsonViewer,
    SnackBar,
} from '../../components';

import './Product.css';
import data from './data';
import { proccessSendRequest } from './helper';

export default function Product({ product, requestData, body }: any) {
    const [currentProduct, setCurrentProduct] = useState<any>(
        data.products.find((item) => item.identifier.toLowerCase() === product)
    );
    useEffect(() => {
        setCurrentProduct(
            data.products.find(
                (item) => item.identifier.toLowerCase() === product
            )
        );
        setShowRequest(false);
    }, [product]);
    const [tableData, setTableData] = useState<any>();
    const [jsonData, setJsonData] = useState<any>();
    const [loading, setLoading] = useState<boolean>(false);
    const [showResult, setShowResult] = useState<boolean>(false);
    const [disableRequest, setDisableRequest] = useState<boolean>(false);
    const [displayDataType, setDisplayDataType] = useState<string>('table');
    const [accountDisplay, setAccountDisplay] = useState<string>(
        requestData.accountDisplayNames[0]
    );
    const [currentAccount, setCurrentAccount] = useState<any>(
        requestData.accountData[0]
    );
    const [showRequest, setShowRequest] = useState<boolean>(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarContent, setSnackbarContent] = useState<any>({
        errorMessage: 'Something went wrong',
        severity: 'error',
        position: {
            vertical: 'bottom',
            horizontal: 'center',
        },
    });

    /**
     * Report change event handler
     * @param event SelectChangeEvent
     */
    const handleReportChangeSelect = (event: SelectChangeEvent) => {
        setAccountDisplay(
            requestData.accountDisplayNames.find(
                (account: any) => event.target.value === account
            )
        );
        setCurrentAccount(
            requestData.accountData.find(
                (account: any) => event.target.value === account.displayName
            )
        );
        requestData.accountData.map((account: any) => {
            if (account.displayName === event.target.value) {
                if (account.transactions) {
                    setTableData(account.transactions);
                    setJsonData(account.transactionsJson);
                    setShowResult(true);
                } else {
                    setShowResult(false);
                }
            }
        });
        requestData.currentAccount = requestData.accountData.find(
            (account: any) => event.target.value === account.displayName
        );
        setShowRequest(false);
    };

    /**
     * Show request event handler
     * @param event event
     */
    const handleShowRequest = (event: any) => {
        event.preventDefault();
        setShowRequest(!showRequest);
    };

    /**
     * Send request handler
     */
    const handleSendRequest = async () => {
        setLoading(true);
        setDisableRequest(true);
        requestData.currentAccount = currentAccount;
        try {
            const { tableData, response } = await proccessSendRequest(
                currentProduct,
                requestData
            );
            setTableData(tableData);
            setJsonData(response);
            setShowRequest(false);
            setShowResult(true);
            setDisplayDataType('table');
        } catch (error: any) {
            if (error.message) {
                setSnackbarContent({
                    ...snackbarContent,
                    errorMessage: error.message,
                    severity: error.cause ? 'warning' : 'error',
                });
            }
            setOpenSnackbar(true);
        }
        setLoading(false);
        setDisableRequest(false);
    };

    /**
     * Change response data type handler
     * @param event MouseEvent
     * @param dataType response data type
     */
    const handleDisplayDataTypeChange = (
        event: React.MouseEvent<HTMLElement>,
        dataType: string
    ) => {
        setDisplayDataType(dataType || displayDataType);
    };

    /**
     * Reset sanckbar handler
     */
    const resetSnackbar = async () => {
        setOpenSnackbar(false);
    };

    return (
        <Fragment>
            <Grid item xs={12} className='!mt-10 '>
                <Stack direction='row' spacing={2}>
                    <Chip
                        label={currentProduct.requestType}
                        color='success'
                        className='bg-green-600 text-white !rounded-md !px-2 !pb-0 !text-[10px] !h-[25px]'
                    />
                    <Typography
                        fontWeight='700'
                        align='center'
                        className='text-gray-700'
                    >
                        {currentProduct.name}
                    </Typography>
                    <a
                        href={currentProduct.link}
                        target='_blank'
                        rel='noreferrer'
                    >
                        <ExternalIcon data={'#F37338'} background={'#FFF'} />
                    </a>
                    {currentProduct.type != 'lend' && (
                        <Button
                            onClick={handleSendRequest}
                            className='fetch_button'
                            disabled={disableRequest}
                        >
                            Send request
                            {loading && (
                                <CircularProgress
                                    color='inherit'
                                    size='1rem'
                                    sx={{
                                        marginLeft: '10px',
                                    }}
                                />
                            )}
                        </Button>
                    )}
                </Stack>
            </Grid>
            <Grid item xs={12} className='mt-2 !ml-20 !mb-4'>
                {currentProduct.type != 'lend' && (
                    <Stack
                        direction='row'
                        justifyContent='flex-start'
                        alignItems='baseline'
                        spacing={1}
                    >
                        <Grid item xs={8}>
                            <Typography variant='subtitle1'>
                                {currentProduct.description}
                            </Typography>
                        </Grid>
                    </Stack>
                )}
                {currentProduct.type === 'lend' && (
                    <Typography variant='subtitle1'>
                        <br />
                        {currentProduct.description}
                    </Typography>
                )}
            </Grid>
            {['transactions'].includes(product.toLowerCase()) && (
                <Grid item xs={12} className='mt-2 !ml-20 !mb-4'>
                    <Select
                        labelId='report-select-label'
                        id='report-select'
                        value={accountDisplay}
                        onChange={handleReportChangeSelect}
                        className='w-[320px] h-10'
                    >
                        {requestData.accountDisplayNames.map(
                            (displayName: any) => (
                                <MenuItem value={displayName} key={displayName}>
                                    {displayName}
                                </MenuItem>
                            )
                        )}
                    </Select>
                </Grid>
            )}
            <Grid className={!showRequest ? 'mt-2 !ml-20 !mb-4' : ''}>
                <button onClick={handleShowRequest}>
                    {!showRequest && (
                        <span>
                            <KeyboardArrowRightIcon className='arrow' />
                        </span>
                    )}
                    {showRequest && (
                        <span>
                            <KeyboardArrowDownIcon className='arrow' />
                        </span>
                    )}
                    <span
                        className={
                            'curl-text ' +
                            (showRequest ? 'curl-text-open' : 'curl-text-close')
                        }
                    >
                        cURL command
                    </span>
                </button>
            </Grid>
            {showRequest && (
                <Grid>
                    <CurlCommand
                        product={currentProduct}
                        requestData={requestData}
                        body={body}
                    ></CurlCommand>
                </Grid>
            )}

            {['money_transfer_details', 'available_balance'].includes(
                product.toLowerCase()
            ) &&
                !showResult && (
                    <Grid item xs={12} className='!mt-10'>
                        <Divider />
                    </Grid>
                )}
            <Grid>
                {showResult && (
                    <Fragment>
                        <Stack
                            direction='row'
                            justifyContent='flex-end'
                            alignItems='flex-start'
                            spacing={2}
                        >
                            <ToggleButtonGroup
                                size='small'
                                color='primary'
                                value={displayDataType}
                                exclusive
                                onChange={handleDisplayDataTypeChange}
                            >
                                <ToggleButton value='table'>Table</ToggleButton>
                                <ToggleButton value='json'>JSON</ToggleButton>
                            </ToggleButtonGroup>
                        </Stack>
                        {displayDataType === 'json' && (
                            <div>
                                <JsonViewer jsonData={jsonData}></JsonViewer>
                            </div>
                        )}
                        {displayDataType === 'table' && (
                            <DataTable
                                columns={currentProduct.columns}
                                data={tableData}
                                product={currentProduct.name}
                            />
                        )}
                    </Fragment>
                )}
            </Grid>
            <Grid item xs={12} className='!mt-10'></Grid>
            <SnackBar
                openSnackbar={openSnackbar}
                handleSnackbar={resetSnackbar}
                snackbarContent={snackbarContent}
            ></SnackBar>
        </Fragment>
    );
}
