import dayjs from "dayjs";
import clip from "text-clipper";
import DOMPurify from "dompurify";
import gravatarUrl from "gravatar-url";
import { COMMENTS_PER_PAGE } from "./constants";

/** Class describing a page index object - with some syntactic sugar
 *
 * Code and ideas contained in this class come from two projects:
 * 1. https://github.com/vanng822/pagination by Nguyen Van Nhu
 * 2. https://github.com/deoxxa/paginator by Conrad Pankoff
 *
 * Thanks to both of them for their extremely helpful contributions
 */
export class Paginator {
  /**
   * @param {Number} totalResults Total number of comments available from the API
   * @param {Number} totalPages Total number of pages available from the API
   * @param {Number} currentPage Current page requested from the API
   */
  constructor(totalResults, totalPages, currentPage) {
    this.totalResults = totalResults;
    this.totalPages = totalPages;
    this.currentPage = currentPage;
    this.hasPreviousPage = currentPage > 0;
    this.hasNextPage = currentPage + 1 < totalPages;
    this.previousPage = currentPage - 1;
    this.nextPage = currentPage + 1;
    this.pageReport = this.getPageReport();
  }

  /** Create Paginator object from API json */
  static fromJson(json) {
    return new Paginator(json.nbHits, json.nbPages, json.page);
  }

  /**
   * @example "Showing 1-30 of 232"
   * @returns {string} A string describing the number of comments per page
   *
   * Logic in this method is taken almost directly from https://github.com/vanng822/pagination/blob/5f46ece96bf2df5cc14596ce247eef3283f132ed/lib/pagination.js
   * which itself is part of https://github.com/vanng822/pagination by Nguyen Van Nhu
   */
  getPageReport() {
    let fromResult;
    let toResult;
    const rowsPerPage = COMMENTS_PER_PAGE;

    const string = (fromResult, toResult) =>
      `Showing ${fromResult}-${toResult} of ${this.totalResults}`;

    if (this.totalPages < 2) {
      fromResult = 1;
      toResult = this.totalResults;
      return string(fromResult, toResult);
    }

    fromResult = this.currentPage * rowsPerPage + 1;

    if (this.currentPage === this.totalPages - 1) {
      toResult = this.totalResults;
    } else {
      toResult = fromResult + rowsPerPage - 1;
    }

    return string(fromResult, toResult);
  }
}

/** Class describing story (thread) on HN */
export class Story {
  /**
   *
   * @param {string} title Thread title
   * @param {Number} storyId HN object number for thread
   */
  constructor(title, storyId) {
    this.title = title;
    this.storyId = storyId;
    this.url = `https://news.ycombinator.com/item?id=${this.storyId}`;
  }
}

/** Class describing a user on HN */
export class User {
  /**
   *
   * @param {string} username
   */
  constructor(username) {
    this.username = username;
    this.url = `https://news.ycombinator.com/user?id=${this.username}`;
    this.gravatarUrl = this.getGravatarUrl();
  }

  getGravatarUrl() {
    // Options here: https://en.gravatar.com/site/implement/images/
    return gravatarUrl(this.username, {
      size: 50,
      default: "retro"
    });
  }
}

/** Class describing a full comment to be used throughout the extension */
export class Comment {
  /**
   * @param {string} text Contents of comment in HTML
   * @param {Number} objectId The ID used by HN to identify a comment
   * @param {string} date An ISO_8601 date
   * @param {Story} story A Story object
   * @param {User} user A User object
   */
  constructor(text, objectId, date, story, user) {
    this.text = this.getSanitizedText(text);
    this.objectId = objectId;
    this.clippedText = this.getClippedText();
    this.date = this.getFormattedDate(date);
    this.story = story;
    this.user = user;
    this.url = `https://news.ycombinator.com/item?id=${objectId}`;
  }

  getSanitizedText(text) {
    return DOMPurify.sanitize(text);
  }

  /** Returns text to be displayed before a "more..." link
   * When the comment is longer than 500 characters, display
   * a 300 character short comment visible before clicking "more.."
   */
  getClippedText() {
    if (this.text.length >= 500) {
      return clip(this.text, 300, { html: true, indicator: "", maxLines: 5 });
    }

    return null;
  }

  /** Get date string used by Goodreads */
  getFormattedDate(date) {
    return dayjs(date).format("MMM MM, YYYY");
  }

  /** Transforms API json into Comment object */
  static fromHit(hit) {
    return new Comment(
      hit.comment_text,
      hit.objectID,
      hit.created_at,
      new Story(hit.story_title, hit.story_id),
      new User(hit.author)
    );
  }
}

/** Class describing a book to be searched */
export class Book {
  /**
   *
   * @param {string} title
   * @param {string} author
   */
  constructor(title, author) {
    this.title = this.getTitleOnly(title);
    this.author = author;
  }

  getTitleOnly(title) {
    return title.split(":")[0]; // Strip subtitles which come after colon
  }
}
