/*
 * @Author: DOT PAY Technology
 * @Description: Edgeware API Promise.
 */

import {useContext} from "react";
import {ApiPromise} from '@polkadot/api';
import {WsProvider} from '@polkadot/rpc-provider';
import {ApiContext} from "../context/api";

const ENDPOINT = "wss://mainnet1.edgewa.re/";

export function useEdgewareApi() {
    const api = useContext(ApiContext).edgApi;
    console.log(api);
    const getApi = async () =>
        new Promise(function (resolve, reject) {
            try {
                (async () => {
                    if (Object.keys(api).length === 0) {
                        const provider = new WsProvider(ENDPOINT);
                        const edgApi = await ApiPromise.create({provider: provider});
                        resolve(edgApi)
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
                        console.log('Edgeware: '+balance)
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
