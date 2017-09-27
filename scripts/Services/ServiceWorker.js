export default () => {
	if (navigator.serviceWorker) {
		console.log("ServiceWorkers are supported");
		navigator.serviceWorker.register('service-worker.js', {
			scope: './'
		})
		.then(function(reg) {
			console.log("ServiceWorker registered", reg);
		})
		.catch(function(error) {
			console.log("Failed to register ServiceWorker", error);
		});
	}
};