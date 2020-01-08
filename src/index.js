import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter as Router, Switch, Route} from "react-router-dom";
import {AccountsProvider} from "./context/accounts";
import {ApiProvider} from "./context/api";
import WelcomePage from "./pages/welcome/welcome";
import HomePage from "./pages/home";
import CreateAccount from "./pages/account/create-account";
import RestoreAccount from "./pages/account/restore-acount";

const Providers = (props) => (
    <Router>
        <ApiProvider>
            <AccountsProvider>{props.children}</AccountsProvider>
        </ApiProvider>
    </Router>
);

function App() {
    return (
        <Providers>
            <Switch>
                <Route exact path="/" component={WelcomePage}/>
                <Route exact path="/home" component={HomePage}/>
                <Route exact path="/create" component={CreateAccount}/>
                <Route exact path="/restore" component={RestoreAccount}/>
            </Switch>
        </Providers>
    );
}

ReactDOM.render(<App/>, document.getElementById("root"));

