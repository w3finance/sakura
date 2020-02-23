import React, {useContext, useEffect, useState} from "react";
import {Wrapper} from "../../components/Layout";
import Header from "../../components/Header";
import SettingCell from "./cell";
import {useHistory} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {makeStyles} from "@material-ui/core/styles";
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import {SettingsContext} from "../../context/setting";
import {getAppVersion} from "../../common/call";
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const options = [
    'en',
    'zh'
];

export default function Setting() {
    const history = useHistory();
    const {t, i18n} = useTranslation();
    const language = useContext(SettingsContext).language;
    const settings = useContext(SettingsContext);
    const classes = useStyles();
    const [version, setVersion] = useState();
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(language);

    useEffect(() => {
        getAppVersion().then(res => {
            setVersion(res)
        }).catch(r => r);
    }, []);

    function back() {
        history.goBack();
    }

    function changeLng() {
        setValue(language);
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = event => {
        setValue(event.target.value);
    };

    const handleOk = () => {
        handleClose();
        if (value) {
            settings.toggleLanguage(value);
            i18n.changeLanguage(value).then(r => r);
        }
    };

    return (
        <Wrapper>
            <Dialog open={open}
                    onClose={handleClose}
                    fullWidth={true}
                    maxWidth={'xs'}
            >
                <DialogTitle>{t('tl_language')}</DialogTitle>
                <DialogContent dividers>
                    <RadioGroup
                        aria-label="ringtone"
                        name="ringtone"
                        value={value}
                        onChange={handleChange}
                        color={'primary'}
                    >
                        {options.map(option => (
                            <FormControlLabel value={option}
                                              key={option}
                                              control={<Radio color="primary"/>}
                                              label={t(`${option}`)}/>
                        ))}
                    </RadioGroup>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleClose} color="primary">
                        {t('bt_cancel')}
                    </Button>
                    <Button autoFocus onClick={handleOk} color="primary">
                        {t('bt_ok')}
                    </Button>
                </DialogActions>
            </Dialog>
            <Header lfIcon bg title={t('tl_setting')} goBack={back}/>
            <SettingCell title={t('tl_language')}
                  subTitle={t(`${language}`)}
                  icon={<NavigateNextIcon style={{color: "rgba(16,16,16,.5)"}}/>}
                  line
                  onClick={changeLng}
            />
            <SettingCell title={t('tl_terms')}
                  icon={<NavigateNextIcon style={{color: "rgba(16,16,16,.5)"}}/>}
                  line
            />
            <div className={classes.footer}>
                <div className={classes.version}>{`v${version}`}</div>
            </div>
        </Wrapper>
    )
}

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
