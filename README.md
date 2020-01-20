# Sakura Wallet

[Sakura Wallet](http://www.dotpay.tech/) is a secure and user-friendly polkadot desktop wallet.

### Development

In the project directory, install the dependencies first:

```bash
yarn
```

Then you can run:

```bash
yarn start
# or
yarn start:win
```

Open another terminal run:

```bash
yarn dev
# or
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
