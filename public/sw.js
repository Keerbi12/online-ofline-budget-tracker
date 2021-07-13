// Static assets
const CACHE_NAME = "static-cache";
const DATA_CACHE = "data-cache-v1";
const STATIC_CACHE = [
    "/",
    "/index.html",
    "/css/style.css",
    "/js/app.js",
    "/js/index.js",
    "/icons/icon-192x192.png",
    "/icons/icon-512x512.png",
];

// Added an event listner for when the service worker is installed, will console log 
// Added caches inside the install event handler, will only cache static assets since they will not change
// Use evt.waitUntil to allow the promise to resolve, before the service worker is considered installed
self.addEventListener("install", function(evt) {
    evt.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            console.log("Cache successfull");
            return cache.addAll(STATIC_CACHE);
        })
    );
    self.skipWaiting();
});

// Activating service worker, console log
self.addEventListener("activate", evt => {
    console.log("Service worker has been activated");
});

// Adding fetch event for requests
self.addEventListener("fetch", evt => {
   // console.log("fetch event requested", evt);
//    evt.respondWith(
//        caches.open(DATA_CACHE).then(catch => {
//            return fetch(evt.request)
//             .then(response => {
//                 if (response.status === 2000)
//             })
//        })
//    )
});