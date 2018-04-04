import graphql from './GraphQL';

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
function urlBase64ToUint8Array(base64String) {
	const padding = '='.repeat((4 - base64String.length % 4) % 4);
	const base64 = (base64String + padding)
		.replace(/\-/g, '+')
		.replace(/_/g, '/');

	const rawData = window.atob(base64);
	const outputArray = new Uint8Array(rawData.length);

	for (let i = 0; i < rawData.length; ++i) {
		outputArray[i] = rawData.charCodeAt(i);
	}
	return outputArray;
}

export function subscribe () {
	// 	.then((reg) => Notification.requestPermission().then(r => {
	// 	console.log(r);
	// 	return Promise.all([reg, r]);
	// }).catch(err => console.error(err)))
	navigator.serviceWorker.ready.then(function (serviceWorkerRegistration) {
		const subscribeOptions = {
			userVisibleOnly: true,
			applicationServerKey: urlBase64ToUint8Array('BMwwOEdtjKogQbm8_1_eYS2g9y2gIOkp59olsT-Q8MhBGvXj1IQYjYuGIWCTDatQQl4ax3NAh4x6lrwHDcT1fwA')
		};
		serviceWorkerRegistration.pushManager.subscribe(subscribeOptions)
			.then(function (subscription) {
				graphql.fetch(`
					mutation setPushSubscription($input: String!){
						setPushSubscription(pushSubscription: $input) {
							google_id
						}
					}`, {
						input: JSON.stringify(subscription)
					}
				)
			})
			.catch(function (error) {
				if (Notification.permission === 'denied') {
					console.log('Permission for Notifications was denied');
					// subscribeButton.disabled = true;
				} else {
					console.log('Unable to subscribe to push.', error);
					// subscribeButton.disabled = false;
				}
			});
	});
}