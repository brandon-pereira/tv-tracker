import React from 'react';
import ActionBox from './ActionBox';
import { observer, inject } from 'mobx-react';
import ServiceWorker from '../Services/ServiceWorker';
import graphql from '../Services/GraphQL';

@inject("state") @observer
export default class NotificationsBox extends React.Component {

    onPrimaryClick() {
        ServiceWorker.requestNotificationAccess()
            .then(subscription => graphql.fetch(`
					mutation setPushSubscription($input: String!){
						setPushSubscription(pushSubscription: $input) {
							google_id
						}
					}`, { input: subscription }
            ))
            .catch((e) => {
                console.error(e);
            });
    }

    onSecondaryClick() {
        ServiceWorker.notificationStatus = 'DISABLED';
    }

    render() {
        return (
            <ActionBox 
                isVisible={this.props.state.notificationStatus === 'UNKNOWN'}
                title="Enable Notifications"
                subtitle="TvTracker now supports push notifications! Never miss your favorite shows by receiving push notifications when they air."
                primaryButtonText="Enable"
                secondaryButtonText="Not Now"
                onPrimaryClick={this.onPrimaryClick}
                onSecondaryClick={this.onSecondaryClick}
            />
        )
    }
}