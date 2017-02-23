import React from 'react';
import { render } from 'react-dom';
import { Router, hashHistory } from 'react-router';
import routes from './Router/Router';
import register from './Services/ServiceWorker';

// MUI
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import theme from './theme';

// Touch Events
import('react-tap-event-plugin').then(injectTapEventPlugin => injectTapEventPlugin());

render((
	<MuiThemeProvider muiTheme={theme}>
  	<Router history={hashHistory} routes={routes}></Router>
	</MuiThemeProvider>
), document.getElementById('root'));