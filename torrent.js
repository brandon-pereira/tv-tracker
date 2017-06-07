const eztv = require('./scripts/services/eztv');

eztv.getShowByTitle("Mr. Robot")
	.then((show) => eztv.getEpisodeFromShow(show, 1, 2))
	.then((episode) => {
		const magnetUrl = episode['720p'].url;
		console.log("found show.. preparing to download");
		tracker._downloadShow(episode['480p'].url);

}).catch((e) => {
	console.log(e);
})