import React from 'react';
import TvShow from './TvShow';
import {observer} from 'mobx-react';

import {GridList} from 'material-ui/GridList';

@observer
export default class ShowList extends React.Component {
	
	render() {
		const listItems = this.props.list.map((item) => {
			if(item.show) item = item.show;
			return <TvShow hasActionMenu={this.props.hasActionMenu === true} onClick={this.props.onClick} highResolution={this.props.highResolution === true} key={item.id} show={item} hasAirTime={this.props.hasAirTime}></TvShow>
		});
		return (
			<GridList padding={2}>
				{listItems}
			</GridList>
		);
	}
}