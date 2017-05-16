const  tracker = require('./scripts/services/tracker2');

tracker.getShowByTitle("Mr. Robot").then((show) => {
	const episode = show.episodes['1']['2'];
	const magnetUrl = episode['720p'].url;
	console.log(episode);
	console.log(magnetUrl);
	tracker._downloadShow(episode['480p'].url);

}).catch((e) => {
	console.log(e);
})