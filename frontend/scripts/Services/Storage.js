import graphql from './GraphQL';

function addShow(show) {
	graphql.fetch(`
		mutation _($input: String!){
			addTVShow(id: $input) {
				name
			}
		}`, { input: show.id }
	).then((d) => console.log(d))
	var currentShows = getShows();
	currentShows.push(show);
	return setShows(sortShows(currentShows));
}

function getShows() {
	const shows = JSON.parse(localStorage.getItem('shows')) || [];
	return uniq(shows);
}

function setShows(shows) {
	shows = sortShows(uniq(shows));
	localStorage.setItem('shows', JSON.stringify(shows));
	return shows;
}

function uniq(shows) {
	const validIds = [];
	return shows.filter((show) => {
		if(validIds.indexOf(show.id) !== -1) {
			return false;
		}
		validIds.push(show.id);
		return true;
	});
}

function sortShows(unsortedShows) {
	const TBA_DATE = new Date("01/01/3000");
	return unsortedShows.sort(function(a, b) {
    a = a.nextepisode ? new Date(a.nextepisode.airstamp) : TBA_DATE;
    b = b.nextepisode ? new Date(b.nextepisode.airstamp) : TBA_DATE;
    return a - b;
	});
}

export default {addShow, setShows, getShows};