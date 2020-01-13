// https://github.com/electron/electron/issues/9920
// const Store = require('electron-store');
//
// const AppStore = new Store({
//     name: "Setting",
// });

if (window.electron) {
    console.log('window.electron');
} else {
    console.log('No electron');
}

function setSetting(params) {
    // const prevSettings = AppStore.has("settings") ? AppStore.get("settings") : {};
    // AppStore.set("settings", {...prevSettings, ...params});
    return true
}

function getSetting() {
    // return AppStore.has('setting') ? AppStore.get("setting") : {};
}

export {setSetting, getSetting}