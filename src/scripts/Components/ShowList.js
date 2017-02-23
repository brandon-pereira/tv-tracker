import React from 'react';
import Tracker from "../Services/Tracker";
import TvShow from './TvShow';

import {GridList} from 'material-ui/GridList';

export default class ShowList extends React.Component {
	constructor(props) {
		super(props);
	}

	
	render() {
		const listItems = this.props.list.map((item) => {
			if(item.show) item = item.show;
			return <TvShow onClick={this.props.onClick} highResolution={this.props.highResolution === true} key={item.id} show={item} hasAirTime={this.props.hasAirTime}></TvShow>
		});
		return (
			<GridList padding={2}>
			 {listItems}
		 </GridList>
		);
	}
}