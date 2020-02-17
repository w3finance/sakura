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
import {makeStyles} from "@material-ui/styles";

const useStyles = makeStyles({
    process: {
        marginTop: '5vmin'
    },
});

export default function WelcomePage() {
    const [title, setTitle] = useState("");
    const api = useContext(ApiContext).ksmApi;
    const language = useContext(SettingsContext).language;
    const history = useHistory();
    const {i18n} = useTranslation();
    const styles = useStyles();

    useEffect(() => {
        console.log(`Current Language: ${language}`);
        i18n.changeLanguage(language).then(r => console.log(r));
        let timer;
        try {
            (async () => {
                if (judgeObj(api)) {
                    const [chain, nodeName, nodeVersion] = await Promise.all([
                        api.rpc.system.chain(),
                        api.rpc.system.name(),
                        api.rpc.system.version()
                    ]);
                    setTitle(`You are connected to chain ${chain} using ${nodeName} v${nodeVersion}.`);
                    timer = setTimeout(() => {
                        history.push("/allAccounts");
                    }, 3000);
                }
            })()
        } catch (e) {
            console.log(e)
        }

        return () => {
            clearTimeout(timer)
        }
    }, [api]);

    function judgeObj(obj) {
        let attr;
        for (attr in obj) {
            return true
        }
        return false
    }

    return (
        <Wrapper>
            <Grid container direction="column" alignItems="center" style={{height: "100%"}}>
                <Grid item>
                    <img src={Logo} className="App-logo" alt="logo"/>
                </Grid>
                {
                    title === "" ?
                        <Grid item className={styles.process}>
                            <CircularProgress size={20} color={'inherit'}/>
                        </Grid>
                        :
                        <Grid item>
                            <h3 style={{textAlign: "center", color: 'rgba(0,0,0,.6)'}}>{title}</h3>
                        </Grid>
                }
            </Grid>
        </Wrapper>
    )

}

