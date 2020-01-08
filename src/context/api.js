import React, {createContext, useEffect, useState} from "react";
import {ApiPromise, WsProvider} from '@polkadot/api';

const ENDPOINT = "wss://kusama-rpc.polkadot.io/";
const initialApi = {};

const ApiContext = createContext({
    ksmApi: initialApi,
});

export function ApiProvider(props) {
    const [ksmApi, setKsmApi] = useState(initialApi);

    useEffect(() => {
        // create kusama api
        try {
            (async () => {
                const wsProvider = new WsProvider(ENDPOINT);
                const api = await ApiPromise.create({ provider: wsProvider });
                setKsmApi(api);
            })()
        } catch (error) {
            throw new Error("Create Kusama api failure.");
        }

    }, []);

    const contextValue = {
        ksmApi,
    };

    return <ApiContext.Provider value={contextValue}>{props.children}</ApiContext.Provider>
}

export {ApiContext}