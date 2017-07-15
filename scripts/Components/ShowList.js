import React from 'react';
import TvShow from './TvShow';
import {observer} from 'mobx-react';

import Grid from 'material-ui/Grid';
@observer
export default class ShowList extends React.Component {
	
	render() {
		const listItems = this.props.list.map((item) => {
			if(item.show) item = item.show;
			return <TvShow hasActionMenu={this.props.hasActionMenu === true} onClick={this.props.onClick} highResolution={this.props.highResolution === true} key={item.id} show={item} hasAirTime={this.props.hasAirTime}></TvShow>
		});
		return (
			<Grid padding={2}>
				{listItems}
			</Grid>
		);
	}
}