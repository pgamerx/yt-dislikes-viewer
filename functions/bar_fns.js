"use strict";

export function likePercentage(likeCount, dislikeCount) {
    return (100 * likeCount) / (likeCount + dislikeCount);
  }

export function addBar(likePercentage) {
    // checks for new UI of youtube or Old
    const selectorOldUi = document.getElementById("menu-container");
    const selectorNewUi = document.getElementById("actions-inner");

    if (selectorOldUi || selectorNewUi) {
      let selector;
      if (selectorNewUi) {
        selector = selectorNewUi;
      } else {
        selector = selectorOldUi;
      }
      const prgroess = document.getElementById("custom-progress");

      let clipButton = document.querySelector('[aria-label="Clip"]');
      let ThanksButton = document.querySelector('[aria-label="Thanks"]');

      if (prgroess) {
        return;
      }
      const progress = document.createElement("div");
      const color = document.createElement("div");

      progress.className = "progress";
      progress.style.position = "relative";
      progress.style.height = "3px";
      progress.style.width = "40%";
      progress.style.background = "gray";
      progress.style.marginright = "20px";
      progress.setAttribute("id", "custom-progress");
      color.className = "color";
      color.style.position = "absolute";
      color.style.background = "white";
      color.style.width = `${likePercentage}%`;
      color.style.height = "3px";
      color.setAttribute("id", "color");

      if (clipButton) {
        progress.style.width = "32.5%";
      } else if (ThanksButton) {
        progress.style.width = "30.5%";
      }

      if (clipButton && ThanksButton) {
        progress.style.width = "25.5%";
      }

      progress.appendChild(color);

      selector.appendChild(progress);
    }
  }