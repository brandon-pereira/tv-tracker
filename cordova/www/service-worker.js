const VERSION = 1;
var self = this;

this.addEventListener('install', function(event) {
	console.log("Installing");
  event.waitUntil(
     caches.open(VERSION).then(function(cache) {
      return cache.addAll([
        // '/',
				// '/style.css',
				// '/app.js',
				// '/0.app.js',
				// '/1.app.js',
				// '/2.app.js',
				// '/3.app.js',
				// '/4.app.js',
			]);
    })
  );
});

// this.addEventListener('fetch', function(event) {
//   event.respondWith(
//     caches.match(event.request)
//       .then(function(response) {
// 				// var isCatAPI = /getrandomcatpic/.test(event.request.url);
//         if (response) {
// 					// Cache hit - return the response from the cached version
//           return response;
// 				} else {
// 					// Not in cache - return the result from the live server
// 					// `fetch` is essentially a "fallback"
// 					return fetch(event.request);
// 				}
//       }
//     )
//   );
// });