export default class ServiceWorker {

	constructor() {
		this.register();
	}

	register() {
		if (navigator.serviceWorker) {
			console.log("ServiceWorkers are supported");
			navigator.serviceWorker.register('ServiceWorker.js')
				.then(function (reg) {
					console.log("ServiceWorker registered", reg);
					return reg;
				})
				.catch(function (error) {
					console.error("Failed to register ServiceWorker", error);
				});
		} else {
			console.warn("ServiceWorkers are not supported.")
		}
	}

	requestNotificationAccess (vapid_key) {
		if (navigator.serviceWorker) {
			return navigator.serviceWorker.ready.then(reg => {
				const subscribeOptions = {
					userVisibleOnly: true,
					applicationServerKey: urlBase64ToUint8Array(vapid_key)
				};
				return reg.pushManager.subscribe(subscribeOptions)
					.then(subscription => JSON.stringify(subscription))
			});
		}
	}
}

// https://gist.github.com/malko/ff77f0af005f684c44639e4061fa8019
function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/-/g, '+')
    .replace(/_/g, '/')
  ;
  const rawData = window.atob(base64);
  return Uint8Array.from([...rawData].map((char) => char.charCodeAt(0)));
}