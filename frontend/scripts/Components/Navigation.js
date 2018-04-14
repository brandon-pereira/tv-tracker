import React from 'react';
import AppBar from 'material-ui/AppBar';
import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
import IconButton from 'material-ui/IconButton'
import FlatButton from 'material-ui/FlatButton'
import { hashHistory } from 'react-router';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import { observer, inject } from 'mobx-react';

@inject("state") @observer
export default class Navigation extends React.Component {
	
	onBackButtonClick() {
		hashHistory.push('/');
	}

	loginClick() {
		window.location = '/auth/google';
	}

	logoutClick() {
		window.location = '/auth/logout';
	}

	refreshShowsClick() {
		this.props.state.refreshShows();
	}
	
	render() {
		const navStyle = {
			position: 'fixed',
			top: 0,
			left: 0,
			right: 0,
			zIndex: 1101
		};
		const LoggedIn = props => <IconMenu color="white" {...props} iconButtonElement={<IconButton>
            <MoreVertIcon color="white" />
          </IconButton>} targetOrigin={{ horizontal: "right", vertical: "top" }} anchorOrigin={{ horizontal: "right", vertical: "top" }}>
        <MenuItem onClick={() => this.refreshShowsClick()} primaryText="Refresh" />
        <MenuItem onClick={() => this.logoutClick()} primaryText="Sign out" />
      </IconMenu>;

		return (
			<div>
				<AppBar />
				<AppBar
					style={navStyle}
					title={this.props.title}
					showMenuIconButton={this.props.backButton === true}
					iconElementLeft={<IconButton><ArrowBack /></IconButton>}
					iconElementRight={this.props.state.isLoggedIn ? <LoggedIn /> : <FlatButton onClick={() => this.loginClick()} label="Login" />}
					onLeftIconButtonClick={this.onBackButtonClick}
				/>
			</div>
		)
		
	}
}