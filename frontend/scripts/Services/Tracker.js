class TrackerService {
	
	async getByName(name) {
		const data = await fetch("https://api.tvmaze.com/search/shows?q=" + name)
		return await data.json();
	}
	
	async getShowById(id) {
		const data = await fetch("https://api.tvmaze.com/shows/" + id)
		return await data.json();
	}
	
	getShowDetails(show) {
		return this.getNextAirDate(show)
			.then(nextepisode => {
				show.nextepisode = nextepisode;
				return show;
			})
			.catch(() => show);
	}
	
	getNextAirDate(show) {
		if(show && show._links && show._links.nextepisode && show._links.nextepisode.href) {
			const url = show._links.nextepisode.href.replace('http', 'https');
			return fetch(url)
				.then(resp => resp.json())
		} else {
			return Promise.reject();
		}
	}
}

export default new TrackerService();