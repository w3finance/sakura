// Modules to control application life and create native browser window
const {app, BrowserWindow, ipcMain, clipboard} = require('electron');
const path = require('path');
const url = require('url');
const isDev = require('electron-is-dev');
const Store = require('electron-store');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

function createWindow() {
    const startUrl = isDev ? 'http://localhost:3000' : url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:',
        slashes: true,
    });

    // Create the browser window.
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        minWidth: 800,
        minHeight: 600,
        resizable: false,
        title: "Sakura Wallet",
        titleBarStyle: process.platform === 'darwin' ? 'hidden' : 'default',
        icon: path.join(__dirname, 'icon.png'),
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: true
        }
    });

    // and load the index.html of the app.
    mainWindow.loadURL(startUrl);

    mainWindow.removeMenu();

    // Open the DevTools.
    process.env.NODE_ENV === 'development' && mainWindow.webContents.openDevTools();

    // Emitted when the window is closed.
    mainWindow.on('closed', function () {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null
    })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', function () {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') app.quit()
});

app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) createWindow()
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

// https://medium.com/@johndyer24/building-a-production-electron-create-react-app-application-with-shared-code-using-electron-builder-c1f70f0e2649
function expose(
    messageType,
    handler
) {
    ipcMain.on(messageType, async (event, ...args) => {
        try {
            const result = await handler(...args);
            event.sender.send(messageType, {result});
        } catch (error) {
            event.sender.send(messageType, {
                error: {name: error.name || "Error", message: error.message, stack: error.stack},
            })
        }
    })
}

////////// User Settings //////////
const SettingsStore = new Store({
    name: "Settings",
});

expose("ReadSettings", function readSettings() {
    return SettingsStore.has("settings") ? SettingsStore.get("settings") : {};
});

expose("StoreSettings", function storeSettings(updatedSettings) {
    const prevSettings = SettingsStore.has("settings") ? SettingsStore.get("settings") : {};
    SettingsStore.set("settings", {...prevSettings, ...updatedSettings});
    return true
});

////////// App API //////////
expose("AppVersion", function readSettings() {
    return app.getVersion();
});

expose("CopyToClipboard", function copyToClipboard(text) {
    clipboard.writeText(text);
    return true
});

////////// Accounts Store //////////
const AccountsStore = new Store({
    name: "Accounts",
});

expose("ReadAccount", function readAccount() {
    return AccountsStore.has("keys") ? AccountsStore.get("keys") : {};
});

expose("StoreAccount", function storeAccount(accountData) {
    const prevAccounts = AccountsStore.has("keys") ? AccountsStore.get("keys") : {};
    AccountsStore.set("keys", {...prevAccounts, ...accountData});
    return true
});
