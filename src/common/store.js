// https://github.com/electron/electron/issues/9920
const Store = window.require('electron-store');

const AppStore = new Store({
    name: "Setting",
});

function setSetting(params) {
    const prevSettings = AppStore.has("settings") ? AppStore.get("settings") : {};
    AppStore.set("settings", {...prevSettings, ...params});
    return true
}

function getSetting() {
    return AppStore.has('setting') ? AppStore.get("setting") : {};
}

export {setSetting, getSetting}