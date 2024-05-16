import { useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    Alert,
} from '@mui/material';
import { PARTNERID, PARTNERSECRET, APP_KEY, TEXTS } from '../../config/config';

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
                {TEXTS.alertBox.invalidConfiguration}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id='alert-dialog-description'>
                    <Alert
                        severity='error'
                        sx={{
                            color: '#EB001B',
                        }}
                    >
                        <div>{TEXTS.alertBox.invalidKeys}</div>
                    </Alert>
                </DialogContentText>
            </DialogContent>
        </Dialog>
    );
}
