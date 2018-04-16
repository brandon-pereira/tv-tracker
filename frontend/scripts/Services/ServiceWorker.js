class ServiceWorker {

	constructor() {
		this._notificationSubscribers = [];
		this.VAPID_PUBLIC_KEY = process.env.VAPID_PUBLIC_KEY;
		this.register();
		this.getNotificationStatus();
	}

	set notificationStatus(status) {
		this._notificationStatus = status;
		this._notificationSubscribers.forEach(cb => cb(status));
	}

	async register() {
		if (navigator.serviceWorker) {
			try {
				const reg = await navigator.serviceWorker.register('ServiceWorker.js');
				console.log("ServiceWorker: Registered");
				return reg;
			} catch(err) {
				this.notificationStatus = 'DISABLED';
				console.error("ServiceWorker: Failed to register", err);
			}
		} else {
			this.notificationStatus = 'UNSUPPORTED';
			console.warn("ServiceWorker: Unsupported Browser");
		}
	}

	subscribeToNotificationUpdates(cb) {
		this._notificationSubscribers.push(cb);
	}

	async getNotificationStatus() {
		this.notificationStatus = 'DISABLED';
		if (navigator.serviceWorker) {
			const reg = await navigator.serviceWorker.ready
			const key = await reg.pushManager.getSubscription()
			const status = key ? 'ENABLED' : 'UNKNOWN';
			this.notificationStatus = status;
			return status;
		}
	}

	async requestNotificationAccess () {
		if (navigator.serviceWorker && this.VAPID_PUBLIC_KEY) {
			try {
				const reg = await navigator.serviceWorker.ready;
				const subscribeOptions = {
					userVisibleOnly: true,
					applicationServerKey: this._urlBase64ToUint8Array(this.VAPID_PUBLIC_KEY)
				};
				const subscription = await reg.pushManager.subscribe(subscribeOptions)
				this.notificationStatus = 'ENABLED';
				return JSON.stringify(subscription)
			} catch(err) {
				this.notificationStatus = 'DISABLED';
				throw err;
			}
		}
	}
	
	// https://gist.github.com/malko/ff77f0af005f684c44639e4061fa8019
	_urlBase64ToUint8Array(base64String) {
		const padding = '='.repeat((4 - base64String.length % 4) % 4);
		const base64 = (base64String + padding)
			.replace(/-/g, '+')
			.replace(/_/g, '/')
			;
		const rawData = window.atob(base64);
		return Uint8Array.from([...rawData].map((char) => char.charCodeAt(0)));
	}
}

export default new ServiceWorker();