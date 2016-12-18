function addShow(show) {
	var currentShows = JSON.parse(localStorage.getItem('shows')) || [];
	currentShows.push(show);
	localStorage.setItem('shows', JSON.stringify(uniq(currentShows)));
}

function getShows() {
	return JSON.parse(localStorage.getItem('shows'));
}

function uniq(a) {
	console.log(a.length);
	var b =  Array.from(new Set(a));;
	console.log(b.length);
	return b;
}

export default {addShow, getShows};