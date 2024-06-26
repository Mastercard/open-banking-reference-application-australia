import {
    Chip,
    Divider,
    Grid,
    MenuItem,
    Select,
    SelectChangeEvent,
    Stack,
    Typography,
} from '@mui/material';
import ExternalIcon from '../../utils/external-icon';
import { useState } from 'react';
import { TEXTS, LINKS } from '../../config/config';
export default function AccountInfo({ accountData }: any) {
    // State to manage the selected account
    const [account, setAccount] = useState(accountData[0]);
    // Event handler for changing the selected account
    const handleChangeAccount = (event: SelectChangeEvent) => {
        // Find the selected account from accountData based on the chosen value
        const accountElem = accountData.find((accValue: any) =>
            event.target.value.includes(
                `${accValue.accountNickname}-${accValue.accountNumberDisplay}`
            )
        );
        setAccount(accountElem);
    };
    return (
        <Grid
            justifyContent='space-between'
            container
            columnSpacing={{ xs: 2, sm: 3, md: 4 }}
        >
            <Grid item xs={12}>
                {/* Display the number of connected accounts */}
                <Stack direction='column' spacing={1}>
                    <Typography variant='subtitle1'>
                        {TEXTS.accountInfo.accountList + ' '}
                        <span className='text-gray-700'>
                            {accountData.length} accounts. Connected accounts:
                        </span>
                    </Typography>
                </Stack>
                {/* Dropdown to select connected accounts */}
                <Stack direction='column' spacing={1}>
                    <Select
                        labelId='account-select-label'
                        id='account-select'
                        value={`${account.accountNickname}-${account.accountNumberDisplay}`}
                        onChange={handleChangeAccount}
                        className='w-[320px] h-10'
                    >
                        {/* Map through account data to display each connected account */}
                        {accountData.map((acc: any) => (
                            <MenuItem
                                value={`${acc.accountNickname}-${acc.accountNumberDisplay}`}
                                key={acc.id}
                            >{`${acc.accountNickname}-${acc.accountNumberDisplay}`}</MenuItem>
                        ))}
                    </Select>
                </Stack>
            </Grid>
            <Grid item xs={12} className='!mt-10'>
                <Divider />
            </Grid>
            {/* Display ACH details for the selected account */}
            {account?.achData && (
                <>
                    <Grid item xs={12} className='!mt-10 '>
                        <Stack direction='row' spacing={2}>
                            <Chip
                                label='GET'
                                color='success'
                                className='bg-green-600 text-white !rounded-md !px-2 !pb-0 !text-[10px] !h-[25px]'
                            />
                            <Typography
                                fontWeight='700'
                                align='center'
                                className='text-gray-700'
                            >
                                {TEXTS.accountInfo.moneyTransferDetails}
                            </Typography>
                            <a
                                href={LINKS.accountInfo.moneyTransferDetails}
                                target='_blank'
                                rel='noreferrer'
                            >
                                <ExternalIcon
                                    data={'#F37338'}
                                    background={'#FFF'}
                                />
                            </a>
                        </Stack>
                    </Grid>
                    {/* Display bsb number and account number */}
                    <Grid item xs={12} className='mt-2 !ml-20 !mb-4'>
                        <Typography variant='subtitle1'>
                            {TEXTS.accountInfo.moneyTransferDetailsDescription}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} className='!mt-2 !ml-8'>
                        <Stack direction='row' spacing={2}>
                            <Typography
                                variant='body2'
                                fontWeight='bold'
                                className='account-info__label'
                            >
                                bsbNumber :
                            </Typography>
                            <Typography
                                className='text-gray-700'
                                data-testid='bin-number'
                            >
                                "
                                {account?.achData?.paymentInstruction?.[0]
                                    ?.descriptors?.[0]?.value || 'NA'}
                                "
                            </Typography>
                        </Stack>
                        <Stack direction='row' spacing={2} className='mt-2'>
                            <Typography
                                variant='body2'
                                fontWeight='bold'
                                className='account-info__label'
                            >
                                accountNumber :
                            </Typography>
                            <Typography
                                className='text-gray-700'
                                data-testid='account-number'
                            >
                                "
                                {account?.achData?.paymentInstruction?.[0]
                                    ?.accountNumber || 'NA'}
                                "
                            </Typography>
                        </Stack>
                    </Grid>
                    <Grid item xs={12} className='!mt-10'>
                        <Divider />
                    </Grid>
                </>
            )}
            {/* Display available balance details */}
            <Grid item xs={12} className='!mt-10'>
                <Stack direction='row' spacing={2}>
                    <Chip
                        label='GET'
                        color='success'
                        className='bg-green-600 text-white !rounded-md !px-2 !pb-0 !text-[10px] !h-[25px]'
                    />
                    <Typography
                        fontWeight='700'
                        align='center'
                        className='text-gray-700'
                    >
                        AVAILABLE BALANCE
                    </Typography>
                    <a
                        href={LINKS.accountInfo.availableBalance}
                        target='_blank'
                        rel='noreferrer'
                    >
                        <ExternalIcon data={'#F37338'} background={'#FFF'} />
                    </a>
                </Stack>
            </Grid>
            {/* Display additional account details */}
            <Grid item xs={12} className='mt-2 !ml-20 !mb-4'>
                <Typography variant='subtitle1'>
                    {TEXTS.accountInfo.availableBalance}
                </Typography>
            </Grid>
            <Grid item xs={12} className='!mt-2 !ml-8'>
                <Stack direction='row' spacing={2}>
                    <Typography
                        variant='body2'
                        className='account-info__label'
                        fontWeight='bold'
                    >
                        id :
                    </Typography>
                    <Typography
                        className='text-gray-700'
                        data-testid='account-id'
                    >
                        "{account?.id}"
                    </Typography>
                </Stack>
            </Grid>
            <Grid item xs={12} className='!mt-2 !ml-8'>
                <Stack direction='row' spacing={2}>
                    <Typography
                        variant='body2'
                        className='account-info__label'
                        fontWeight='bold'
                    >
                        realAccountNumberLast4 :
                    </Typography>
                    <Typography
                        className='text-gray-700'
                        data-testid='real-account-number-last-4'
                    >
                        "{account?.number?.slice(-4)}"
                    </Typography>
                </Stack>
            </Grid>
            <Grid item xs={12} className='!mt-2 !ml-8'>
                <Stack direction='row' spacing={2}>
                    <Typography
                        variant='body2'
                        className='account-info__label'
                        fontWeight='bold'
                    >
                        availableBalance :
                    </Typography>
                    <Typography
                        className='text-gray-700'
                        data-testid='available-balance'
                    >
                        {account?.balance}
                    </Typography>
                </Stack>
            </Grid>
            <Grid item xs={12} className='!mt-2 !ml-8'>
                <Stack direction='row' spacing={2}>
                    <Typography
                        variant='body2'
                        className='account-info__label'
                        fontWeight='bold'
                    >
                        availableBalanceDate :
                    </Typography>
                    <Typography
                        className='text-gray-700'
                        data-testid='available-balance-date'
                    >
                        {new Date(account?.balanceDate * 1000).toDateString()}
                    </Typography>
                </Stack>
            </Grid>
            <Grid item xs={12} className='!mt-2 !ml-8'>
                <Stack direction='row' spacing={2}>
                    <Typography
                        variant='body2'
                        className='account-info__label'
                        fontWeight='bold'
                    >
                        clearedBalance :
                    </Typography>
                    <Typography
                        className='text-gray-700'
                        data-testid='cleared-balance'
                    >
                        {account?.balance}
                    </Typography>
                </Stack>
            </Grid>
            <Grid item xs={12} className='!mt-2 !ml-8'>
                <Stack direction='row' spacing={2}>
                    <Typography
                        variant='body2'
                        className='account-info__label'
                        fontWeight='bold'
                    >
                        clearedBalanceDate :
                    </Typography>
                    <Typography
                        className='text-gray-700'
                        data-testid='cleared-balance-date'
                    >
                        {new Date(account?.balanceDate * 1000).toDateString()}
                    </Typography>
                </Stack>
            </Grid>
            <Grid item xs={12} className='!mt-2 !ml-8'>
                <Stack direction='row' spacing={2}>
                    <Typography
                        variant='body2'
                        className='account-info__label'
                        fontWeight='bold'
                    >
                        currency :
                    </Typography>
                    <Typography
                        className='text-gray-700'
                        data-testid='currency'
                    >
                        "{account?.currency}"
                    </Typography>
                </Stack>
            </Grid>
        </Grid>
    );
}
