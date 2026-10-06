export function sortNewest(bookmarks) {
  return [...bookmarks].sort((a, b) => b.createdAt - a.createdAt);
  //...bookmarks makes a copy first, so we dont mutate the bookmarks
  //sorting is in reverse alphabetical order based on the timestamp in createdAt
}

export function formatTimestamp(timestamp) {
  //this converts the timestamp created in bookmark - date.Now() to a date with time
  return new Date(timestamp).toLocaleString("en-GB", {
    dateStyle: "medium", // "6 Oct 2026" - this is more readable than just numbers - it is like Excel's short date format
    TimeStyle: "short", // "20:51"
  });
}
