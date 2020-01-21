import React, {useContext} from 'react';
import {Wrapper} from "../../components/Layout";
import {Button} from "@material-ui/core";
import Grid from '@material-ui/core/Grid';
import {makeStyles} from '@material-ui/core/styles';
import {Save, Add, Language} from '@material-ui/icons';
import {useHistory} from "react-router-dom";
import {useTranslation} from 'react-i18next';
import {SettingsContext} from "../../context/setting";
import HeaderTitle from "../../components/HeaderTitle";
import Settings from "@material-ui/icons/Settings";

const useStyles = makeStyles(theme => ({
    button: {
        margin: theme.spacing(2),
        background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
        height: 48,
        width: 210
    },
}));

function AllAccounts() {
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

    // function changeLng() {
    //     if (i18n.language && i18n.language === 'zh') {
    //         settings.toggleLanguage('en');
    //         i18n.changeLanguage('en');
    //     } else {
    //         settings.toggleLanguage('zh');
    //         i18n.changeLanguage('zh');
    //     }
    // }

    return (
        <Wrapper>
            <>
                <HeaderTitle title={'My Accounts'} icon={<Settings style={{color: "white"}}/>}/>
                <Grid container justify="center">
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
                </Grid>
            </>
        </Wrapper>
    )
}

export default React.memo(AllAccounts)
