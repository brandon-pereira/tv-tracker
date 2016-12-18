import $http from './Fetch';

class TrackerService {
	constructor() {
		console.log("Initialized");
	}
	
	getByName(name) {
		console.log("search by name", name);
		return new Promise(function(resolve, reject) {
			$http.json("http://api.tvmaze.com/search/shows?q=" + name)
				.then(function(resp) {
					resolve(resp);
				});
		});
	}
}

let instance = new TrackerService();
export default instance;