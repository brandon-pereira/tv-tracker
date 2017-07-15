import React from 'react';
import AppBar from 'material-ui/AppBar';
import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
import IconButton from 'material-ui/IconButton'
import { hashHistory } from 'react-router';

export default class Navigation extends React.Component {
	
	onBackButtonClick() {
		hashHistory.push('/');
	}
	
	render() {
		return (
			<AppBar
				title={this.props.title}
				showMenuIconButton={this.props.backButton === true}
				iconElementLeft={<IconButton><ArrowBack /></IconButton>}
				onLeftIconButtonTouchTap={this.onBackButtonClick}
			/>
		)
		
	}
}