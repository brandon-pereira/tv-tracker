const VERSION = 1;
var self = this;

this.addEventListener('install', function(event) {
	console.log("Installing");
  // event.waitUntil(
  //    caches.open(VERSION).then(function(cache) {
  //     return cache.addAll([
  //       '/'
	// 		]);
  //   })
  // );
});

// this.addEventListener('message', function(event) {
// 	console.log("DATA");
//     var data = event.data;
// 		console.log(data);
//     if (data.command == "oneWayCommunication") {
//         console.log("Message from the Page : ", data.message);
//     } 
// });