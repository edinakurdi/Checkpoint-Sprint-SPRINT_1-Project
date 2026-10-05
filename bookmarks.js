export function createBookmark(url, title, description) {
  const newBookmark = {
    url: url,
    title: title,
    description: description,
    createdAt: Date.now(),
    likes: 0,
  };
  return newBookmark;
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
