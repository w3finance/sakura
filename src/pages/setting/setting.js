import React, {useContext, useEffect, useState} from "react";
import {Wrapper} from "../../components/Layout";
import Header from "../../components/Header";
import Cell from "../../components/cell/cell";
import {useHistory} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {makeStyles} from "@material-ui/core/styles";
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import {SettingsContext} from "../../context/setting";
import Grid from '@material-ui/core/Grid';
import {getAppVersion} from "../../common/call";

const useStyles = makeStyles(theme => ({
    version: {
        color: 'rgba(16,16,16,.5)',
        fontSize: 16,
        width: '100%',
        height: '50px',
        textAlign: 'center'
    },
    footer: {
        flexGrow: '1',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
    }
}));

export default function Setting() {
    const history = useHistory();
    const {t, i18n} = useTranslation();
    const language = useContext(SettingsContext).language;
    const settings = useContext(SettingsContext);
    const classes = useStyles();
    const [version, setVersion] = useState();

    useEffect(() => {
        getAppVersion().then(res => {
            setVersion(res)
        }).catch(r => r);
    }, []);


    function back() {
        history.goBack();
    }

    function changeLng() {
        if (i18n.language && i18n.language === 'zh') {
            settings.toggleLanguage('en');
            i18n.changeLanguage('en').then(r => r);
        } else {
            settings.toggleLanguage('zh');
            i18n.changeLanguage('zh').then(r => r);
        }
    }

    return (
        <Wrapper>
            <Header lfIcon bg title={t('tl_setting')} goBack={back}/>
            <Cell title={t('tl_language')}
                  subTitle={t(`${language}`)}
                  icon={<NavigateNextIcon style={{color: "rgba(16,16,16,.5)"}}/>}
                  line
                  onClick={changeLng}
            />
            <Cell title={t('tl_terms')}
                  icon={<NavigateNextIcon style={{color: "rgba(16,16,16,.5)"}}/>}
                  line
            />
            <div className={classes.footer}>
                <div className={classes.version}>{`v${version}`}</div>
            </div>
        </Wrapper>
    )
}
