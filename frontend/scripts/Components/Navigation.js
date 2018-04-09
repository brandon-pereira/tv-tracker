import React from 'react';
import AppBar from 'material-ui/AppBar';
import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
import IconButton from 'material-ui/IconButton'
import FlatButton from 'material-ui/FlatButton'
import { hashHistory } from 'react-router';

export default class Navigation extends React.Component {
	
	onBackButtonClick() {
		hashHistory.push('/');
	}
	
	render() {
		const navStyle = {
			position: 'fixed',
			top: 0,
			left: 0,
			right: 0,
			zIndex: 1101
		};
		return (
			<div>
				<AppBar />
				<AppBar
					style={navStyle}
					title={this.props.title}
					showMenuIconButton={this.props.backButton === true}
					iconElementLeft={<IconButton><ArrowBack /></IconButton>}
					iconElementRight={<FlatButton label="Login" />}
					onLeftIconButtonClick={this.onBackButtonClick}
				/>
			</div>
		)
		
	}
}