// sw.js - Service Worker

// You will need 3 event listeners:
//   - One for installation
let CACHE_NAME = 'my-site-cache-v1';
let URLs = [
    'https://cse110lab6.herokuapp.com/entries'
];


self.addEventListener('install', function(event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
          console.log("Install");
        return cache.addAll(URLs);
      })
  );
}); 
//   - One for activation ( check out MDN's clients.claim() for this step )
self.addEventListener('activate', event => {
    console.log("activate");
    event.waitUntil(clients.claim());
});

//   - One for fetch requests
/*self.addEventListener('fetch', function(event) {
    event.respondWith(
      caches.match(event.request)
        .then(function(response) {
            console.log("fetch");
            if (response) {
                return response;
            }
            return fetch(event.request);
        }
      )
    );
});*/