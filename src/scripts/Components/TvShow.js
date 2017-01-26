import React from 'react';
import moment from 'moment';

class TvShow extends React.Component {
	constructor(props) {
		super(props);
		console.log(props);
	}

	getImage() {
		if(this.props && this.props.show && this.props.show.image && this.props.show.image.medium) {
			return this.props.show.image.medium;			
		}
		return '';
	}
	
	getAirDate() {
		if(this.props.hasAirTime === false) {
			return '';
		} else if(this.props && this.props.show && this.props.show.nextepisode && this.props.show.nextepisode.airstamp) {
			return moment(this.props.show.nextepisode.airstamp).fromNow(true);
		} else {
			return 'TBA';	
		}
	}
	
	render() {
		return (
			<div className="listing" onClick={this.props.onClick.bind(this, this.props.show)}>
				<span className="title">{this.props.show.name}</span>
				<span className="airdate">{this.getAirDate()}</span>
				<img src={this.getImage()} className="background" />
			</div>
		)
	}
}

export default TvShow;