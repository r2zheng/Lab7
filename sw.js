// sw.js - Service Worker

// You will need 3 event listeners:
//   - One for installation
var CACHE_NAME = 'my-site-cache-v1';
var urlsToCache = [
  'https://cse110lab6.herokuapp.com/entries'
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
          return fetch(event.request);
        }
      )
    );
  });


// var urlToPrefetch = 'https://cse110lab6.herokuapp.com/entries';
// self.addEventListener('install', function(event) {
//     cache.addAll(urlsToPrefetch.map(function(urlToPrefetch) {
//     return new Request(urlToPrefetch, { mode: 'no-cors' });
//   })).then(function() {
//     console.log('All resources have been fetched and cached.');
//   });
// });

// //   - One for activation ( check out MDN's clients.claim() for this step )
// self.addEventListener('activate', event => {
//   event.waitUntil(clients.claim());
// });

// self.addEventListener('fetch', function(event) {
//   event.respondWith(caches.match(event.request).then(function(response) {
//     // caches.match() always resolves
//     // but in case of success response will have value
//     if (response !== undefined) {
//       return response;
//     } else {
//       return fetch(event.request).then(function (response) {
//         // response may be used only once
//         // we need to save clone to put one copy in cache
//         // and serve second one
//         let responseClone = response.clone();
        
//         caches.open('v1').then(function (cache) {
//           cache.put(event.request, responseClone);
//         });
//         return response;
//       }).catch(function () {
//         return caches.match('/Lab7/images/mountains.jpg');
//       });
//     }
//   }));
// });