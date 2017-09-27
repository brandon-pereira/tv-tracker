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
				'./3.app.js',
				'./4.app.js',
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