import React from 'react';

// Components
import ShowList from '../Components/ShowList';
import Navigation from '../Components/Navigation';
import NotificationsBox from '../Components/NotificationsActionBox';
import LoginBox from '../Components/LoginActionBox';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import {observer, inject} from 'mobx-react';

@inject("state") @observer
export default class HomeScreen extends React.Component {
	
	render() {
		const addStyles = {
			margin: '0',
			right: '24px',
			bottom: '24px',
			position: 'fixed'
		};
		return (
			<div>
				<Navigation title="TV Tracker" />
				<NotificationsBox></NotificationsBox>
				<LoginBox></LoginBox>
				<ShowList onClick={() => {}} list={this.props.state.tvShows} highResolution={true} hasActionMenu={true} />
				<FloatingActionButton href="#add" className="add-button" secondary={true} style={addStyles}>
					<ContentAdd />
				</FloatingActionButton>
			</div>
		)
	}
}