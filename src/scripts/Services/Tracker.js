import $http from './Fetch';

class TrackerService {
	constructor() {
		console.info("Initialized");
	}
	
	getByName(name) {
		console.info("search by name", name);
		return new Promise((resolve, reject) => {
			$http.json("http://api.tvmaze.com/search/shows?q=" + name)
				.then((resp) => {
					resolve(resp);
				});
		});
	}
	
	getShowDetails(show) {
		console.info("Get show details", show);
		return new Promise((resolve, reject) => {
			this.getNextAirDate(show).then((nextepisode) => {
				show.nextepisode = nextepisode;
				resolve(show);
			}).catch(() => reject(show));
		});
	}
	
	getNextAirDate(show) {
		console.info("get next air date", show);
		return new Promise((resolve, reject) => {
			if(show && show._links && show._links.nextepisode && show._links.nextepisode.href) {
				$http.json(show._links.nextepisode.href).then((resp) => {
					console.log("next episode", resp);
					resolve(resp);
				});
			} else {
				reject();
			}
		});
	}
}

let instance = new TrackerService();
export default instance;