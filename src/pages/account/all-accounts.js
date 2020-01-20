import React, {useContext} from 'react';
import {Wrapper} from "../../components/Layout";
import {Button} from "@material-ui/core";
import {makeStyles} from '@material-ui/core/styles';
import {Save, Add, Language} from '@material-ui/icons';
import {useHistory} from "react-router-dom";
import {useTranslation} from 'react-i18next';
import {SettingsContext} from "../../context/setting";

const useStyles = makeStyles(theme => ({
    button: {
        margin: theme.spacing(2),
        background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
        height: 48,
        width: 210
    },
}));

export default function AllAccounts() {
    const classes = useStyles();
    const history = useHistory();
    const {t, i18n} = useTranslation();
    const settings = useContext(SettingsContext);

    function createAccount() {
        history.push("/create");
    }

    function importAccount() {
        history.push("/restore");
    }

    function changeLng() {
        if (i18n.language && i18n.language === 'zh') {
            settings.toggleLanguage('en');
        } else {
            settings.toggleLanguage('zh');
        }
    }

    return (
        <Wrapper style={{alignItems: "center", justifyContent: "center"}}>
            <>
                <Button
                    variant="contained"
                    color="primary"
                    size="medium"
                    className={classes.button}
                    onClick={createAccount}
                    startIcon={<Add/>}
                >
                    {t('createAccount')}
                </Button>

                <Button
                    variant="contained"
                    color="primary"
                    size="medium"
                    className={classes.button}
                    onClick={importAccount}
                    startIcon={<Save/>}
                >
                    {t('restoreAccount')}
                </Button>

                <Button
                    variant="contained"
                    color="primary"
                    size="medium"
                    className={classes.button}
                    onClick={changeLng}
                    startIcon={<Language/>}
                >
                    Change Language
                </Button>
            </>
        </Wrapper>
    )
}
