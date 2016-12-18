import uniqBy from '../Helpers/UniqBy';

function addShow(show) {
	var currentShows = JSON.parse(localStorage.getItem('shows')) || [];
	currentShows.push(show);
	localStorage.setItem('shows', JSON.stringify(uniqBy(currentShows, 'id')));
}

function getShows() {
	return JSON.parse(localStorage.getItem('shows'));
}

export default {addShow, getShows};