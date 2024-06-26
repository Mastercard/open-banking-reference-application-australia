import { Grid, Stack, Typography } from '@mui/material';
import InputField from '../../FormFields/InputField';
import { TEXTS } from '../../../../config/config';

export default function UserNameForm(props: any) {
    const {
        formField: { userName },
    } = props;
    return (
        <Grid container spacing={3} className='mb-5'>
            <Grid item xs={12} md={3}>
                <Stack direction='column'>
                    <Typography fontWeight='bold' fontSize={16} variant='h6'>
                        Username
                    </Typography>
                    <Typography fontSize={16} variant='body1'>
                        {TEXTS.createCustomerForm.description}
                    </Typography>
                </Stack>
            </Grid>
            <Grid item xs={12} md={9}>
                <InputField name={userName.name} fullWidth />
            </Grid>
        </Grid>
    );
}
