//==================================
//IMPORTS
//==================================
import { getUserIds, getData } from "./storage.js";
import { sortNewest, formatTimestamp } from "./view.js";
import "./form.js";
//==================================
// DOM elements
//==================================
const userSelect = document.getElementById("user-selection");
const bookmarkList = document.getElementById("bookmark-list");
const bookmarkTemplate = document.getElementById("bookmark-template");
const bookmarkForm = document.getElementById("bookmark-form");

//==================================
//DROPDOWN
//==================================

function populateUserDropdown() {
  getUserIds().forEach((id) => {
    const option = document.createElement("option");
    option.value = id;
    option.textContent = `User ${id}`;
    userSelect.append(option);
  });
}

//==================================
//show the selected user's bookmarks
//==================================
export function renderBookmarks() {
  const userId = userSelect.value;

  const bookmarks = sortNewest(getData(userId));

  bookmarkList.replaceChildren(); //remove the old ones, - this is the same as .innertHTML = ""

  bookmarks.forEach((bookmark) => {
    const card = bookmarkTemplate.content.cloneNode(true);

    const link = card.querySelector(".bookmark-link");
    link.textContent = bookmark.title;
    link.href = bookmark.url;

    card.querySelector(".bookmark-description").textContent =
      bookmark.description;

    const time = card.querySelector(".bookmark-date");
    time.textContent = formatTimestamp(bookmark.createdAt);
    time.dateTime = new Date(bookmark.createdAt).toISOString();

    // todo [Edina]  copy button
    // todo [Dona] like button

    bookmarkList.append(card);
  });
}

//==================================
//START-UP
//==================================
populateUserDropdown();
renderBookmarks();

userSelect.addEventListener("change", renderBookmarks);
bookmarkForm.addEventListener("submit", renderBookmarks);
