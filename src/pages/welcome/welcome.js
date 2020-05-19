import React, {useState, useContext, useEffect} from 'react';
import {Wrapper} from "../../components/Layout";
import Logo from "./logo.png";
import "./logo.css"
import {ApiContext} from "../../context/api";
import {SettingsContext} from "../../context/setting";
import {useHistory} from "react-router-dom";
import {useTranslation} from 'react-i18next';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import makeStyles from "@material-ui/core/styles/makeStyles";
import Typography from "@material-ui/core/Typography";
import Collapse from '@material-ui/core/Collapse';
import Alert from '@material-ui/lab/Alert';

function WelcomePage() {
    const [title, setTitle] = useState("");
    const api = useContext(ApiContext).ksmApi;
    const language = useContext(SettingsContext).language;
    const history = useHistory();
    const {i18n} = useTranslation();
    const [open, setOpen] = React.useState(false);
    const [{type, text}, setText] = React.useState({
        type: 'info',
        text: 'It may take longer than expected, but it will be worth it!'
    });
    const classes = useStyles();
    useEffect(() => {
        i18n.changeLanguage(language).then(() => undefined);
        let timer;
        let tipTimer = setTimeout(() => {
            if (!open) {
                setOpen(true);
            }
        }, 10000);

        let errorTimer = setTimeout(() => {
            setOpen(false);
            setTimeout(() => {
                setOpen(true);
                setText({
                    type: 'error',
                    text: 'Connection failed, please check your network settings!'
                })
            }, 1000);
        }, 30000);

        try {
            (async () => {
                if (Object.keys(api).length !== 0) {
                    const [chain] = await Promise.all([
                        api.rpc.system.chain(),
                    ]);
                    setOpen(false);
                    clearTimeout(errorTimer);
                    setTitle(`You are connected to chain ${chain}.`);
                    timer = setTimeout(() => {
                        history.push("/allAccounts");
                    }, 2500);
                }
            })()
        } catch (e) {
            console.log(e)
        }

        return () => {
            clearTimeout(timer);
            clearTimeout(tipTimer);
            if (errorTimer) {
                clearTimeout(errorTimer);
            }
        }
    }, [api]);

    return (
        <Wrapper>
            <Grid container direction="column" alignItems="center" style={{WebkitAppRegion: 'drag'}}>
                <Grid item>
                    <img src={Logo} className="App-logo" alt="logo"/>
                </Grid>
                {
                    title === "" ?
                        <Grid item className={classes.process}>
                            <CircularProgress size={20} color={'inherit'}/>
                            <Collapse in={open}>
                                <Alert severity={type} style={{marginTop: '30px'}} onClose={() => {
                                    setOpen(false)
                                }}>
                                    {text}
                                </Alert>
                            </Collapse>
                        </Grid>
                        :
                        <Grid item className={classes.process}>
                            <Typography style={{
                                textAlign: "center",
                                color: 'rgba(16,16,16,.5)',
                                fontSize: '0.875rem'
                            }}>{title}</Typography>
                        </Grid>
                }
            </Grid>
        </Wrapper>
    )
}

const useStyles = makeStyles({
    process: {
        marginTop: '5vmin',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default React.memo(WelcomePage)
