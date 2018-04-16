import React from 'react';
import TvShow from './TvShow';
import FirstTvShow from './FirstTvShow';
import {observer} from 'mobx-react';

import {GridList} from 'material-ui/GridList';

@observer
export default class ShowList extends React.Component {
	
	render() {
		let listItems = this.props.list.map((item) => {
			if(item.show) item = item.show;
			return <TvShow hasActionMenu={this.props.hasActionMenu === true} onClick={this.props.onClick} highResolution={this.props.highResolution === true} key={item.id} show={item} hasAirTime={this.props.hasAirTime}></TvShow>
		});
		if(!listItems.length && this.props.showPlaceholderShow) {
			listItems = new Array(<FirstTvShow router={this.props.router} key="add"></FirstTvShow>);
		}
		return (
			<GridList padding={2}>
				{listItems}
			</GridList>
		);
	}
}