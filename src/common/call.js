import {Call} from "../message/message";

export const loadSettings = () => Call("ReadSettings");
export const saveSettings = settingUpdate => Call("StoreSettings", settingUpdate);

export const getAppVersion = () => Call("AppVersion");
