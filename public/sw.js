// Added an event listner for when the service worker is installed, will console log 
self.addEventListener('install', evt => {
    console.log('Service worker has been installed');
});

// Activating service worker, console log
self.addEventListener('activate', evt => {
    console.log('Service worker has been activated');
});

// Adding fetch event for requests
self.addEventListener('fetch', evt => {
    console.log('fetch event requested', evt);
});