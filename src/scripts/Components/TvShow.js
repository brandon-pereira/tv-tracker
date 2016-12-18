import React from 'react';

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
	
	render() {
		return (
			<div className="listing" onClick={this.props.onClick.bind(this, this.props.show)}>
				<span className="title">{this.props.show.name}</span>
				<img src={this.getImage()} className="background" />
			</div>
		)
	}
}

export default TvShow;