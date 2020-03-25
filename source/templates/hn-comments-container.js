import { html } from "common-tags";

/** Template for the section on the page managed by hacker-reads */
export const hnCommentsContainer = html`
  <div id="hn-comments-container" class="clearFloats bigBox">
    <p>
      <a id="hn-comments-top" name="anchor"></a>
    </p>
    <div class="h2Container gradientHeaderContainer">
      <h2 class="brownBackground">Hacker News Reviews</h2>
    </div>
    <div class="bigBoxBody">
      <div class="bookReviewsPaginationCount">
        <span class="smallText" id="paginator-report"></span>
      </div>
      <div id="hn-comments-list"></div>
    </div>
    <div class="bigBoxBottom"></div>
  </div>
`;
