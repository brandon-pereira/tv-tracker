const VERSION = 1;
const logPrefix = 'ServiceWorker:';
const log = (...msg) => console.info(logPrefix, ...msg);

this.addEventListener('install', (event) => {
    log("Installing");
    event.waitUntil(async function() {
        const cache = await self.caches.open(VERSION);
        await cache.addAll([
            '/',
            '/index.html',
            '/scripts/bundle.min.js',
        ]);
    }());
});

this.addEventListener('activate', (event) => {
    log("Activated");
    return event.waitUntil(self.clients.claim()); // immediately control activating sw
});

this.addEventListener('fetch', event => {
    // log("Fetching", event.request);
    event.respondWith(async function() {
        const cachedResponse = await self.caches.match(event.request);
        // Return cached response
        if(cachedResponse) {
            return cachedResponse;
        }
        // Not cached, cache response if applicable
        if (event.request.url.startsWith("http://static.tvmaze.com/uploads/images/")) {
            const cache = await self.caches.open(VERSION)
            const data = await fetch(event.request);
            await cache.put(event.request, data);
            return data;
        }
        // Fallback, fetch and return
        return fetch(event.request);
    }());
});

this.addEventListener('push', (event) => {
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
            data: {
                url: data.url
            }
        })
    );
});

this.addEventListener('notificationclick', (event) => {
    const clickedNotification = event.notification;
    clickedNotification.close();
    log('User clicked notification', clickedNotification);
    event.waitUntil(
        async function() {
            const url = (clickedNotification.data && clickedNotification.data.url) ? clickedNotification.data.url : '/#/';
            const clientList = await self.clients.matchAll({
                type: "window"
            });
            const isOpen = clientList.find(client => client.focused && client.url.includes('/#/')); // incase its not the webapp
            log(clientList, isOpen);
            if(isOpen) {
                return Promise.all([isOpen.focus(), isOpen.navigate(url)]);
            } else if (self.clients.openWindow) {
                return self.clients.openWindow(url);
            }
        }()
    );
})