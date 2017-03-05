import React from 'react';

// Components
import ShowList from '../Components/ShowList';
import Navigation from '../Components/Navigation';
import Storage from '../Services/Storage';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

export default class HomeScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = { // the one truth
			shows: Storage.getShows() || []
		}; 
		console.log("HomeScreen: TV Shows", this.state);
	}
	
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
					<ShowList onClick={() => {}} list={this.state.shows} highResolution={true} hasActionMenu={true} />		
				<FloatingActionButton href="#add" className="add-button" secondary={true} style={addStyles}>
					<ContentAdd />
			 	</FloatingActionButton>
		 </div>
		)
	}
}