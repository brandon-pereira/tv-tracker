// import React from 'react';
// import { render } from 'react-dom';

// // Router
// import { Router, hashHistory } from 'react-router';
// import routes from './router';

// // MUI
// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// import theme from './theme';

// // State
// import State from './state';
// import { Provider } from 'mobx-react';
// const state = new State();

import * as sw from './Services/ServiceWorker';

console.log(sw);
sw.default();

document.querySelector('button').addEventListener('click', () => {
  sw.subscribe();
})

// // Touch Events
// import('react-tap-event-plugin').then(injectTapEventPlugin => injectTapEventPlugin());

// render((
//   <div></div>
//   // <Provider state={state}>
//   //   <MuiThemeProvider muiTheme={theme}>
//   //     <Router history={hashHistory} routes={routes}></Router>
//   //   </MuiThemeProvider>
//   // </Provider>
// ), document.getElementById('root'));