self.addEventListener("install", function (event) {
  event.waitUntil(preLoad());
});

var preLoad = function () {
  console.log("Installing web app");
  return caches.open("offline").then(function (cache) {
    console.log("caching index and important routes");
    return cache.addAll(["/", "/offline.html"]);
  });
};

self.addEventListener("fetch", function (event) {
  // Only handle GET requests
  if (event.request.method === "GET") {
    event.respondWith(
      checkResponse(event.request).catch(function () {
        return returnFromCache(event.request);
      })
    );
    event.waitUntil(addToCache(event.request));
  }
  // Ignore POST requests and other methods
});

var checkResponse = function (request) {
  return new Promise(function (fulfill, reject) {
    fetch(request.clone()).then(function (response) {
      if (response.status !== 404) {
        fulfill(response);
      } else {
        reject();
      }
    }, reject);
  });
};

var addToCache = function (request) {
  // Only cache GET requests
  if (request.method !== "GET") {
    return Promise.resolve(); // Skip caching for non-GET requests
  }

  return caches.open("offline").then(function (cache) {
    return fetch(request.clone()).then(function (response) {
      // Only cache successful responses (status 200) and ensure response is not opaque
      if (response && response.status === 200 && response.type === "basic") {
        console.log(response.url + " was cached");
        return cache.put(request, response.clone()); // Clone response before caching
      }
    }).catch(function (error) {
      console.error("Failed to cache:", error);
    });
  });
};


var returnFromCache = function (request) {
  return caches.open("offline").then(function (cache) {
    return cache.match(request).then(function (matching) {
      if (!matching || matching.status === 404) {
        return cache.match("offline.html");
      } else {
        return matching;
      }
    });
  });
};