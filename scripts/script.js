// script.js
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('/Lab7/sw.js').then(function(registration) {
      // Registration was successful
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }, function(err) {
      // registration failed :(
      console.log('ServiceWorker registration failed: ', err);
    });
  });
}

// if ('serviceWorker' in navigator) {
//   navigator.serviceWorker.register('/Lab7/sw.js', { scope: '/Lab7/' }).then(function(reg) {

//     if(reg.installing) {
//       console.log('Service worker installing');
//     } else if(reg.waiting) {
//       console.log('Service worker installed');
//     } else if(reg.active) {
//       console.log('Service worker active');
//     }

//   }).catch(function(error) {
//     // registration failed
//     console.log('Registration failed with ' + error);
//   });
// }

import { router } from './router.js'; // Router imported so you can use it to manipulate your SPA app here
const settingBt = document.querySelector("header > img");
const homeBt = document.querySelector("header > h1");
settingBt.onclick = () => {router.setState("settings");};
homeBt.onclick = () => {router.setState("");};
// Make sure you register your service worker here too

document.addEventListener('DOMContentLoaded', () => {
  fetch('https://cse110lab6.herokuapp.com/entries')
    .then(response => response.json())
    .then(entries => {
      entries.forEach((entry,index) => {
        let newPost = document.createElement('journal-entry');
        entry.index = index + 1;
        newPost.entry = entry;
        newPost.onclick = () => {router.setState("single-entry",entry);};
        document.querySelector('main').appendChild(newPost);
      });
    });
});
