// ---------------------------------------------
// IMPORTS
// ---------------------------------------------
import { getUserIds } from "./storage.js";
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
