import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter as Router, Switch, Route} from "react-router-dom";
import {SettingsProvider} from "./context/setting";
import {AccountsProvider} from "./context/accounts";
import {ApiProvider} from "./context/api";
import {I18nextProvider} from "react-i18next";
import i18n from "./common/i18n";
import WelcomePage from "./pages/welcome/welcome";
import AllAccounts from "./pages/account/all-accounts";
import CreateAccount from "./pages/account/add/create-account";
import ImportAccount from "./pages/account/add/import-account";
import Setting from "./pages/setting/setting";

const Providers = (props) => (
    <Router>
        <SettingsProvider>
            <ApiProvider>
                <AccountsProvider>
                    <I18nextProvider i18n={i18n}>
                        {props.children}
                    </I18nextProvider>
                </AccountsProvider>
            </ApiProvider>
        </SettingsProvider>
    </Router>
);

class App extends React.Component {
    render() {
        return (
            <Providers>
                <Switch>
                    <Route exact path="/" component={WelcomePage}/>
                    <Route exact path="/allAccounts" component={AllAccounts}/>
                    <Route exact path="/createAccount" component={CreateAccount}/>
                    <Route exact path="/importAccount" component={ImportAccount}/>
                    <Route exact path="/setting" component={Setting}/>
                </Switch>
            </Providers>
        );
    }
}

ReactDOM.render(<App/>, document.getElementById("root"));

