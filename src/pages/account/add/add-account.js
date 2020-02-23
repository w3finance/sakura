import React from "react";
import {Wrapper} from "../../../components/Layout";
import Header from "../../../components/Header";
import {useHistory} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {makeStyles} from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import AddCell from "./cell";

export default function AddAccount() {
    const history = useHistory();
    const {t} = useTranslation();
    const classes = useStyles();

    function back() {
        history.goBack();
    }

    return (
        <Wrapper>
            <>
                <Header lfIcon bg title={t('tl_addAccount')} goBack={back}/>
                <Box component='div' className={classes.title}>
                    <Typography>{t('tl_create')}</Typography>
                </Box>
                <AddCell title={t('tl_createWallet')} onClick/>
                <Box component='div' className={classes.title}>
                    <Typography>{t('tl_import')}</Typography>
                </Box>
                <AddCell title={t('tl_privateKey')} style={{marginBottom: '20px'}} onClick/>
                <AddCell title={t('tl_mnemonic')} style={{marginBottom: '20px'}} onClick/>
                <AddCell title={t('tl_keyStore')} onClick/>
            </>
        </Wrapper>
    )
}

const useStyles = makeStyles(theme => ({
    title: {
        color: 'rgba(16,16,16,.5)',
        fontSize: 16,
        height: '60px',
        paddingLeft: '30px',
        display: 'flex',
        alignItems: 'center'
    }
}));
