const EZTV = require('eztv-api-pt');

class EZTVService {
	
	constructor() {
		this.eztv = new EZTV({}); // eztv lookup service
		this.torrent = new WebTorrent();
		this.options = {
			fileQuality: '720p', // or 480p
			downloadLocation: './downloads'
		}
		this.shows = this.eztv.getAllShows().catch(e => console.log(e)); // cached response of shows
	}
	
	getShowByTitle(title) {
		return this._lookupShowByTitle(title)
			.then((show) => this._getShowData(show))
	}
	
	getEpisodeFromShow(show, season, episode) {
		if(show.hasOwnProperty('episodes')) {
			return this.getEpisodeFromShow(show.episodes, season, episode);
		}
		if(show.hasOwnProperty(season.toString()) && show[season.toString()].hasOwnProperty(episode.toString())) {
			return show[season][episode];
		}
		console.log(`Show doesn't have a season ${season} episode ${episode}`);
		return null;
	}
	
	_lookupShowByTitle(title) {
		return this.shows.then(shows => {
			return shows.filter(entry => entry.show === title)[0];
		});
	}
	
	_getShowData(show) {
		return this.eztv.getShowData(show);
	}

	_downloadShow(magnetUrl) {
		this.torrent.add(magnetUrl, {
			// path: this.options.downloadLocation
		}, (torrent) => {
			torrent.on('ready', () => {
				console.log('Client is downloading:', torrent.infoHash, torrent.path)
			});

			torrent.on('download', function (bytes) {
				console.log('total downloaded: ' + torrent.downloaded);
				console.log('download speed: ' + torrent.downloadSpeed)
				console.log('progress: ' + torrent.progress)
			});
			
			torrent.on('done', function(){
				console.log('torrent finished downloading');
				process.exit(0);
			});
		})
	}

}

let instance = new EZTVService();
module.exports = instance;