const Store = require('electron-store');
const {expose} = require("./ipc");

////////// User Settings //////////
const SettingsStore = new Store({
    name: "Settings",
});

// read
expose("ReadSettings", function readSettings() {
    return SettingsStore.has("settings") ? SettingsStore.get("settings") : {};
});

// store
expose("StoreSettings", function storeSettings(updatedSettings) {
    const prevSettings = SettingsStore.has("settings") ? SettingsStore.get("settings") : {};
    SettingsStore.set("settings", {...prevSettings, ...updatedSettings});
    return true
});
