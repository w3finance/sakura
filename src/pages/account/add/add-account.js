import React, {useState} from "react";
import {Wrapper} from "../../../components/Layout";
import Header from "../../../components/Header";
import {useHistory} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {makeStyles} from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import AddCell from "./cell";

import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Dialog from '@material-ui/core/Dialog';
import List from '@material-ui/core/List';
import Avatar from '@material-ui/core/Avatar';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import { blue } from '@material-ui/core/colors';

export default function AddAccount() {
    const history = useHistory();
    const {t} = useTranslation();
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [type, setType] = useState();

    function back() {
        history.goBack();
    }

    const handleOpen = () => {
        setOpen(true);
    };

    const handleType = type => {
        setType(type);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleListItemClick = value => {
        setOpen(false);
        if (type === 'create') {
            history.push(`/create/:create/:${value}`);
        } else if (type === 'privateKey'){
            history.push(`/import/:privateKey/:${value}`);
        } else if (type === 'mnemonic'){
            history.push(`/import/:mnemonic/:${value}`);
        } else{
            history.push(`/import/:keystore/:${value}`);
        }
    };

    return (
        <Wrapper>
            <>
                <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
                    <List className={classes.list}>
                        {chains.map(chain => (
                            <ListItem button onClick={() => handleListItemClick(chain)} key={chain}>
                                <ListItemAvatar>
                                    <Avatar className={classes.avatar}>
                                        <AccountBalanceWalletIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary={chain} />
                            </ListItem>
                        ))}
                    </List>
                </Dialog>
                <Header lfIcon bg title={t('tl_addAccount')} goBack={back}/>
                <Box component='div' className={classes.title}>
                    <Typography>{t('tl_create')}</Typography>
                </Box>
                <AddCell title={t('tl_createAccount')}
                         onClick={() => {
                             handleOpen();
                             handleType('create');
                         }}/>
                <Box component='div' className={classes.title}>
                    <Typography>{t('tl_import')}</Typography>
                </Box>
                <AddCell title={t('tl_privateKey')}
                         style={{marginBottom: '20px'}}
                         onClick={() => {
                             handleOpen();
                             handleType('privateKey');
                         }}/>
                <AddCell title={t('tl_mnemonic')}
                         style={{marginBottom: '20px'}}
                         onClick={() => {
                             handleOpen();
                             handleType('mnemonic');
                         }}/>
                <AddCell title={t('tl_keyStore')}
                         onClick={() => {
                             handleOpen();
                             handleType('keystore');
                         }}/>
            </>
        </Wrapper>
    )
}

const chains = ['Polkadot', 'Kusama','Polkadot', 'Kusama','Polkadot', 'Kusama','Polkadot', 'Kusama','Polkadot', 'Kusama',];

const useStyles = makeStyles(theme => ({
    title: {
        color: 'rgba(16,16,16,.5)',
        fontSize: 16,
        height: '60px',
        paddingLeft: '30px',
        display: 'flex',
        alignItems: 'center'
    },
    avatar: {
        backgroundColor: blue[100],
        color: blue[600],
    },
    list: {
        width: '260px'
    }
}));
