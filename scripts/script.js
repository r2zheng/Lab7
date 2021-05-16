// script.js
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('/sw.js').then(function(registration) {
      // Registration was successful
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }, function(err) {
      // registration failed :(
      console.log('ServiceWorker registration failed: ', err);
    });
  });
}

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
