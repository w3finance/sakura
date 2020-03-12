import {Call} from "../message/message";

// Settings
export const loadSettings = () => Call("ReadSettings");
export const saveSettings = settingUpdate => Call("StoreSettings", settingUpdate);

// App
export const getAppVersion = () => Call("AppVersion");
export const copyToClipboard = text => Call("CopyToClipboard", text);

// Accounts
export const loadAccounts = () => Call("ReadAccount");
export const saveAccounts = accountData => Call("StoreAccount", accountData);