// ---------------------------------------------
// IMPORTS
// ---------------------------------------------
import { getUserIds } from "./storage.js";
import { sortNewest, formatTimestamp } from "./view.js";
// ---------------------------------------------
// DOM elements
// ---------------------------------------------
const userSelect = document.querySelector("#user-selection");
const bookmarkList = document.querySelector("#bookmark-list");
const emptyMessage = document.querySelector("#empty-message");
const bookmarkTemplate = document.querySelector("#bookmark-template");
const statusMessage = document.querySelector("#copy-status");
const form = document.querySelector("#bookmark-form"); // todo [Dona] amend if you named the ID differently

// ---------------------------------------------
// STATE
// ---------------------------------------------
const userIds = getUserIds();

let state = {
  userIds: userIds,
  selectedUserId: userIds[0], // which user is shown
  bookmarks: [], //selected users bookmarks
  formValues: { url: "", title: "", description: "" }, //this is coming from the form - what the users typed in
  formErrors: {},
  status: { text: "", id: 0 }, // id increments on every message (0, 1, 2...). We need this because if a user clicks "Copy URL" twice, the text string doesn't change ("URL copied to clipboard.") and the screen reader would ignore it. Tracking `id` helps bc it tells render() a NEW action happened so screen readers re-announce it.
};

// ---------------------------------------------
// setSTATE
// to delete: this is  how state will change. in updates we have what changed, and we add it to update state
// ---------------------------------------------
function setState(updates) {
  state = { ...state, ...updates };
  // the spread copies all the properies from state to a new object, then ...updates copies it new properties on top of it, overwriting any that was there before in state

  render();
}

// ---------------------------------------------
// RENDER
// ---------------------------------------------

//----------------------
//section: dropdown
//----------------------
userSelect.innerHTML = ""; //empties options

// Populate the dropdown menu by creating an <option> element for each user ID
state.userIds.forEach((id) => {
  const option = document.createElement("option");
  option.value = id;
  option.textContent = `User ${id}`;
  userSelect.append(option);
});

userSelect.value = state.selectedUserId; //shows the chosen userID

//----------------------
//section: bookmark list
//----------------------

bookmarkList.innerHTML = ""; //empties bookmarks list

const sortedBookmarks = sortNewest(state.bookmarks);
emptyMessage.hidden = sortedBookmarks.length > 0; // hide the empty message when the bookmarks are not empty

for (const bookmark of sortedBookmarks) {
  const item = bookmarkTemplate.content.cloneNode(true);

  const link = item.querySelector(".bookmark-link");
  link.href = bookmark.url;
  link.textContent = bookmark.title;

  item.querySelector(".bookmark-description").textContent =
    bookmark.description;

  const date = item.querySelector("bookmark-date");
  date.textContent = formatTimestamp(bookmark.createdAt);


