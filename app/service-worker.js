const VERSION = 1;

this.addEventListener('install', function(event) {
	console.log("Installing");
  event.waitUntil(
     caches.open(VERSION).then((cache) => cache.addAll([
        '/',
				'./index.html',
				'./style.css',
				'./app.js',
				'./0.app.js',
				'./1.app.js',
				'./2.app.js',
				'./3.app.js'
			]))
  );
});

this.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        if (response) {
          return response; // already cached
				} else {
					if(event.request.url.startsWith("http://static.tvmaze.com/uploads/images/")) {
						return caches.open(VERSION)
							.then((cache) => Promise.all([cache, fetch(event.request)]))
							.then((response) => response[0].put(event.request, response[1]))
					}
					return fetch(event.request);
				}
      }
    )
  );
});

this.addEventListener('push', function (event) {
	if (!(self.Notification && self.Notification.permission === 'granted')) {
		return;
	}

	var data = {};
	if (event.data) {
		try {data = event.data.json();}
		catch(e) {
			console.warn('not json');
			data = {}
		}
	}
	var title = data.title || "Something Has Happened";
	var message = data.message || "Here's something you might want to check out.";
	var icon = "images/new-notification.png";
	console.log(Notification.permission);
	var notification = new Notification(title, {
		body: message,
		tag: 'simple-push-demo-notification',
		icon: icon
	});

	notification.addEventListener('click', function () {
		if (clients.openWindow) {
			clients.openWindow('https://example.blog.com/2015/03/04/something-new.html');
		}
	});
});