import { useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    Alert,
} from '@mui/material';
import { PARTNERID, PARTNERSECRET, APP_KEY } from '../../config/config';

export default function AlertBox() {
    const [openAlert] = useState(!(PARTNERID && PARTNERSECRET && APP_KEY));

    return (
        <Dialog
            open={openAlert}
            aria-labelledby='alert-dialog-title'
            aria-describedby='alert-dialog-description'
        >
            <DialogTitle
                id='alert-dialog-title'
                data-testid='alert-box-title'
                sx={{
                    color: '#EB001B',
                }}
            >
                Invalid Configuration
            </DialogTitle>
            <DialogContent>
                <DialogContentText id='alert-dialog-description'>
                    <Alert
                        severity='error'
                        sx={{
                            color: '#EB001B',
                        }}
                    >
                        <div>
                            Looks like you have configured incorrect Partner ID,
                            Partner Secret, or App key.
                        </div>
                    </Alert>
                </DialogContentText>
            </DialogContent>
        </Dialog>
    );
}
