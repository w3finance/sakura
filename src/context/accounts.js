import React, {createContext, useEffect, useState} from "react";
import {loadAccounts, saveAccounts} from "../util/call";

const initialAccounts = {};

const AccountsContext = createContext({
    accounts: initialAccounts,
    createAccount: () => {
        throw new Error("AccountsProvider not yet ready.");
    }
});

export function AccountsProvider(props) {
    const [accounts, setAccounts] = useState(initialAccounts);

    useEffect(() => {
        Promise
            .all([loadAccounts()])
            .then(([data]) => {
                setAccounts({...accounts, ...data})
            })
            .catch(e => console.log(e));
    }, []);

    const createAccount = (accountData) => {
        try {
            const allAccounts = {
                ...accounts,
                ...accountData
            };
            setAccounts(allAccounts);
            saveAccounts(allAccounts);
        } catch (e) {
            console.log(e)
        }
    };

    const contextValue = {
        accounts,
        createAccount,
    };

    return <AccountsContext.Provider value={contextValue}>{props.children}</AccountsContext.Provider>
}

export { AccountsContext }