import React, {createContext, useEffect, useState} from "react";
import {ApiPromise, WsProvider} from '@polkadot/api';

const initialApi = {};
const KSM_ENDPOINT = "wss://kusama-rpc.polkadot.io/";
const DOT_ENDPOINT = "wss://westend-rpc.polkadot.io/";
const EDG_ENDPOINT = "wss://mainnet1.edgewa.re/";

const ApiContext = createContext({
    ksmApi: initialApi,
    dotApi: initialApi,
    edgApi: initialApi,
    createKsmApi: () => {
        throw new Error("KsmApi not yet ready.");
    },
    createDotApi: () => {
        throw new Error("DotApi not yet ready.");
    },
    createEdgApi: () => {
        throw new Error("EdgApi not yet ready.");
    }
});

export function ApiProvider(props) {
    const [ksmApi, setKsmApi] = useState(initialApi);
    const [dotApi, setDotApi] = useState(initialApi);
    const [edgApi, setEdgApi] = useState(initialApi);

    // Kusama API
    useEffect(() => {
        try {
            (async () => {
                const wsProvider = new WsProvider(KSM_ENDPOINT);
                const api = await ApiPromise.create({provider: wsProvider});
                setKsmApi(api);
            })()
        } catch (error) {
            throw new Error("Create Kusama api failed.");
        }

    }, []);

    const createKsmApi = (api) => {
        setKsmApi(api)
    };

    // Polkadot API
    useEffect(() => {
        try {
            (async () => {
                const wsProvider = new WsProvider(DOT_ENDPOINT);
                const api = await ApiPromise.create({provider: wsProvider});
                setDotApi(api);
            })()
        } catch (error) {
            throw new Error("Create Polkadot api failed.");
        }

    }, []);

    const createDotApi = (api) => {
        setDotApi(api);
    };

    // Edgeware API
    useEffect(() => {
        try {
            (async () => {
                const wsProvider = new WsProvider(EDG_ENDPOINT);
                const api = await ApiPromise.create({provider: wsProvider});
                setEdgApi(api);
            })()
        } catch (error) {
            throw new Error("Create Edgeware api failed.");
        }

    }, []);

    const createEdgApi = (api) => {
        setEdgApi(api);
    };

    const contextValue = {
        ksmApi,
        dotApi,
        edgApi,
        createKsmApi,
        createDotApi,
        createEdgApi
    };

    return <ApiContext.Provider value={contextValue}>{props.children}</ApiContext.Provider>
}

export {ApiContext}