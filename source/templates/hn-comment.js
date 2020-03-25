import { html } from "common-tags";

/** Turn a Comment object into HTML */
export const hnComment = comment =>
  html`
    <div class="friendReviews elementListBrown">
      <div class="section">
        <div class="review">
          <link href="${comment.url}" />
          <a
            title="${comment.user.username}"
            class="left imgcol"
            href="${comment.user.url}"
          >
            <img
              alt="${comment.user.username}"
              src="${comment.user.gravatarUrl}"
            />
          </a>

          <div class="left bodycol">
            <div class="reviewHeader uitext stacked">
              <a class="reviewDate createdAt right" href="${comment.url}">
                ${comment.date}
              </a>

              <span>
                <a
                  title="${comment.user.username}"
                  class="user"
                  name="${comment.user.username}"
                  href="${comment.user.url}"
                >
                  ${comment.user.username}
                </a>
              </span>

              <div>
                <span class="greyText">In thread:</span>
                <a class="textColor reviewText" href="${comment.story.url}">
                  ${comment.story.title}
                </a>
              </div>
            </div>

            <div class="reviewText stacked">
              ${comment.clippedText
                ? html`
                    <span class="readable hn-comment expandable">
                      <span id="freeTextContainer${comment.objectId}">
                        ${comment.clippedText}
                      </span>
                      <span
                        id="freeText${comment.objectId}"
                        style="display:none"
                      >
                        ${comment.text}
                      </span>
                      <a
                        data-text-id="${comment.objectId}"
                        href="#"
                        style="display: inline;"
                        onclick="swapContent($(this));; return false;"
                        >...more</a
                      >
                    </span>
                  `
                : html`
                    <span class="readable hn-comment">
                      <span id="freeTextContainer${comment.objectId}">
                        ${comment.text}
                      </span>
                    </span>
                  `}
            </div>

            <div class="reviewFooter uitext buttons">
              <div class="updateActionLinks">
                <a href="${comment.url}">see comment</a>
              </div>
            </div>
          </div>

          <div class="clear"></div>
        </div>
      </div>
    </div>
  `;
