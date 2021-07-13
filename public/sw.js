// caches
const CACHE_NAME = "static-cache-v1";
const DYNAMIC_CASHE = "dynamic-cashe-v1";

// Array to cache
const STATIC_CACHE = [
    "/",
    "/index.html",
    "/css/styles.css",
    "/js/app.js",
    "/js/index.js",
    "/icons/icon-192x192.png",
    "/icons/icon-512x512.png",
];

// Added caches inside the install event handler, will only cache static assets since they will not change
self.addEventListener("install", function(evt) {
// Use evt.waitUntil to allow the promise to resolve, before the service worker is installed
    evt.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            console.log("Cache successfull");
            return cache.addAll(STATIC_CACHE);
        })
    );
    self.skipWaiting();
});

// Deleting previous cache version, this allows updating of the service worker since a change is made. 
// Activating service worker
self.addEventListener("activate", function(evt) {
    evt.waitUntil(
// Names of the caches we have; static-cache-vn,
        caches.keys().then(function(keys) {
// Finds all keys(cache names), .filter checks to see if they are equal to CACHE_NAME (static-cache-vn)
// If they are not equal, it will map it to an array, all keys(cache names) in that array will be deleted
// when the CACHE_NAME gets changed, e.g. static-cache-vn+1, it will delete static-cache-vn, ensuring that the install will be retriggered due to the change.
            return Promise.all(keys
                .filter(key => key !== CACHE_NAME)
                .map(key => caches.delete(key))
            )
        })
    );
});

self.addEventListener('fetch', function(evt) {
// When there is a fetch request, checks to see if the requested assets exist within the cache
// will try to return the cached assets or || return the server assets
    if (evt.request.url.includes("/api/transaction")) {
        evt.respondWith(
            caches.open(CACHE_NAME).then(cache => {
                return fetch(evt.request)
                    .then(response => {
                        if (response.status === 200) {
                            cache.put(evt.request.url, response.clone());
                        }
                        return response;
                    })
                    .catch(err => {
                        return cache.match(evt.request);
                    });
            }).catch(err => console.log(err))
        );
        return;
    }


    evt.respondWith(
      caches.match(evt.request).then(cacheResponse => {
        return cacheResponse || fetch(evt.request);
      })
    )
  });
  

