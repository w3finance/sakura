import React, {createContext, useEffect, useState} from "react";

const initialAccounts = [];

const AccountsContext = createContext({
    accounts: initialAccounts,
    createAccount: () => {
        throw new Error("AccountsProvider not yet ready.");
    }
})

export function AccountsProvider(props) {
    const [accounts, setAccounts] = useState(initialAccounts);

    useEffect(()=> {
        // TODO load all accounts
        setAccounts([{'project': 'kusama'}])
    }, []);

    const createAccount = async (accountData) => {
        const account = {};// TODO create account
        setAccounts(prevAccounts => [...prevAccounts, account]);
        return account;
    }

    const contextValue = {
        accounts,
        createAccount,
    }

    return <AccountsContext.Provider value={contextValue}>{props.children}</AccountsContext.Provider>
}

function loadAccounts() {
}

function createAccount() {
}

export { AccountsContext }