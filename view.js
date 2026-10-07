import { getData } from "./storage.js";

export function sortNewest(bookmarks) {
  if (!Array.isArray(bookmarks)) return []; //if bookmarks is null or undefined or non-array

  const copiedBookmarks = [...bookmarks];
  const sortedBookmarks = copiedBookmarks.sort(
    (a, b) => b.createdAt - a.createdAt,
  );
  return sortedBookmarks;
}

export function formatTimestamp(timestamp) {
  if (!timestamp) return "";
  //this converts the timestamp created in bookmark - date.Now() to a date with time
  const date = new Date(timestamp); // converts milliseconds to Date object
  return date.toLocaleString("en-GB", {
    dateStyle: "medium", // "6 Oct 2026" - this is more readable than just numbers - it is like Excel's short date format
    timeStyle: "short", // "20:51" --> so no seconds added
  });
}

export function renderBookmarks(userId) {
  const bookmarkList = document.getElementById("bookmark-list");
  const bookmarkTemplate = document.getElementById("bookmark-template");
  const emptyMessage = document.getElementById("empty-message");
  const bookmarks = sortNewest(getData(userId));

  bookmarkList.replaceChildren();
  emptyMessage.hidden = bookmarks.length > 0;
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

    // todo [Edina] copy button
    // todo [Dona] like button

    bookmarkList.append(card);
  });
}
