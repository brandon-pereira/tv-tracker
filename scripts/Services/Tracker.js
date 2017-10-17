import $http from './Fetch';

class TrackerService {
	constructor() {
		console.info("Initialized");
	}
	
	getByName(name) {
		console.info("search by name", name);
		return new Promise((resolve) => {
			$http.json("https://api.tvmaze.com/search/shows?q=" + name)
				.then((resp) => {
					resolve(resp);
				});
		});
	}
	
	getShowById(id) {
		console.info("search by id", id);
		return new Promise((resolve, reject) => {
			$http.json("https://api.tvmaze.com/shows/" + id)
				.then((resp) => {
					resolve(resp);
				})
				.catch((err) => reject(err));
		});
	}
	
	getShowDetails(show) {
		console.info("Get show details", show);
		return new Promise((resolve) => {
			this.getNextAirDate(show).then((nextepisode) => {
				show.nextepisode = nextepisode;
				resolve(show);
			}).catch(() => resolve(show));
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

const instance = new TrackerService();
export default instance;