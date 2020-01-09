import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter as Router, Switch, Route} from "react-router-dom";
import {AccountsProvider} from "./context/accounts";
import {ApiProvider} from "./context/api";
import {I18nextProvider} from "react-i18next";
import i18n from "./common/i18n";
import {Layout} from "./components/Layout";
import WelcomePage from "./pages/welcome/welcome";
import HomePage from "./pages/home/home";
import CreateAccount from "./pages/account/create-account";
import RestoreAccount from "./pages/account/restore-acount";

const Providers = (props) => (
    <Router>
        <ApiProvider>
            <AccountsProvider>
                <I18nextProvider i18n={i18n}>
                    {props.children}
                </I18nextProvider>
            </AccountsProvider>
        </ApiProvider>
    </Router>
);

function App() {
    return (
        <Providers>
            <Layout>
                <Switch>
                    <Route exact path="/" component={WelcomePage}/>
                    <Route exact path="/home" component={HomePage}/>
                    <Route exact path="/create" component={CreateAccount}/>
                    <Route exact path="/restore" component={RestoreAccount}/>
                </Switch>
            </Layout>
        </Providers>
    );
}

ReactDOM.render(<App/>, document.getElementById("root"));

