import {
    AppBar,
    Toolbar,
    ImageListItem,
    Typography,
    Box,
    Button,
} from '@mui/material';
import ExternalIcon from '../../utils/external-icon';
import { LINKS } from '../../config/config';

export default function Header() {
    return (
        <AppBar sx={{ background: 'black' }}>
            <Toolbar>
                <ImageListItem sx={{ width: 60 }}>
                    <img src='/mc_symbol.svg' alt='' />
                </ImageListItem>

                <a
                    href={LINKS.header.openbanking}
                    target='_blank'
                    rel='noreferrer'
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        textDecoration: 'none',
                        color: 'white',
                    }}
                >
                    <Typography
                        justifyContent='center'
                        padding='2px'
                        className='!text-white'
                    >
                        developers
                    </Typography>
                    <img
                        style={{ padding: '3px' }}
                        src='/external_link.svg'
                        alt=''
                    />
                </a>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        width: '100%',
                    }}
                    component='div'
                >
                    <Box />
                    <Box textAlign={'center'}>
                        <Typography
                            variant='caption'
                            fontWeight={'500'}
                            color='#B1ADA6'
                        >
                            REFERENCE APP
                        </Typography>
                        <Typography variant='h6'>
                            Open Banking Australia
                        </Typography>
                    </Box>
                    <a
                        href={LINKS.header.github}
                        target='_blank'
                        rel='noreferrer'
                        style={{ marginTop: '10px' }}
                    >
                        <Button
                            className='view-github__button'
                            style={{ textTransform: 'none' }}
                            endIcon={<ExternalIcon data={'#FFFFFF'} />}
                            variant='outlined'
                            sx={{
                                borderRadius: '25px',
                                borderWidth: '2px',
                                padding: '5px 25px',
                                borderColor: '#FFFFFF',
                                color: 'white',
                            }}
                        >
                            View on Github
                        </Button>
                    </a>
                </Box>
            </Toolbar>
        </AppBar>
    );
}
