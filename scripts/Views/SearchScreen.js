import React from 'react';
import ShowList from '../Components/ShowList';
import Tracker from '../Services/Tracker';
import Storage from '../Services/Storage';
import Navigation from '../Components/Navigation';
import { hashHistory } from 'react-router';
import TextField from 'material-ui/TextField';

export default class SearchScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = { // the one truth
			shows: []
		};
	}
	
	onInputChange(e) {
		var query = e.target.value;
		this.searchForShows(query);
	}
	
	onShowClick(show) {
		Tracker.getShowDetails(show).then((show) => {
			Storage.addShow(show);
			hashHistory.push('/');
		}).catch((show) => {
			Storage.addShow(show);
			hashHistory.push('/');
		});
	}
	
	searchForShows(query) {
		Tracker.getByName(query).then((shows) => {
			this.setState({shows});
		});
	}
	
	render() {
		const divStyle = {
			width: '100%',
			background: '#fff'
		};
		const lineStyle = {
			bottom: 0
		};
		const inputStyle = {
			padding: '0 24px'
		};
		return (
			<div className="addscreen-container">
				<Navigation title="Add Show" backButton={true} />
				<TextField style={divStyle} underlineStyle={lineStyle} hintStyle={inputStyle} inputStyle={inputStyle} hintText="Search..." onChange={this.onInputChange.bind(this)} />
				<ShowList onClick={this.onShowClick} list={this.state.shows} hasAirTime={false}></ShowList>
			</div>
		)
	}
}