import React, {useState} from "react";
import Box from "@material-ui/core/Box";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {useSnackbar} from 'notistack';
import {copyToClipboard} from "../../util/call";
import {useTranslation} from "react-i18next";
import {useHistory} from "react-router-dom";

function AccountCard(props) {
    const {t} = useTranslation();
    const history = useHistory();
    const {enqueueSnackbar} = useSnackbar();
    const classes = useStyles();
    const {api, address, account} = props;
    const bg = account.type === 'Kusama' ? '#C785ED' : (account.type === 'Polkadot' ? '#847EF2' : '#565F75');
    const [balance, setBalance] = useState('~');

    try {
        (async () => {
            if (Object.keys(api).length !== 0){
                const {tokenDecimals, tokenSymbol} = await api.properties();
                const {nonce, data: balance} = await api.freeBalance(address);
                let fix = (balance.free / Math.pow(10, tokenDecimals)) === 0 ? 0 : 3;
                let free = String((balance.free / Math.pow(10, tokenDecimals)).toFixed(fix)) + ' ' + tokenSymbol;
                setBalance(free);
            }
        })()
    } catch (e) {
        console.log(e)
    }

    const handleClick = (e) => {
        console.log(e.currentTarget)
    };

    const handleClickVariant = variant => () => {
        copyToClipboard(address);
        enqueueSnackbar(t('Common.copy'), {
            anchorOrigin: {
                vertical: 'bottom',
                horizontal: 'left',
            }
        })
    };

    const goAccount = (accountId) => {
        history.push(`/account/:${accountId}`)
    };

    return (
        <Box key={address} className={classes.account} style={{background: bg}} onClick={() => goAccount(address)}>
            <Box className={classes.name}>{account.name}</Box>
            <Box className={classes.balance}>{balance}</Box>
            <Box className={classes.address} onClick={(event) => handleClick(event)}>{address}</Box>
        </Box>
    )
}

const useStyles = makeStyles(theme => ({
    account: {
        width: '350px',
        height: '120px',
        borderRadius: '10px',
        boxShadow: '0px 0px 4px rgba(0,0,0,0.3)',
        margin: '0 0 20px 30px',
        cursor: 'pointer'
    },
    name: {
        marginLeft: 20,
        marginTop: 10,
        color: '#FFF',
        fontSize: '14px'
    },
    balance: {
        marginLeft: 20,
        marginTop: 30,
        color: '#FFF',
        fontSize: '14px'
    },
    address: {
        width: '315px',
        height: '20px',
        marginLeft: 20,
        marginTop: 5,
        color: 'rgba(255,255,255,.5)',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        fontSize: '14px'
    }
}));

export default React.memo(AccountCard)
