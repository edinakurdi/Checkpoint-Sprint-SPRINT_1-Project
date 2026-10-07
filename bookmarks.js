import { getData, setData } from "./storage.js";

export function createBookmark(url, title, description) {
  const newBookmark = {
    url: url.trim(),
    title: title.trim(),
    description: description.trim(),
    createdAt: Date.now(),
    likes: 0,
  };
  return newBookmark;
}

export function addBookmark(userId, bookmark) {
  const savedBookmarks = getData(userId) || [];
  const updatedBookmarks = [...savedBookmarks, bookmark];
  setData(userId, updatedBookmarks);
}
export function validateBookmark(url, title, description) {
  const errors = {};
  if (!title.trim()) {
    errors.title = "Title is required.";
  }
  if (!description.trim()) {
    errors.description = "Description is required.";
  }
  if (!isWebAddress(url)) {
    errors.url = "A valid URL is required.";
  }
  return errors;
}

function isWebAddress(text) {
  try {
    const parsed = new URL(text);
    return parsed.protocol === "https:" || parsed.protocol === "http:";
  } catch {
    return false;
  }
}
