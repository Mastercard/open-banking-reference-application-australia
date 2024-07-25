import { SyntheticEvent, useEffect, useState } from 'react';
import { Grid, Stack, Tabs, Tab } from '@mui/material';
import { useSelector } from 'react-redux';

import { SnackBar } from '../../components';
import { Lend, Manage, Pay } from './components';

import data from './data';

export default function Usecases({ requestData }: any) {
    const reportGenerationProgress = useSelector(
        (state: any) => state.reportProgress.progress
    );
    const [canChangeTab, setCanChangeTab] = useState<boolean>(true);
    const [currentUsecase, setCurrentUsecase] = useState<any>('Lend');
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarContent] = useState<any>({
        errorMessage: 'Please wait while the report is generating',
        severity: 'warning',
        position: {
            vertical: 'bottom',
            horizontal: 'center',
        },
        timeout: 2000,
    });
    const a11yProps = (index: number) => {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    };

    /**
     * Snack bar reset handler
     */
    const resetSnackbar = async () => {
        setOpenSnackbar(false);
    };

    useEffect(() => {
        setCanChangeTab(reportGenerationProgress === 0);
    }, [reportGenerationProgress]);

    /**
     * Change tab handler
     * @param event SyntheticEvent
     * @param newValue new tab value
     */
    const handleReportChangeTabs = (
        event: SyntheticEvent,
        newValue: string
    ) => {
        if (canChangeTab) {
            setCurrentUsecase(
                data.usecases.find((report: any) => newValue === report)
            );
        } else {
            setOpenSnackbar(true);
        }
    };
    return (
        <Grid
            justifyContent='space-between'
            container
            columnSpacing={{ xs: 2, sm: 3, md: 4 }}
        >
            <Grid item xs={12}>
                <Grid item xs={12}>
                    <Tabs
                        variant='scrollable'
                        value={currentUsecase}
                        onChange={handleReportChangeTabs}
                        aria-label='basic tabs example'
                    >
                        {data.usecases.map((usecase: any, index: number) => (
                            <Tab
                                key={usecase}
                                label={usecase}
                                value={usecase}
                                {...a11yProps(index)}
                            />
                        ))}
                    </Tabs>
                    <br />
                    <Stack direction='column' spacing={1}>
                        {currentUsecase === 'Lend' &&
                            'Make confident lending decisions and offer a hassle-free lending experience for your customers. You can generate below mentioned reports for your connected accounts.'}
                        {currentUsecase === 'Manage' &&
                            'Provide a consolidated view of your customers’ finances in a single space to help your customers manage their wealth better.'}
                        {currentUsecase === 'Pay' &&
                            'Provide a seamless payment experience for your customers.'}
                    </Stack>
                </Grid>
                {currentUsecase === 'Lend' && (
                    <Lend requestData={requestData} />
                )}
                {currentUsecase === 'Manage' && (
                    <Manage requestData={requestData} />
                )}
                {currentUsecase === 'Pay' && <Pay requestData={requestData} />}
            </Grid>
            <SnackBar
                openSnackbar={openSnackbar}
                handleSnackbar={resetSnackbar}
                snackbarContent={snackbarContent}
            ></SnackBar>
        </Grid>
    );
}
