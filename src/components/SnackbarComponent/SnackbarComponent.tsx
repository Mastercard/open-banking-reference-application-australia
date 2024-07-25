import React from 'react';
import { Snackbar, Alert } from '@mui/material';

export default function SnackBar({
    handleSnackbar,
    openSnackbar,
    snackbarContent,
}: any) {
    let backgroundColor = '#FF5555';
    if (snackbarContent.severity === 'success') {
        backgroundColor = '#4BB543';
    } else if (snackbarContent.severity === 'warning') {
        backgroundColor = '#F79E1B';
    }

    /**
     * Sackbar close event handler
     * @param event SyntheticEvent
     * @param reason reason on click
     * @returns
     */
    const handleClose = (
        event?: React.SyntheticEvent | Event,
        reason?: string
    ) => {
        if (reason === 'clickaway') {
            return;
        }
        handleSnackbar();
    };
    return (
        <Snackbar
            open={openSnackbar}
            onClose={handleClose}
            anchorOrigin={snackbarContent.position}
            autoHideDuration={snackbarContent.timeout || 5000}
        >
            <Alert
                onClose={handleClose}
                severity={snackbarContent.severity}
                variant='filled'
                sx={{
                    width: '100%',
                    backgroundColor,
                    color: '#FFFFFF',
                }}
            >
                {snackbarContent.errorMessage}
            </Alert>
        </Snackbar>
    );
}
