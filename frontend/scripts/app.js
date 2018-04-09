import React from 'react';
import { render } from 'react-dom';

// Router
import { Router, hashHistory } from 'react-router';
import routes from './router';

// MUI
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import theme from './theme';

// State
import State from './state';
import { Provider } from 'mobx-react';
const state = new State();

export default () => {

	render((
		<Provider state={state}>
			<MuiThemeProvider muiTheme={theme}>
				<Router history={hashHistory} routes={routes}></Router>
			</MuiThemeProvider>
		</Provider>
		), document.querySelector('.main-container'));
}