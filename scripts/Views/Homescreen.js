import React from 'react';

// Components
import ShowList from '../Components/ShowList';
import Navigation from '../Components/Navigation';
import Button from 'material-ui/Button';
import ContentAdd from 'material-ui-icons/add';
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
				<ShowList onClick={() => {}} list={this.props.state.tvShows} highResolution={true} hasActionMenu={true} />
				<Button fab href="#add" className="add-button" secondary={true} style={addStyles}>
					<ContentAdd />
				</Button>
			</div>
		)
	}
}