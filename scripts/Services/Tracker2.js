const EZTV = require('eztv-api-pt');
const WebTorrent = require('webtorrent')

class TrackerService {
	
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
	
	_lookupShowByTitle(title) {
		return this.shows.then(shows => shows.filter(entry => entry.show === title)[0]);
	}
	
	_getShowData(show) {
		return this.eztv.getShowData(show);
	}

	_downloadShow(magnetUrl) {
		this.torrent.add(magnetUrl, {
			path: this.options.downloadLocation
		}, (torrent) => {
			torrent.on('ready', () => {
				console.log('Client is downloading:', torrent.infoHash, torrent.path)
			});

			torrent.on('download', function () {
				console.log('total downloaded: ' + torrent.downloaded);
				console.log('download speed: ' + torrent.downloadSpeed)
				console.log('progress: ' + torrent.progress)
			});
			
			torrent.on('done', function(){
				console.log('torrent finished downloading');
			});
		})
	}

}

const instance = new TrackerService();
module.exports = instance;