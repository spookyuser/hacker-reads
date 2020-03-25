import {
  displayCommentsAction,
  FIND_COMMENTS,
  displayNoCommentsAction
} from "../lib/actions";
import { search } from "../lib/api";
import { initBackendMessaging } from "./messaging";
import { COMMENTS_PER_PAGE } from "../lib/constants";

/** Calls the search api with params supplied by foreground */
function findComments(book, page = 0) {
  const parameters = {
    query: `${book.title} ${book.author}`,
    tags: "comment",
    hitsPerPage: COMMENTS_PER_PAGE,
    page
  };

  return search(parameters);
}

/** Handles messages received from foreground @see initBackendMessaging */
export function backendMessageReceived(message, port) {
  switch (message.type) {
    case FIND_COMMENTS:
      findComments(message.book, message.searchPage).then(
        ([paginator, comments]) => {
          if (comments.length === 0) {
            port.postMessage(displayNoCommentsAction());
          } else {
            port.postMessage(displayCommentsAction(paginator, comments));
          }
        }
      );
      break;
    default:
      break;
  }
}

initBackendMessaging();
