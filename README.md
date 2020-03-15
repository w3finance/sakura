# Sakura Wallet

[Sakura Wallet](https://www.dotpay.tech/) is a Desktop wallet for the Polkadot ecosystem.
<p align="left">
  <a href="https://github.com/dotpaytech/sakura/releases">
    <img alt="MacOS" src="https://badgen.net/badge/icon/MacOS" />
  </a>
  <a href="https://github.com/dotpaytech/sakura/releases">
    <img alt="Windows" src="https://badgen.net/badge/icon/Windows" />
  </a>
  <a href="https://github.com/dotpaytech/sakura/releases">
    <img alt="Linux" src="https://badgen.net/badge/icon/Linux" />
  </a>
  </a>
</p>

### Development

To clone and run this repo you'll need [Node.js](https://nodejs.org/en/) and [Yarn](https://yarnpkg.com/) installed on your computer.

```bash
git clone https://github.com/dotpaytech/sakura.git
cd sakura
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

Create a package for OSX, Windows and Linux.

```bash
yarn dist
# or
yarn dist:win
# or
yarn dist:linux
```

### License
GPL v3.
