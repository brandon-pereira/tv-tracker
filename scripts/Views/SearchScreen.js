import React from 'react';
import ShowList from '../Components/ShowList';
import Tracker from '../Services/Tracker';
import Navigation from '../Components/Navigation';
import { hashHistory } from 'react-router';
import TextField from 'material-ui/TextField';
import {observer, inject} from 'mobx-react';
import Snackbar from 'material-ui/Snackbar';

@inject("state") @observer
export default class SearchScreen extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			shows: [],
			error: {
				hasError: false,
				errorMsg: "An unexpected error occured. Please try again."
			}
		}
	}
	
	onInputChange(e) {
		var query = e.target.value;
		this.searchForShows(query);
	}
	
	onShowClick(show) {
		this.props.state.addShow(show).then(() => {
			hashHistory.push('/');
		}).catch((err) => {
			console.log(err);
			this.setState({error: {hasError: true}})
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
				<ShowList onClick={this.onShowClick.bind(this)} list={this.state.shows} hasAirTime={false}></ShowList>
				<Snackbar
					anchorOrigin="{{ vertical: 'bottom', horizontal: 'center' }}"
					open={this.state.error.hasError}
					message={<span id="message-id">An unexpected error occured. Please try again.</span>}
				/>
			</div>
		)
	}
}