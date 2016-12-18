import React from 'react';
import Tracker from "../Services/Tracker";
import TvShow from './TvShow';

export default class ShowList extends React.Component {
	constructor(props) {
		super(props);
	}

	
	render() {
		const listItems = this.props.list.map((item) => {
			if(item.show) item = item.show;
			return <TvShow onClick={this.props.onClick} key={item.id} show={item}></TvShow>
		});
		return (
			<div className="listings-container">
				{listItems}
			</div>
		);
	}
}