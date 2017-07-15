import React from 'react';
import {GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import MoreIcon from 'material-ui/svg-icons/navigation/more-vert';
import MenuItem from 'material-ui/MenuItem';
import IconMenu from 'material-ui/IconMenu';
import Storage from '../Services/Storage';

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

	/**
	 * Function to return an image. Returns low-resolution by default, but if 'highResolution'
	 * is passed in will render high res. Will return empty string if contains invalid json.
	 */
	getImage() {
		if(this.props && this.props.show && this.props.show.image && this.props.show.image.medium) {
			if(this.props.highResolution && this.props.show.image.original) {
				return this.props.show.image.original;
			}
			if(this.props.show.image.medium) {
				return this.props.show.image.medium;
			}
		}
		return '';
	}
	
	getAirDate() {
		if(this.props.hasAirTime === false) {
			this.setState({airDate: ''});
		} else if(this.props && this.props.show && this.props.show.nextepisode && this.props.show.nextepisode.airstamp) {
			import('moment').then(moment => {
				this.setState({airDate: moment(this.props.show.nextepisode.airstamp).fromNow()})
			});
		} else {
			this.setState({airDate: 'TBA'});
		}
	}
	
	refresh() {
		console.log("Refresh");
	}
	
	delete(show) {
		console.log("Delete");
		Storage.deleteShow(show.id);
	}
	
	render() {
		const actionMenu = (
			<IconMenu
				iconButtonElement={<IconButton><MoreIcon color="white" /></IconButton>}
				anchorOrigin={{horizontal: 'right', vertical: 'top'}}
				targetOrigin={{horizontal: 'right', vertical: 'top'}}>
				<MenuItem primaryText="Refresh" onTouchTap={this.refresh.bind(this, this.props.show)} />
				<MenuItem primaryText="Delete" onTouchTap={this.delete.bind(this, this.props.show)} />
			</IconMenu>
		)
		return (
			<GridTile
          title={this.props.show.name}
          subtitle={this.state.airDate}
					onTouchTap={this.props.onClick.bind(this, this.props.show)}
					actionIcon={this.props.hasActionMenu ? actionMenu : <div />}
				>
          <img draggable="false" src={this.state.image} />
      </GridTile>
		)
	}
}

export default TvShow;