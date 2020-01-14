import {Call} from "../ipc/ipc";

export const loadSettings = () => Call("ReadSettings");
export const saveSettings = settingUpdate => Call("StoreSettings", settingUpdate);
