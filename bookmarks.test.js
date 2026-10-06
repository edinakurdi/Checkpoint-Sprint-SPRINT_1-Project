import assert from "node:assert";
import test from "node:test";

import { createBookmark, validateBookmark } from "./bookmarks.js";

// Tests for createBookmark
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

// Tests for validateBookmark
test("validateBookmark accepts valid bookmark", () => {
  const errors = validateBookmark(
    "https://kottke.org/",
    "Kottke",
    "A bookmark for Jason Kottke"
  );
  assert.deepEqual(errors, {});
});

test("validateBookmark rejects an empty title", () => {
  const errors = validateBookmark(
    "https://kottke.org/",
    "",
    "A bookmark for Jason Kottke"
  );
  assert.equal(errors.title, "Title is required.");
});

test("validateBookmark rejects an empty description", () => {
  const errors = validateBookmark("https://kottke.org/", "Kottke", "  ");
  assert.equal(errors.description, "Description is required.");
});
