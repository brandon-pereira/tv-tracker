const  tracker = require('./src/scripts/services/tracker');

tracker.getShowByTitle("Mr. Robot").then((show) => {
	const episode = show.episodes['1']['2'];
	const magnetUrl = episode['720p'].url;
	tracker._downloadShow(magnetUrl);

}).catch((e) => {
	console.log(e);
})