import React, {useContext} from "react";
import {Wrapper} from "../../components/Layout";
import Header from "../../components/Header";
import Cell from "../../components/cell/cell";
import {useHistory} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {makeStyles} from "@material-ui/core/styles";
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import {SettingsContext} from "../../context/setting";

const useStyles = makeStyles(theme => ({
    version: {
        textAlign: "center",
        color: 'rgba(16,16,16,.5)',
        fontSize: 16
    }
}));

export default function Setting() {
    const history = useHistory();
    const {t, i18n} = useTranslation();
    const language = useContext(SettingsContext).language;
    const settings = useContext(SettingsContext);
    const classes = useStyles();

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
            <>
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
            </>
        </Wrapper>
    )
}
