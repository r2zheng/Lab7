// script.js

import { router } from './router.js'; // Router imported so you can use it to manipulate your SPA app here
const settingBt = document.querySelector("header > img");
const homeBt = document.querySelector("header > h1");
settingBt.onclick = () => {router.setState("settings");};
homeBt.onclick = () => {router.setState("");};
history.pushState({page: ""},"Journal Entries",window.location.href); // record the first page
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
