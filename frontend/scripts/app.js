import ServiceWorker from './Services/ServiceWorker';
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

import('react-tap-event-plugin').then(injectTapEventPlugin => injectTapEventPlugin());
import graphql from './Services/GraphQL';

export default () => {
	const sw = new ServiceWorker();
	const notificationButton = document.querySelector('button')
	
	sw.subscribeToNotificationUpdates((status) => {
		if(status === 'UNKNOWN') {
			notificationButton.disabled = false;
			notificationButton.innerText = 'Subscribe';
		} else {
			notificationButton.disabled = true;
			notificationButton.innerText = status === 'ENABLED' ? 'Subscribed!' : 'Disabled'
		}
	})
	
	notificationButton.addEventListener('click', () => {
		sw.requestNotificationAccess('BMwwOEdtjKogQbm8_1_eYS2g9y2gIOkp59olsT-Q8MhBGvXj1IQYjYuGIWCTDatQQl4ax3NAh4x6lrwHDcT1fwA')
			.then(subscription => graphql.fetch(`
					mutation setPushSubscription($input: String!){
						setPushSubscription(pushSubscription: $input) {
							google_id
						}
					}`, {input: subscription}
				)
			)
			.catch((e) => {
				console.error(e);
			});
	});
	
	render((
		<Provider state={state}>
			<MuiThemeProvider muiTheme={theme}>
				<Router history={hashHistory} routes={routes}></Router>
			</MuiThemeProvider>
		</Provider>
		), document.querySelector('.main-container'));
	
}