import React, {Component} from 'react';
import {useHistory} from "react-router-dom";
import Wrapper from "../components/Wrapper";
import Logo from "../logo.svg";
import "../logo.css"
import { ApiPromise, WsProvider } from '@polkadot/api';

class WelcomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: 'Hello Polkadot'
        }
    }

    componentDidMount() {
        this.main().catch(console.error).finally(()=>{})
    }

    async main() {
        const wsProvider = new WsProvider("wss://kusama-rpc.polkadot.io/");
        const api = await ApiPromise.create({ provider: wsProvider });
        const [chain, nodeName, nodeVersion] = await Promise.all([
            api.rpc.system.chain(),
            api.rpc.system.name(),
            api.rpc.system.version()
        ]);
        console.log(`You are connected to chain ${chain} using ${nodeName} v${nodeVersion}`);
        this.setState({text : `You are connected to chain ${chain} using ${nodeName} v${nodeVersion}`})
    }

    render() {
        return (
            <Wrapper drag={true} style={{"justifyContent": "center", "alignItems": "center"}}>
                <div>
                    <img src={Logo} className="App-logo"/>
                    <h3 style={{textAlign: "center",color: '#fff'}}>{this.state.text}</h3>
                </div>
            </Wrapper>
        )
    }
}

export default WelcomePage