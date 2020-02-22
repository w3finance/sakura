# Sakura Wallet

[Sakura Wallet](https://www.dotpay.tech/) is a secure and user-friendly Polkadot desktop wallet.

### Development

Clone first, in the project directory, install the dependencies:

```bash
yarn
```

Then you can run:

```bash
yarn start
# in windows
yarn start:win
```

Open another terminal run:

```bash
yarn dev
# in windows
yarn dev:win
```

You will see the app in development mode with electron.

### DevTools

Toggle DevTools:

* OSX: <kbd>Cmd</kbd> <kbd>Alt</kbd> <kbd>I</kbd> or <kbd>F12</kbd>
* Linux: <kbd>Ctrl</kbd> <kbd>Shift</kbd> <kbd>I</kbd> or <kbd>F12</kbd>
* Windows: <kbd>Ctrl</kbd> <kbd>Shift</kbd> <kbd>I</kbd> or <kbd>F12</kbd>

### Production build.

Create a package for OSX, Windows and Linux

```bash
yarn dist
# or
yarn dist:win
# or
yarn dist:linux
```

### License
GPL v3
