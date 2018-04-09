import graphql from './GraphQL';

class Storage {

	constructor() {
		this.tvShows = [];
		this.isLoggedIn = false;
		this.init();
	}

	async init() {
		let user = {};
		try {
			user = await graphql.query(`
				User {
					firstName,
					TvShows {
						id
					}
				}`
			);
		} catch(err) {
			this.isLoggedIn = false;
			this.tvShows = this._getLocalStorageShows();
			this.currentUser = {};
			return;
		}

		this.isLoggedIn = true;
		this.tvShows = this._resolveConflicts(user.TvShows, this._getLocalStorageShows());
	}

	async addShow(show) {
		// Add to localstorage
		const currentShows = this._getLocalStorageShows();
		currentShows.push(show);
		// Add to server
		if(this.isLoggedIn) {
			await graphql.fetch(`
				mutation _($input: String!){
					addTVShow(id: $input) {
						name
					}
				}`, { input: show.id }
			);
		}
		// Return localstorage cache
		return this._setLocalStorageShows(this.sortShows(currentShows));
	}

	getShows() {
		return this._getLocalStorageShows();
	}

	setShows(shows) {
		return this._setLocalStorageShows(shows);
	}

	_resolveConflicts(remote) {
		// TODO: Resolve conflicts
		return remote;
	}

	_getLocalStorageShows() {
		const shows = JSON.parse(localStorage.getItem('shows')) || [];
		return this._uniq(shows);
	}

	_setLocalStorageShows(shows) {
		shows = this.sortShows(this._uniq(shows));
		localStorage.setItem('shows', JSON.stringify(shows));
		return shows;
	}

	_uniq(shows) {
		const validIds = [];
		return shows.filter((show) => {
			if (validIds.indexOf(show.id) !== -1) {
				return false;
			}
			validIds.push(show.id);
			return true;
		});
	}

	sortShows(unsortedShows) {
		const TBA_DATE = new Date("01/01/3000");
		return unsortedShows.sort(function (a, b) {
			a = a.nextepisode ? new Date(a.nextepisode.airstamp) : TBA_DATE;
			b = b.nextepisode ? new Date(b.nextepisode.airstamp) : TBA_DATE;
			return a - b;
		});
	}

}

export default new Storage();