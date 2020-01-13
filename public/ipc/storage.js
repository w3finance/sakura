import Store from "electron-store";
import {expose} from "./ipc";

const SettingsStore = new Store({
    name: "Settings",
});

////////// Setting //////////
expose("ReadSettings", function readSettings() {
    return SettingsStore.has("settings") ? SettingsStore.get("settings") : {};
});

expose("StoreSettings", function storeSettings(updatedSettings) {
    const prevSettings = SettingsStore.has("settings") ? SettingsStore.get("settings") : {};
    SettingsStore.set("settings", {...prevSettings, ...updatedSettings});
    return true
});
