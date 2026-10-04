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
