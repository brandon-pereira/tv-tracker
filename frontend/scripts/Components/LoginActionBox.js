import React from 'react';
import ActionBox from './ActionBox';
import { observer, inject } from 'mobx-react';

@inject("state") @observer
export default class LoginActionBox extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isHidden: false
        }
    }

    onPrimaryClick() {
       window.location.href = 'auth/google';
    }

    onSecondaryClick() {
        this.setState({
            isHidden: true
        })
    }

    render() {
        return (
            <ActionBox
                isVisible={!this.props.state.isLoggedIn && !this.state.isHidden}
                title="Login"
                subtitle="Let TvTracker sync all your devices and provide push notifications when shows air!"
                primaryButtonText="Login"
                secondaryButtonText="Not Now"
                onPrimaryClick={this.onPrimaryClick.bind(this)}
                onSecondaryClick={this.onSecondaryClick.bind(this)}
            />
        )
    }
}