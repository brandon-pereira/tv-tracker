class TrackerService {
	
	async getByName(name) {
		const data = await fetch("https://api.tvmaze.com/search/shows?q=" + name)
		return await data.json();
	}
	
	async getShowById(id) {
		const data = await fetch("https://api.tvmaze.com/shows/" + id)
		return await data.json();
	}
	
	async getShowDetails(show) {
		try {
			const nextepisode = await this.getNextAirDate(show)
			show.nextepisode = nextepisode;
			return show;
		} catch(e) {
			return show;
		}
	}
	
	async getNextAirDate(show) {
		if(show && show._links && show._links.nextepisode && show._links.nextepisode.href) {
			const url = show._links.nextepisode.href.replace('http', 'https');
			const data = await fetch(url)
			return await data.json();
		} else {
			throw new Error("No next episode");
		}
	}
}

export default new TrackerService();