// sw.js - Service Worker

// You will need 3 event listeners:
//   - One for installation
var CACHE_NAME = 'my-site-cache-v1';
var urlsToCache = [
  '/Lab7/',
  '/Lab7/index.html',
  '/Lab7/style.css',
  '/Lab7/settings.svg',
  '/Lab7/scripts/router.js',
  '/Lab7/scripts/script.js',
  '/Lab7/images/lab.jpg',
  '/Lab7/images/mountains.jpg',
  '/Lab7/images/sky.jpg',
  '/Lab7/components/entry-page.js',
  '/Lab7/components/journal-entry.js'
];

self.addEventListener('install', function(event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
}); 
//   - One for activation ( check out MDN's clients.claim() for this step )
self.addEventListener('activate', event => {
  event.waitUntil(clients.claim());
});
//   - One for fetch requests
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Cache hit - return response
        if (response) {
          return response;
        }

        // IMPORTANT:Clone the request. A request is a stream and
        // can only be consumed once. Since we are consuming this
        // once by cache and once by the browser for fetch, we need
        // to clone the response.
        var fetchRequest = event.request.clone();

        return fetch(fetchRequest).then(
          function(response) {
            // Check if we received a valid response
            if(!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // IMPORTANT:Clone the response. A response is a stream
            // and because we want the browser to consume the response
            // as well as the cache consuming the response, we need
            // to clone it so we have two streams.
            var responseToCache = response.clone();

            caches.open(CACHE_NAME)
              .then(function(cache) {
                cache.put(event.request, responseToCache);
              });

            return response;
          }
        );
      })
    );
});