export default class ServiceWorker {

	constructor() {
		this._notificationSubscribers = [];
		this.register();
		this.getNotificationStatus();
	}

	set notificationStatus(status) {
		this._notificationStatus = status;
		this._notificationSubscribers.forEach(cb => cb(status));
	}

	register() {
		if (navigator.serviceWorker) {
			navigator.serviceWorker.register('ServiceWorker.js')
				.then(function (reg) {
					console.log("ServiceWorker: Registered");
					return reg;
				})
				.catch(function (error) {
					console.error("ServiceWorker: Failed to register", error);
				});
		} else {
			this.notificationStatus = 'UNSUPPORTED';
			console.warn("ServiceWorker: Unsupported Browser");
		}
	}

	subscribeToNotificationUpdates(cb) {
		this._notificationSubscribers.push(cb);
	}

	getNotificationStatus() {
		if (navigator.serviceWorker) {
			return navigator.serviceWorker.ready
				.then(reg => reg.pushManager.getSubscription())
				.then(key => key ? 'ENABLED' : 'UNKNOWN') // eslint-disable-line
				.then(status => {
					this.notificationStatus = status;
					return status;
				})

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
					.then(subscription => {
						console.log(subscription);
						this.notificationStatus = 'ENABLED';
						return JSON.stringify(subscription)
					})
					.catch(err => {
						this.notificationStatus = 'DISABLED';
						throw err;
					})
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