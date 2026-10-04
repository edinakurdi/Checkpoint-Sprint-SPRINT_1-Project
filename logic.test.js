import assert from "node:assert";
import test from "node:test";

import { createBookmark } from "./logic.js";

test("createBookmark keeps url, title, description", () => {
  const bookmark = createBookmark(
    "https://kottke.org/",
    "Kottke",
    "A bookmark for Jason Kottke"
  );
  assert.equal(bookmark.url, "https://kottke.org/");
  assert.equal(bookmark.title, "Kottke");
  assert.equal(bookmark.description, "A bookmark for Jason Kottke");
});

test("createBookmark always gives likes the number 0", () => {
  const bookmark = createBookmark(
    "https://kottke.org/",
    "Kottke",
    "A bookmark for Jason Kottke"
  );
  assert.equal(bookmark.likes, 0);
});

test("createBookmark sets createdAt as a number", () => {
  const bookmark = createBookmark(
    "https://kottke.org/",
    "Kottke",
    "A bookmark for Jason Kottke"
  );
  assert.equal(typeof bookmark.createdAt, "number");
});
