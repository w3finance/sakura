import React, {useEffect} from 'react';
import {Wrapper} from "../../components/Layout";
import {Button} from "@material-ui/core";
import {makeStyles} from '@material-ui/core/styles';
import {Save, Add, Language} from '@material-ui/icons';
import {useHistory} from "react-router-dom";
import {useTranslation} from 'react-i18next';

const useStyles = makeStyles(theme => ({
    button: {
        margin: theme.spacing(2),
        background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
        height: 48,
        width: 210
    },
}));

export default function HomePage() {
    const classes = useStyles();
    const history = useHistory();
    const {t, i18n} = useTranslation();

    function createAccount() {
        history.push("/create");
    }

    function importAccount() {
        history.push("/restore");
    }

    function changeLng() {
        if (i18n.language && i18n.language === 'zh') {
            i18n.changeLanguage('en').then(r => r);
        } else {
            i18n.changeLanguage('zh').then(r => r);
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
