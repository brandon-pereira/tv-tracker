import React from 'react';

class TvShow extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			image: this.getImage(),
			airDate: 'Loading...'
		};
	}
	
	componentDidMount() {
		this.getAirDate();
	}

	getImage() {
		if(this.props && this.props.show && this.props.show.image && this.props.show.image.medium) {
			return this.props.show.image.medium;			
		}
		return '';
	}
	
	getAirDate() {
		if(this.props.hasAirTime === false) {
			this.setState({airDate: ''});
		} else if(this.props && this.props.show && this.props.show.nextepisode && this.props.show.nextepisode.airstamp) {
			require.ensure(['moment'], (require) => {
	    	var m = require('moment');
				this.setState({airDate: m(this.props.show.nextepisode.airstamp).fromNow(true)})
			});

		} else {
			this.setState({airDate: 'TBA'});
		}
	}
	
	render() {
		return (
			<div className="listing" onClick={this.props.onClick.bind(this, this.props.show)}>
				<span className="title">{this.props.show.name}</span>
				<span className="airdate">{this.state.airDate}</span>
				<img src={this.state.image} className="background" />
			</div>
		)
	}
}

export default TvShow;