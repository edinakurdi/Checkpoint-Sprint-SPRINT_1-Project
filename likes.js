import { getData, setData } from "./storage.js";

export function incrementLike(userId, createdAt) {
  const savedBookmarks = getData(userId) || [];
  const updatedBookmarks = savedBookmarks.map((bookmark) => {
    if (bookmark.createdAt === createdAt) {
      return { ...bookmark, likes: bookmark.likes + 1 };
    }
    return bookmark;
  });
  setData(userId, updatedBookmarks);
  return updatedBookmarks;
}
