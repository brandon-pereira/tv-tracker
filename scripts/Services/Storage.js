import uniqBy from 'lodash/uniqBy';

function addShow(show) {
	var currentShows = getShows();
	currentShows.push(show);
	setShows(sortShows(currentShows));
}

function getShows() {
	return JSON.parse(localStorage.getItem('shows')) || [];
}

function setShows(shows) {
	localStorage.setItem('shows', JSON.stringify(uniqBy(shows, 'id')));
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