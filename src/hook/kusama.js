/*
 * @Author: DOT PAY Technology
 * @Description: Kusama API Promise.
 */

import {useContext} from "react";
import {ApiPromise, WsProvider} from '@polkadot/api';
import {ApiContext} from "../context/api";

const ENDPOINT = "wss://kusama-rpc.polkadot.io/";

export function useKusamaApi() {
    const api = useContext(ApiContext).ksmApi;
    console.log(api);
    const getApi = async () =>
        new Promise(function (resolve, reject) {
            try {
                (async () => {
                    if (Object.keys(api).length === 0) {
                        const provider = new WsProvider(ENDPOINT);
                        const ksmApi = await ApiPromise.create({provider: provider});
                        resolve(ksmApi)
                    } else {
                        resolve(api)
                    }
                })()
            } catch (error) {
                reject(error)
            }
        });

    return {
        async freeBalance(address) {
            return new Promise(function (resolve, reject) {
                try {
                    (async () => {
                        const API = await getApi();
                        const balance = await API.query.system.account(address);
                        resolve(balance)
                    })()
                } catch (error) {
                    reject(error)
                }
            })
        },

        async properties() {
            return new Promise(function (resolve, reject) {
                try {
                    (async () => {
                        const API = await getApi();
                        const p = await API.rpc.system.properties();
                        resolve(p)
                    })()
                } catch (error) {
                    reject(error)
                }
            })
        }
    }
}