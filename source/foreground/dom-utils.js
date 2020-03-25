import { Book } from "../lib/objects";
import { hnCommentsContainer } from "../templates/hn-comments-container";
import browser from "webextension-polyfill";
import select from "select-dom";

/** Find Author, Title from DOM */
export function selectBookFromPage() {
  const title = select("#bookTitle").textContent.trim();
  const author = select("div.bookAuthorProfile__name").textContent.trim();
  return new Book(title, author);
}

export function insertLoader() {
  const loader = document.createElement("img");
  loader.src = browser.runtime.getURL("assets/loader.gif");
  loader.className = "pageLoadingAnimation";
  loader.id = "hn-loader";
  select("#hn-comments-list").append(loader);
}

/** Everything that can be run only when the page is fully ready */
export function initDOM() {
  elementReady("#friendReviews").then(friendReviews => {
    friendReviews.insertAdjacentHTML("beforebegin", hnCommentsContainer);
    insertLoader();
  });
}

/**
 * MIT Licensed
 * Author: jwilson8767
 * From: https://gist.github.com/jwilson8767/db379026efcbd932f64382db4b02853e
 *
 * Waits for an element satisfying selector to exist, then resolves promise with the element.
 * Useful for resolving race conditions.
 *
 * @param {string} selector
 * @returns {Promise} a promise containing selector
 */
export function elementReady(selector) {
  return new Promise(resolve => {
    const element = document.querySelector(selector);
    if (element) {
      resolve(element);
    }

    new MutationObserver((mutationRecords, observer) => {
      // Query for elements matching the specified selector
      [...document.querySelectorAll(selector)].forEach(element => {
        resolve(element);
        // Once we have resolved we don't need the observer anymore.
        observer.disconnect();
      });
    }).observe(document.documentElement, {
      childList: true,
      subtree: true
    });
  });
}
