import { validateBookmark } from "./bookmarks.js";
const form = document.getElementById("bookmark-form");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const url = document.getElementById("bookmark-url").value;
  const title = document.getElementById("bookmark-title").value;
  const description = document.getElementById("bookmark-description").value;
  const errors = validateBookmark(url, title, description);
  console.log(errors);
});
