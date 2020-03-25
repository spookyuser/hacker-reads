import {
  DISPLAY_COMMENTS,
  findCommentsAction,
  DISPLAY_NO_COMMENTS
} from "../lib/actions";
import { hnComment } from "../templates/hn-comment";
import "./content-script.css";
import {
  elementReady,
  initDOM,
  insertLoader,
  selectBookFromPage
} from "./dom-utils";
import { initFrontendMessaging } from "./messaging";
import { getPaginatorNode } from "./paginator";
import select from "select-dom";
import { html } from "common-tags";

let port;
let book;

/** Requests comments at a particular page number of search results
 * Executed when a user clicks on any link in the paginator
 */
export function getCommentsPage(page) {
  select("#hn-comments-list").innerHTML = "";
  insertLoader();
  port.postMessage(findCommentsAction(book, page));
}

/** Turns a Comment array into a list of comments ready to be displayed */
function displayComments(paginator, comments) {
  const commentsHtml = html`
    ${comments.map(hnComment)}
  `;
  // Only insert the list when page is fully loaded
  elementReady("#hn-comments-list").then(commentsList => {
    commentsList.insertAdjacentHTML("afterbegin", commentsHtml);
    select("#hn-loader").remove();
    select("#paginator-report").textContent = paginator.pageReport;
    if (paginator.totalPages > 1) {
      commentsList.append(getPaginatorNode(paginator));
    }
  });
}

/** Displays empty page when no comments are found */
function displayNoComments() {
  const message = "There are no Hacker News comments about this book yet.";
  const messageHtml = `<span class="mediumText">${message}</span>`;

  elementReady("#hn-comments-list").then(commentsList => {
    commentsList.insertAdjacentHTML("afterbegin", messageHtml);
    select("#hn-loader").remove();
  });
}

/** Handles messages received from background @see initFrontendMessaging */
export function frontendMessageReceived(message) {
  switch (message.type) {
    case DISPLAY_COMMENTS:
      displayComments(message.paginator, message.comments);
      break;
    case DISPLAY_NO_COMMENTS:
      displayNoComments();
      break;
    default:
      break;
  }
}

/** Everything that can be run while the page is not fully ready */
async function initData() {
  port = initFrontendMessaging();
  book = selectBookFromPage();
  port.postMessage(findCommentsAction(book));
}

async function init() {
  initData();
  initDOM();
}

init();
