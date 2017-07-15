/**
 * Function which wraps the XMLHttpRequest and performs a get
 * @method get
 * @param  {String} url URL to fetch
 * @return {Promise}    Promise
 */
function get(url, type="GET") {
  return new Promise(function(resolve, reject) {
    const req = new XMLHttpRequest();
    req.open(type, url);
    req.onload = function() {
      if (req.status === 200) {
        resolve(req.responseText);
      } else {
        reject(new Error(req.statusText));
      }
    };
    req.onerror = function() {
      reject(new Error("Network error"));
    };
    req.send();
  });
}

/**
 * Function which wraps the get method but returns a JSON object.
 * @method json
 * @param  {String} url URL to feth
 * @return {Promise}    Promise if resolved
 */
function json(url) {
	return new Promise(function(resolve, reject) {
		get(url).then(
			function success(resp) {
				try {
					resolve(JSON.parse(resp));
				} catch(e) {
					reject("Error with JSON.");
				}
			},
			function() {
				reject("Error");
			}
		);
	});
}
 
export default { get, json };