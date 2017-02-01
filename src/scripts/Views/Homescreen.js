import React from 'react';
import ShowList from '../Components/ShowList';
import Navigation from '../Components/Navigation';
import Storage from '../Services/Storage';

export default class HomeScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = { // the one truth
			shows: Storage.getShows() || []
		}; 
		console.log("HomeScreen: TV Shows", this.state);
	}
	
	render() {
	 return (
		 <div className="homescreen-container">
	 			<Navigation title="TV Tracker" addButton={true} />
				<ShowList onClick={() => {}} list={this.state.shows}></ShowList>

		 </div>
	 )
	}
}