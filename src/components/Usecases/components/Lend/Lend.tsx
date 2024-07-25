import { Fragment, useState } from 'react';
import {
    Grid,
    Stack,
    Select,
    MenuItem,
    SelectChangeEvent,
    Button,
    Tooltip,
} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';

import {
    CircularProgressWithValue,
    Product,
    SnackBar,
} from '../../../../components';
import { reportProgressActions } from '../../../../store/slices/report-progress';

import './Lend.css';
import data from './data';
import { submitReport, downloadReport } from './helper';

export default function Lend({ requestData }: any) {
    const dispatch = useDispatch();
    const reportGenerationProgress = useSelector(
        (state: any) => state.reportProgress.progress
    );
    const [currentReport, setCurrentReport] = useState<any>(data.reports[0]);
    const [disableGenerateReport, setDisableGenerateReport] =
        useState<boolean>(false);
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
     * Report select change event handler
     * @param event SelectChangeEvent
     */
    const handleReportChangeSelect = (event: SelectChangeEvent) => {
        const newReport: any = data.reports.find(
            (report: any) => event.target.value === report.name
        );
        setCurrentReport(newReport);
    };

    /**
     * Generate report
     */
    const generateReport = async () => {
        setDisableGenerateReport(true);
        try {
            const report = await submitReport(
                currentReport,
                requestData,
                dispatch
            );
            currentReport['pdf'] = report?.pdf;
            currentReport['json'] = report?.json;
            const newReport = currentReport;
            setCurrentReport(newReport);
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
        setDisableGenerateReport(false);
        dispatch(reportProgressActions.absoluteValue(0));
    };

    /**
     * Downlod JSON report
     * @param event event
     */
    const downloadJsonReport = async (event: any) => {
        event.preventDefault();
        downloadReport(currentReport.json, currentReport.name, false);
    };

    /**
     *  Downlod PDF report
     * @param event event
     */
    const downloadPdfReport = async (event: any) => {
        event.preventDefault();
        downloadReport(currentReport.pdf, currentReport.name);
    };

    /**
     * Snack bar reset handler
     */
    const resetSnackbar = async () => {
        setOpenSnackbar(false);
    };

    return (
        <Fragment>
            <Grid>
                <Grid item xs={12}>
                    <br />
                    <Stack direction='column' spacing={1}>
                        <Tooltip
                            title={
                                disableGenerateReport
                                    ? 'Please wait while the report is generating'
                                    : ''
                            }
                        >
                            <Select
                                labelId='report-select-label'
                                id='report-select'
                                value={currentReport?.name}
                                disabled={disableGenerateReport}
                                onChange={handleReportChangeSelect}
                                className='w-[320px] h-10'
                            >
                                {data.reports.map((report: any) => (
                                    <MenuItem
                                        value={report?.name}
                                        key={report?.identifier}
                                    >
                                        {report?.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </Tooltip>
                    </Stack>
                </Grid>
                <Product
                    product={currentReport.identifier.toLowerCase()}
                    requestData={requestData}
                    body={currentReport.body}
                />
                <Grid item xs={12} className='mt-2 !ml-20 !mb-4'>
                    <Stack direction='row' spacing={1}>
                        {!currentReport.json && (
                            <Button
                                onClick={generateReport}
                                className='generate-report__button'
                                disabled={disableGenerateReport}
                                id={currentReport?.identifier}
                            >
                                {`Generate ${currentReport.shortName} report`}
                                {disableGenerateReport && (
                                    <CircularProgressWithValue
                                        sx={{
                                            marginLeft: '10px',
                                            color: 'inherit',
                                        }}
                                        value={reportGenerationProgress}
                                    />
                                )}
                            </Button>
                        )}
                        {currentReport.json && (
                            <Button
                                onClick={downloadJsonReport}
                                className='generate-report__button '
                                id={currentReport?.identifier}
                            >
                                Download json report
                            </Button>
                        )}
                        {currentReport.pdf && (
                            <Button
                                onClick={downloadPdfReport}
                                className='generate-report__button '
                                id={currentReport?.identifier}
                            >
                                Download pdf report
                            </Button>
                        )}
                    </Stack>
                </Grid>
            </Grid>
            <SnackBar
                openSnackbar={openSnackbar}
                handleSnackbar={resetSnackbar}
                snackbarContent={snackbarContent}
            ></SnackBar>
        </Fragment>
    );
}
