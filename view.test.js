import assert from "node:assert";
import { test, describe } from "node:test";

import { sortNewest, formatTimestamp } from "./view.js";

describe("sortNewest puts bookmarks in reverse chronological order", () => {
  test("when bookmarks are empty, it returns an empty array", () => {
    const input = [];
    const sorted = sortNewest(input);
    assert.deepStrictEqual(sorted, []);
  });

  test("when bookmarks are empty or undefined, it returns an empty array", () => {
    assert.deepStrictEqual(sortNewest(null), []);
    assert.deepStrictEqual(sortNewest(undefined), []);
  });

  test("should not modify the original array of bookmarks", () => {
    const input = [
      { title: "old", createdAt: 123 },
      { title: "new", createdAt: 456 },
    ];

    const sorted = sortNewest(input);

    assert.strictEqual(sorted[0].title, "new");
    assert.strictEqual(input[0].title, "old");
  });

  test("should put the newest timestamp first", () => {
    const input = [
      { title: "middle", createdAt: 130 },
      { title: "oldest", createdAt: 123 },
      { title: "newest", createdAt: 456 },
    ];

    const sorted = sortNewest(input);

    assert.strictEqual(sorted[0].title, "newest");
    assert.strictEqual(sorted[1].title, "middle");
    assert.strictEqual(sorted[2].title, "oldest");
  });
});

describe("formatTimestamp formats the timestamp to a date and time", () => {
  test("returns empty string for null or undefined", () => {
    const input = null;
    const result = formatTimestamp(input);
    assert.strictEqual(result, "");

    const input2 = undefined;
    const result2 = formatTimestamp(input2);
    assert.strictEqual(result2, "");
  });

  test("it formats a timestamp into a string", () => {
    const input = 1791294347938;
    const result = formatTimestamp(input);
    assert.strictEqual(typeof result, "string");
  });

  test("it formats a timestamp with the expected date and time", () => {
    const input = 1791294347938; //
    const expected = "6 Oct 2026, 14:45"; // 6th of october 2026, 2:45 pm (in my local time)
    const actual = formatTimestamp(input);
    assert.strictEqual(actual, expected);
  });
});
