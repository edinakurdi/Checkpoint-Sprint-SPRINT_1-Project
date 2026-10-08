# Testing

## The website must contain a drop-down which lists five users

Manual test: open the page and open the "Choose a user" drop-down. It lists User 1 to User 5. The options come from `getUserIds()` in `storage.js`.

## Selecting a user must display the list of bookmarks for the relevant user

Manual test: add a bookmark while User 1 is selected, then switch to User 2 and back to User 1. User 1 shows the bookmark, and User 2 doesn't.

## If there are no bookmarks for the selected user, a message is displayed to explain this

Manual test: select a user with no saved bookmarks. The message "This user hasn't saved any bookmarks yet." is shown. Adding a bookmark for that user hides it.

## The list of bookmarks must be shown in reverse chronological order

Unit tests in `view.test.js` check that `sortNewest` puts the newest bookmark first, returns an empty array for empty or missing input, and doesn't change the original array. Manual test: add three bookmarks for one user and check the last one added is at the top.

## Each bookmark has a title, description and created at timestamp displayed

Manual test: add a bookmark. Its title, description and "Saved:" date and time appear in the list.

## Each bookmark's title is a link to the bookmark's URL

Manual test: click a bookmark's title. It opens that bookmark's URL in a new tab.

## Each bookmark's "Copy to clipboard" button must copy the URL of the bookmark

Manual test: click "Copy URL" on a bookmark, paste into the address bar, and check it is that bookmark's URL. The message "URL copied to clipboard" appears and disappears after 2 seconds.

Failure test: open the page using the network address that `npx http-server` prints (for example http://192.168.1.5:8080, not 127.0.0.1). This is not a secure page, so copying is blocked. Clicking "Copy URL" shows "Couldn't copy the URL. Please copy it from the link instead."

## Each bookmark's like counter works independently, and persists data across sessions

Manual test: click Like twice on one bookmark and once on another. The counts show 2 and 1, and a new bookmark starts at 0. Close the browser, reopen the page, select the same user, and the counts are unchanged.

## The website must contain a form with inputs for a URL, a title, and a description. The form should have a submit button.

Manual test: the "Add a bookmark" section has labelled URL, Title and Description fields and an "Add bookmark" button. Keyboard test: Tab reaches every field and the button, and Enter submits the form.

## Submitting the form adds a new bookmark for the relevant user only

Manual test: add a bookmark for User 1, then select User 2. User 2's list is unchanged.

## After creating a new bookmark, the list of bookmarks for the current user is shown, including the new bookmark

Manual test: submit the form with valid values. The new bookmark appears in the list straight away without reloading the page, and the form fields are emptied.

## The website must score 100% for accessibility in Lighthouse in the Desktop device mode, for all views in the website

Manual test: Lighthouse, Snapshot mode, Desktop device, Accessibility only, run on three views. A user with no bookmarks passed 18 of 18 checks. A user with bookmarks passed 20 of 20. The form showing its three error messages passed 18 of 18. All three score 100.

## Unit tests must be written for at least one non-trivial function

Unit tests in `bookmarks.test.js` cover `validateBookmark` (valid input, empty title, empty description, a URL that is not http or https, text that is not a URL) and `createBookmark`. Unit tests in `view.test.js` cover `sortNewest` and `formatTimestamp`. Run with `npm test`: all 15 tests pass.

## The project must not contain any dead code. All written JavaScript and CSS must be used.

Manual review: searched every file for unused functions, unused imports, unused return values, checks that can never be false, commented-out code and leftover TODO comments, and removed them. Ran `git ls-files` to confirm no leftover copies (such as viewCopy.js) are in the repo. `npm test` passes.
