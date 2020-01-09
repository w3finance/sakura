import React, {useState, useContext, useEffect} from 'react';
import {Wrapper} from "../../components/Layout";
import Logo from "./logo.svg";
import "./logo.css"
import {ApiContext} from "../../context/api";
import {SettingsContext} from "../../context/setting";
import {useHistory} from "react-router-dom";

export default function WelcomePage() {
    const [title, setTitle] = useState("Hello Polkadot");
    const api = useContext(ApiContext).ksmApi;
    const language = useContext(SettingsContext).language;
    const history = useHistory();

    useEffect(() => {
        console.log(language);
        let timer;
        try {
            (async () => {
                if (judgeObj(api)) {
                    const [chain, nodeName, nodeVersion] = await Promise.all([
                        api.rpc.system.chain(),
                        api.rpc.system.name(),
                        api.rpc.system.version()
                    ]);
                    setTitle(`You are connected to chain ${chain} using ${nodeName} v${nodeVersion}`);
                    timer = setTimeout(() => {
                        history.push("/home");
                    }, 2500);
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
        <Wrapper style={{alignItems: "center", justifyContent: "center"}}>
            <>
                <img src={Logo} className="App-logo" alt="logo"/>
                <h3 style={{textAlign: "center", color: '#FFF'}}>{title}</h3>
            </>
        </Wrapper>
    )

}

