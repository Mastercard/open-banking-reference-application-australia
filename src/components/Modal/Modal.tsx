import { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import { Box, Link, Stack, Typography } from '@mui/material';
import ExternalIcon from '../../utils/external-icon';
import {
    PARTNERID,
    PARTNERSECRET,
    APP_KEY,
    TEXTS,
    LINKS,
} from '../../config/config';

export default function Modal() {
    const [open, setOpen] = useState(!!(PARTNERID && PARTNERSECRET && APP_KEY));

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Dialog
            open={open}
            aria-labelledby='alert-dialog-title'
            aria-describedby='alert-dialog-description'
        >
            <Box className='modal-dialog-parent'>
                <Box className='modal-dialog-content'>
                    <Typography variant='h6' className='flex !font-semibold'>
                        <img
                            src='/mc_symbol.svg'
                            alt='Open Banking'
                            className='w-[44px]'
                        />{' '}
                        developers
                    </Typography>
                    <Box>
                        <Typography className='ref-text'>
                            REFERENCE APP
                        </Typography>
                        <Typography className='open-bannking-text'>
                            Open Banking Australia
                        </Typography>
                        <Typography className=''>
                            {TEXTS.modal.description}
                        </Typography>
                        <Stack
                            direction='row'
                            spacing={1}
                            alignItems='flex-start'
                            sx={{ mt: 1.5 }}
                        >
                            <Link
                                variant='caption'
                                href={LINKS.modal.product}
                                target='_blank'
                                className='!no-underline'
                                fontWeight={'bold'}
                                color={'#111'}
                            >
                                {TEXTS.modal.more}
                            </Link>
                            <img
                                src='/utility.svg'
                                style={{ marginTop: '1px' }}
                                alt=''
                            />
                        </Stack>
                    </Box>

                    <Stack direction='row' className='gap-2'>
                        <Button
                            variant='text'
                            onClick={handleClose}
                            className='demo__button flex items-center'
                        >
                            View demo
                        </Button>
                        <a
                            href={LINKS.modal.github}
                            rel='noreferrer'
                            target='_blank'
                        >
                            <Button
                                endIcon={
                                    <ExternalIcon
                                        data={'#F37338'}
                                        background={'#FFF'}
                                    />
                                }
                                variant='outlined'
                                className='view-on-github__button flex items-center'
                            >
                                View on Github
                            </Button>
                        </a>
                    </Stack>
                </Box>
            </Box>
        </Dialog>
    );
}
