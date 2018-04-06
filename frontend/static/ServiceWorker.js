const VERSION = 1;
const logPrefix = 'ServiceWorker:';
const log = (...msg) => console.info(logPrefix, ...msg);

addEventListener('install', (event) => {
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

addEventListener('activate', () => {
    log("Activated");
});

addEventListener('fetch', event => {
    // log("Fetching", event.request);
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

addEventListener('push', (event) => {
    let data = {};
    try {
        data = event.data.json();
        if(!data || !data.title) {
            throw new Error("Missing title or passed string instead of object");
        }
    } catch (e) {
        console.error(e);
        return;
    }

    log("receivedNotification", data);
    event.waitUntil(
        self.registration.showNotification(data.title, {
            body: data.body,
            icon: data.image,
            data: data.payload
        })
    );
});

addEventListener('notificationclick', (e) => {
    const clickedNotification = e.notification;
    clickedNotification.close();
    log('User clicked notification', clickedNotification);
    // TODO: How will we manage clicks? We don't want to modify this file too much.
    // if(clickedNotification.data && clients.openWindow) {
    //     clients.openWindow('/blah');
    // }
})