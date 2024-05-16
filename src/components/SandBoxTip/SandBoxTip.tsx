import { Card, CardContent, Typography } from '@mui/material';
import { TEXTS } from '../../config/config';

export default function SandBoxTip() {
    return (
        <Card className='mt-[40px] mb-[40px] rounded-lg !bg-gray-01 !shadow-none'>
            <CardContent className='!p-6 bg-sandbox'>
                <Typography className='!mb-2 text-xl !font-[700] leading-6 tracking-wider !text-gray-500'>
                    SANDBOX TIP:
                </Typography>

                <Typography className='!mb-6 text-gray-700 text-base font-normal leading-5'>
                    {TEXTS.sandbox.tip}
                </Typography>

                <div className='flex items-start'>
                    <div className='flex flex-col items-start gap-4 w-1/3'>
                        <Typography className='mb-2 text-base !font-[700]'>
                            Institution
                        </Typography>
                        <div className='w-24 h-12'>
                            <img src='/finbank.svg' alt='' />
                        </div>
                    </div>

                    <div className='flex flex-col items-start gap-4 w-1/3'>
                        <Typography className='mb-2 text-base !font-[700]'>
                            {TEXTS.sandbox.usernameField}
                        </Typography>
                        <Typography className='text-base'>
                            {TEXTS.sandbox.usernameValue}
                        </Typography>
                    </div>

                    <div className='flex flex-col items-start gap-4 w-1/3'>
                        <Typography className='mb-2 text-base !font-[700]'>
                            {TEXTS.sandbox.passwordField}
                        </Typography>
                        <Typography className='text-base'>
                            {TEXTS.sandbox.passwordValue}
                        </Typography>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
