import React, {useEffect, useState} from "react";
import Box from "@material-ui/core/Box";
import {makeStyles} from '@material-ui/core/styles';

function AccountCard(props) {
    const {address, account, api} = props;
    const classes = useStyles();
    const bg = account.type === 'Polkadot' ? '#847EF2' : '#C785ED';
    const [balance, setBalance] = useState('0');

    useEffect(() => {
        (async () => {
            const prop = await api.properties();
            const tokenDecimals = Number(prop.get('tokenDecimals'));
            const tokenUnit = prop.get('tokenSymbol').toString();
            const obj = await api.freeBalance(address);
            let str = String((obj / Math.pow(10, tokenDecimals)).toFixed(2)) + ' ' + tokenUnit;
            setBalance(str);
        })();
    }, [address]);

    return (
        <Box key={address} className={classes.account} style={{background: bg}}>
            <Box className={classes.name}>{account.name}</Box>
            <Box className={classes.balance}>{balance}</Box>
            <Box className={classes.address}>{address}</Box>
        </Box>
    )
}

const useStyles = makeStyles(theme => ({
    account: {
        width: '355px',
        height: '120px',
        borderRadius: '8px',
        boxShadow: '0px 0px 4px rgba(0,0,0,0.3)',
        margin: '0 0 30px 30px',
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