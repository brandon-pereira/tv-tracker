import React from 'react';

export default class Navigation extends React.Component {
	constructor(props) {
		super(props);
	}
	
	render() {
		return (
			<nav className="global-navigation">
				{!this.props.addButton && <a className="back-button button" href="#/">Back</a>}
				<h1 className="heading-first">{this.props.title}</h1>
				{this.props.addButton && <a className="add-button button" href="#/add">Add New</a>}
			</nav>
		)
		
	}
}