import { getData } from "./storage.js";
import { incrementLike } from "./likes.js";

export function sortNewest(bookmarks) {
  if (!Array.isArray(bookmarks)) return []; //if bookmarks is null or undefined or non-array

  const copiedBookmarks = [...bookmarks];
  const sortedBookmarks = copiedBookmarks.sort(
    (a, b) => b.createdAt - a.createdAt
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

    const copyButton = card.querySelector(".copy-button");
    const copyStatus = card.querySelector(".copy-status");
    copyButton.addEventListener("click", () =>
      copyUrl(bookmark.url, copyStatus)
    );

    const likeCount = card.querySelector(".like-count");
    likeCount.textContent = bookmark.likes;
    const likeButton = card.querySelector(".like-button");
    likeButton.addEventListener("click", () => {
      incrementLike(userId, bookmark.createdAt);
      renderBookmarks(userId);
    });

    bookmarkList.append(card);
  });
}

// Copies a URL to the clipboard, then tells the user (screen-reader users included)
async function copyUrl(url, copyStatusEl) {
  // The page element is looked up inside the function or passed, so Node tests don't crash. (they dont have document element apparently)
  const copyStatus = copyStatusEl || document.getElementById("copy-status");

  try {
    if (!navigator.clipboard) {
      //navigator.clipboard is only available in secure contexts (https:// or http://localhost)
      throw new Error(
        "We couldn’t copy that to your clipboard because this page isn’t using a secure connection. Please use https:// and try again, or copy the text manually."
      );
    }
    // Wait until the browser has finished copying
    await navigator.clipboard.writeText(url);
    if (copyStatus) {
      copyStatus.textContent = "URL copied to clipboard";
    }
  } catch (error) {
    console.error("Failed to copy URL:", error);
    if (copyStatus) {
      // fyi: aria-live attribute on this element-->  screen readers will read it out
      copyStatus.textContent = "URL copied to clipboard";
    }
  } finally {
    if (copyStatus) {
      // After 2 seconds clear it, so the same message can be announced again next time
      setTimeout(() => {
        copyStatus.textContent = "";
      }, 2000);
    }
  }
}
