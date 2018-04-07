import React from 'react';
import { observer, inject } from 'mobx-react';
import { Card, CardActions, CardHeader } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import ServiceWorker from '../Services/ServiceWorker';
import graphql from '../Services/GraphQL';

@inject("state") @observer
export default class NotificationsBox extends React.Component {

    onEnableClick() {
        // TODO: Move VAPID Public key to process.env
        ServiceWorker.requestNotificationAccess('BMwwOEdtjKogQbm8_1_eYS2g9y2gIOkp59olsT-Q8MhBGvXj1IQYjYuGIWCTDatQQl4ax3NAh4x6lrwHDcT1fwA')
            .then(subscription => graphql.fetch(`
					mutation setPushSubscription($input: String!){
						setPushSubscription(pushSubscription: $input) {
							google_id
						}
					}`, { input: subscription }
            ))
            .then(() => {
                // this.props.state.notifi÷
            })
            .catch((e) => {
                console.error(e);
            });
    }

    onDisableClick() {
        ServiceWorker.notificationStatus = 'DISABLED';
    }

    render() {
        const styles = {
            display: this.props.state.notificationStatus === 'UNKNOWN' ? 'block' : 'none',
            boxShadow: '0 1px 2px rgba(0,0,0,.5)',
            background: '#eee',
            position: 'relative'
        };
        return (
            // <div>
            //     Currently: {this.props.state.notificationStatus}
            // </div>
            <Card style={styles}>
                <CardHeader
                    title="Enable Notifications"
                    subtitle="TvTracker now supports push notifications! Never miss your favorite shows by receiving push notifications when they air."
                />
                <CardActions>
                    <RaisedButton label="Enable" primary={true} onClick={this.onEnableClick} />
                    <FlatButton label="Not Now" onClick={this.onDisableClick} />
                </CardActions>
            </Card>
        )
    }
}