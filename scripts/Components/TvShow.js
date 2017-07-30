import React from 'react';
import {GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import MoreIcon from 'material-ui/svg-icons/navigation/more-vert';
import MenuItem from 'material-ui/MenuItem';
import IconMenu from 'material-ui/IconMenu';
import {inject} from 'mobx-react';


@inject("state")
class TvShow extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			image: this.getImage()
		};
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
	
	refresh(show) {
		this.props.state.refreshShow(show);
	}
	
	delete(show) {
		this.props.state.deleteShow(show.id);
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
		let subtitle = this.props.show.prettyAirDate;
		if(this.props.show.isRefreshing) {
			subtitle = "Refreshing...";
		}
		return (
			<GridTile
          title={this.props.show.name}
          subtitle={subtitle}
					onTouchTap={this.props.onClick.bind(this, this.props.show)}
					actionIcon={this.props.hasActionMenu ? actionMenu : <div />}
				>
          <img draggable="false" src={this.state.image} />
      </GridTile>
		)
	}
}

export default TvShow;