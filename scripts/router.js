// router.js

export const router = {};
const body = document.querySelector("body");
const main = document.querySelector("main");
const title = document.querySelector("header > h1");

const loc = window.location.href;
function insertAfter(newobj, oldobj) {
  oldobj.parentNode.insertBefore(newobj, oldobj.nextSibling);
}
/**
 * Changes the "page" (state) that your SPA app is currently set to
 */
function setTitle(newTitle){
  document.title = title.innerHTML = newTitle;
}
function setPage(state,entry,hist){
  body.className = state;
  let newTitle = "Journal Entries";

  switch(state) {
    case "settings":
      newTitle = "Settings";
      setTitle(newTitle);
      if (hist)
        history.pushState({page: state},"Settings",loc+"#settings");
      break;
    case "single-entry":
      document.querySelector("entry-page").remove();
      let newEntry = document.createElement("entry-page");
      newTitle = "Entry "+entry.index;
      setTitle(newTitle);
      newEntry.entry = entry;
      insertAfter(newEntry,main);
      if(hist)
        history.pushState({page: state,entry},newTitle,loc+"#entry"+entry.index);
      break;
    default: // home page
      setTitle(newTitle);
      if(hist)
        history.pushState({page: state},newTitle,loc);
        
      break;
  }
}
router.setState = function(state,entry) {
  setPage(state,entry,true);
}
  
window.onpopstate = (event) => {
  setPage(event.state.page,event.state.entry,false);
}
  /**
   * - There are three states that your SPA app will have
   *    1. The home page
   *    2. The entry page (showing one individual entry)
   *    3. The settings page (currently blank, no actual settings here, just a placeholder where a real settings page would go)
   * 
   * - If you look at the CSS, we have 2 classes you can add to the body element to help change states, "settings" and "single-entry"
   * - Changing states will require more than just changing these classes, for example the settings page requires you to change the title to "Settings"
   * - And each individual entry the title changes to "Entry #" based on it's number in the entry order
   *
   * - When changing states, make sure the back and forward buttons work. You can use hash URLs (e.g. https://someurl.com/#settings) when changing states
   *   to make things easier.
   * - Similarly, when viewing an individual entry, a hashed URL might look like https://someurl.com/#entry3
   * 
   * - Some tips:
   *    1. Push a new state object to the history object using history.pushState() 
   *    2. look up the documentation for how to use pushState() when you try it
   *    3. look up the documentation for the "popstate" event listener (fires only on back button), useful in your script.js file
   *    4. For each <journal-entry> element, you can grab the JSON version of its info with .entry (e.g. someJournalEntryElement.entry)
   *       a. This is useful when viewing a single entry. You may notice an <entry-page> element in the HTML, this is the element that is displayed when the
   *          .single-entry class is applied to the body. You can populate this element by using .entry similarly. So if I wanted to grab a specific <journal-entry>
   *          and populate it's info into the <entry-page>, I would simply use an assignment of entryPageElement.entry = journalEntryElement.entry
   *       b. Clearing the <entry-page> element of its previous data can be a bit tricky, it might be useful to just delete it and insert a new blank one 
   *          in the same spot each time. Just a thought.
   *
   * - Answers to some questions you may have:
   *    1. You may add as many helper functions in this file as you like
   *    2. You may modify the parameters of setState() as much as you like
   */
