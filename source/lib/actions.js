/** Action types from when I was experimenting with redux, but which I still find useful */

export const FIND_COMMENTS = "FIND_COMMENTS";
export const DISPLAY_COMMENTS = "DISPLAY_COMMENTS";
export const DISPLAY_NO_COMMENTS = "DISPLAY_NO_COMMENTS";

export function findCommentsAction(book, searchPage = 0) {
  return { type: FIND_COMMENTS, book, searchPage };
}

export function displayCommentsAction(paginator, comments) {
  return { type: DISPLAY_COMMENTS, paginator, comments };
}

export function displayNoCommentsAction() {
  return { type: DISPLAY_NO_COMMENTS };
}
