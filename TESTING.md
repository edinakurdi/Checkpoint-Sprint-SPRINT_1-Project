# Testing

## The website must contain a drop-down which lists five users

Manual test: open the page and open the "Choose a user" drop-down. It lists User 1 to User 5. The options come from `getUserIds()` in `storage.js`.

## Selecting a user must display the list of bookmarks for the relevant user

Manual test: add a bookmark while User 1 is selected, then switch to User 2 and back to User 1. User 1 shows the bookmark, and User 2 doesn't.

## If there are no bookmarks for the selected user, a message is displayed to explain this

Manual test: select a user with no saved bookmarks. The message "This user hasn't saved any bookmarks yet." is shown. Adding a bookmark for that user hides it.

## The list of bookmarks must be shown in reverse chronological order

Unit tests in `[test file for sortNewest]` check that `sortNewest` puts the newest bookmark first. Manual test: add three bookmarks for one user and check the last one added is at the top.

## Each bookmark has a title, description and created at timestamp displayed

Manual test: add a bookmark. Its title, description and "Saved:" date and time appear in the list.

## Each bookmark's title is a link to the bookmark's URL

Manual test: click a bookmark's title. It opens that bookmark's URL in a new tab.

## Each bookmark's "Copy to clipboard" button must copy the URL of the bookmark

Manual test: click "Copy URL" on a bookmark, paste into the address bar, and check it is that bookmark's URL.

## Each bookmark's like counter works independently, and persists data across sessions

Manual test: click Like twice on one bookmark and once on another. The counts show 2 and 1, and a new bookmark starts at 0. Close the browser, reopen the page, select the same user, and the counts are unchanged.

## The website must contain a form with inputs for a URL, a title, and a description. The form should have a submit button.

Manual test: the "Add a bookmark" section has labelled URL, Title and Description fields and an "Add bookmark" button. Keyboard test: Tab reaches every field and the button, and Enter submits the form.

## Submitting the form adds a new bookmark for the relevant user only

Manual test: add a bookmark for User 1, then select User 2. User 2's list is unchanged.

## After creating a new bookmark, the list of bookmarks for the current user is shown, including the new bookmark

Manual test: submit the form with valid values. The new bookmark appears in the list straight away without reloading the page, and the form fields are emptied.

## The website must score 100% for accessibility in
