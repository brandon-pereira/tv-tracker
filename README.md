# TV Tracker

TV Tracker is a web application for tracking and notiying users when their favourite shows air. It also has the ability to run from your menu/task bar on Mac/Windows!

## Running Locally

### Running as a web app (recommended)

```bash
npm install
npm start
```

### Run as an application

```bash
npm run build
npm run run
```

## Technical Features

I built this project (like all other projects) to learn some new stuff. This project utilizes serval new tools including:

- [Webpack](https://webpack.js.org/)
  - Code Splitting
  - ES6 Modules
  - ES6 Transpiler
- [Service Workers](https://developers.google.com/web/fundamentals/getting-started/primers/service-workers)
  - Offline support
  - PWA
  - Push Notifications
- [Electron](http://electron.atom.io/)
  - Run from menu bar
- [React](https://facebook.github.io/react/)
  - [MobX](https://github.com/mobxjs/mobx)
  - [material-ui](http://www.material-ui.com/#/)
- [Express](https://expressjs.com/)
- [GraphQL](http://graphql.org/learn/)

## Future Ideas

For rainy days...

- WebTorrent to download shows
- Google Chromecast support