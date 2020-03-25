/**
 * @file Creates and handles pagination of comments
 * @example « previous 1 2 3 4 5 6 7 8 next »
 */
import { getCommentsPage } from "./content-script";
import { html } from "common-tags";
import { htmlToElement } from "@grrr/utils";
import { UNICODE_SPACE } from "../lib/constants";

/** Returns an assembled paginator ready to be displayed
 * @param {Paginator} paginator A description of the current paginator state
 * @returns {DocumentFragment} A DocumentFragment containing the HTML for a displayable paginator
 */
export function getPaginatorNode(paginator) {
  // Approach From: https://grrr.tech/posts/create-dom-node-from-html-string/
  const fragment = document.createDocumentFragment();
  const containerNode = getAppendedContainer(fragment);

  appendPreviousPage(paginator, containerNode);
  appendPageNumbers(paginator, containerNode);
  appendNextPage(paginator, containerNode);

  return fragment;
}

/** Returns the document fragment with a <div> added */
function getAppendedContainer(fragment) {
  const container = htmlToElement(html`
    <div class="uitext" id="hn-paginator"></div>
  `);
  fragment.append(container);
  const containerNode = fragment.querySelector("#hn-paginator");
  return containerNode;
}

/** Returns the document fragment with a "« previous" link added */
function appendPreviousPage(paginator, containerNode) {
  let previousPage;
  if (paginator.hasPreviousPage) {
    previousPage = htmlToElement(html`
      <a href="#hn-comments-top" class="previous_page">« previous</a>
    `);
    previousPage.addEventListener("click", () =>
      getCommentsPage(paginator.previousPage)
    );
  } else {
    previousPage = htmlToElement(html`
      <span class="previous_page disabled">« previous</span>
    `);
  }

  containerNode.append(previousPage);
}

/** Returns the document fragment with "1 2 3 4 5 6 7 8" links added */
function appendPageNumbers(paginator, containerNode) {
  for (let i = 0; i < paginator.totalPages; i++) {
    let pageNumber;
    if (i === paginator.currentPage) {
      pageNumber = htmlToElement(html`
        <em class="current">${i + 1}</em>
      `);
    } else {
      pageNumber = htmlToElement(html`
        <a href="#hn-comments-top">${i + 1}</a>
      `);
      pageNumber.addEventListener("click", () => getCommentsPage(i));
    }

    containerNode.append(UNICODE_SPACE, pageNumber);
  }
}

/** Returns the document fragment with "next »" link added */
function appendNextPage(paginator, containerNode) {
  let nextPage;
  if (paginator.hasNextPage) {
    nextPage = htmlToElement(html`
      <a href="#hn-comments-top" class="next_page">next »</a>
    `);
    nextPage.addEventListener("click", () =>
      getCommentsPage(paginator.nextPage)
    );
  } else {
    nextPage = htmlToElement(html`
      <span class="next_page disabled">next »</span>
    `);
  }

  containerNode.append(UNICODE_SPACE, nextPage);
}
