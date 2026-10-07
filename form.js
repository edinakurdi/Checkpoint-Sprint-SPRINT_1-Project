import { validateBookmark, createBookmark, addBookmark } from "./bookmarks.js";
const form = document.getElementById("bookmark-form");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const url = document.getElementById("bookmark-url").value;
  const title = document.getElementById("bookmark-title").value;
  const description = document.getElementById("bookmark-description").value;
  const errors = validateBookmark(url, title, description);
  document.getElementById("bookmark-url-error").textContent = errors.url || "";
  document.getElementById("bookmark-title-error").textContent =
    errors.title || "";
  document.getElementById("bookmark-description-error").textContent =
    errors.description || "";
  if (Object.keys(errors).length === 0) {
    const bookmark = createBookmark(url, title, description);
    const userId = document.getElementById("user-selection").value;
    addBookmark(userId, bookmark);
  }
});
