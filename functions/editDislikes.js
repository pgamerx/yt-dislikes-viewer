"use strict";
export function editDislikes(dislikeNo, numberToAbbreviatedString) {
    let selector;

    // Fetch the dislike label
    // checks for new UI of youtube or Old one
    const selectorOldUi =
      "ytd-menu-renderer.ytd-video-primary-info-renderer > div > :nth-child(2) yt-formatted-string";
    const selectorNewUi =
      "ytd-menu-renderer.ytd-watch-metadata > div > :nth-child(2) yt-formatted-string";

    const checkForNewUI = document.getElementById("description-and-actions");
    if (checkForNewUI) {
      selector = selectorNewUi;
    } else {
      selector = selectorOldUi;
    }

    const dislikeLabel = document.querySelector(selector);
    // Update the label with the new dislike count
    const formattedDislikes = numberToAbbreviatedString(dislikeNo);
    dislikeLabel.textContent = formattedDislikes;
  }