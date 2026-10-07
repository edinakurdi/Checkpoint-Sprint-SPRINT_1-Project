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
