const VERSION = 1;
const logPrefix = 'ServiceWorker:';
const log = (...msg) => console.info(logPrefix, ...msg);

this.addEventListener('install', (event) => {
    log("Installing");
    event.waitUntil(async function() {
        const cache = await caches.open(VERSION);
        await cache.addAll([
            '/',
            '/index.html',
            '/scripts/bundle.min.js',
        ]);
    }());
});

this.addEventListener('activate', () => {
    log("Activated");
});

this.addEventListener('fetch', event => {
    log("Fetching", event.request);
    event.respondWith(async function() {
        const cachedResponse = await caches.match(event.request);
        // Return cached response
        if(cachedResponse) {
            return cachedResponse;
        }
        // Not cached, cache response if applicable
        if (event.request.url.startsWith("http://static.tvmaze.com/uploads/images/")) {
            const cache = await caches.open(VERSION)
            const data = await fetch(event.request);
            await cache.put(event.request, data);
            return data;
        }
        // Fallback, fetch and return
        return fetch(event.request);
    }());
});

addEventListener('push', function (event) {
    if (!(self.Notification && self.Notification.permission === 'granted')) {
        console.error("not granted")
        return;
    }

    var data = {};
    if (event.data) {
        try { data = event.data.json(); }
        catch (e) {
            return;
        }
    }

    console.log("receivedNotification", data);

    event.waitUntil(
        self.registration.showNotification(data.title, {
            body: data.body,
            icon: data.image,
            data: Math.random()
        })
    );

    // notification.addEventListener('click', function () {
    // 	if (clients.openWindow) {
    // 		clients.openWindow('https://example.blog.com/2015/03/04/something-new.html');
    // 	}
    // });
});