// This is a modified script from the original one by aquelemiguel.
chrome.storage.sync.get("primary", ({ primary }) => {
  chrome.storage.sync.get("secondary", ({ secondary }) => {
    (function () {
      const BASE_ENDPOINT = "https://returnyoutubedislikeapi.com/votes";

      const video_id = new URLSearchParams(window.location.search).get("v");
      async function run() {
        const info = await fetchInfo(video_id);
        const percentage_like = likePercentage(
          parseInt(info.likes),
          parseInt(info.dislikes)
        );
        addBar(info.likes, info.dislikes, percentage_like);

        editDislikes(info.dislikes);
        console.catch((err) => console.error(err));
      }
      function numberToAbbreviatedString(number) {
        let result = "";
        let num = number;
        let unit = "";
        let numStr = num.toString();
        if (numStr.length > 3) {
          num = num / 1000;
          unit = "K";
        }
        if (numStr.length > 6) {
          num = num / 1000;
          unit = "M";
        }
        if (numStr.length > 9) {
          num = num / 1000;
          unit = "B";
        }
        result =
          numStr.length <= 3 && unit === ""
            ? num.toFixed(0) + unit
            : num.toFixed(1) + unit;
        return result;
      }
      async function fetchInfo(videoId) {
        if (!videoId) {
          videoId = new URLSearchParams(window.location.search).get("v");
        }
        const endpoint = `${BASE_ENDPOINT}?videoId=${videoId}`;

        return fetch(endpoint)
          .then((r) => r.json())
          .then(
            (r) =>
              (values = {
                dislikes: parseInt(r.dislikes),
                likes: parseInt(r.likes),
              })
          );
      }
      function editDislikes(dislikeNo) {
        let selector;

        // Fetch the dislike label
        // checks for new UI of youtube or Old one
        const selectorOldUi =
          "ytd-menu-renderer.ytd-video-primary-info-renderer > div > :nth-child(2) yt-formatted-string";
        const selectorNewUi =
          "ytd-menu-renderer.ytd-watch-metadata > div > :nth-child(2) yt-formatted-string";

        const checkForNewUI = document.getElementById(
          "description-and-actions"
        );
        if (checkForNewUI) {
          selector = selectorNewUi;
        } else {
          selector = selectorOldUi;
        }

        const dislikeLabel = document.querySelector(selector);
        // Update the label with the new dislike count
        const formattedDislikes = numberToAbbreviatedString(dislikeNo);
        if (formattedDislikes === "NaN") {
          run();
          let progressBar = document.getElementById("custom-progress");
          progressBar.parentElement.removeChild(progressBar);
        } else if (formattedDislikes !== "NaN") {
          dislikeLabel.textContent = formattedDislikes;
        }
      }

      function likePercentage(likeCount, dislikeCount) {
        return (100 * likeCount) / (likeCount + dislikeCount);
      }

      function addBar(likes, dislikes, likePercentage) {
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
          const tooltip = document.createElement("div");
          const color = document.createElement("div");

          // Fix for Dark youtube Mode and Light youtube mode

          let colorBackground;
          let progressBackround;

          let darkMode = document
            .getElementsByTagName("html")[0]
            .getAttribute("dark");

          const reg = /^#[0-9A-F]{6}$/i;
          if (
            !primary ||
            !secondary ||
            !reg.test(primary) ||
            !reg.test(secondary)
          ) {
            if (darkMode) {
              progressBackround = "grey";
              colorBackground = "white";
            } else {
              colorBackground = "black";
              progressBackround = "grey";
            }
          } else {
            colorBackground = primary;
            progressBackround = secondary;
          }
          progress.className = "progress";
          progress.style.position = "relative";
          progress.style.height = "3px";
          progress.style.width = "40%";
          progress.style.background = `${progressBackround}`;
          progress.style.marginright = "20px";
          progress.setAttribute("id", "custom-progress");
          progress.style.marginTop = "3px";
          color.className = "color";
          color.style.position = "absolute";
          color.style.background = `${colorBackground}`;
          color.style.width = `${likePercentage}%`;
          color.style.height = "3px";
          color.setAttribute("id", "color");

          progress.addEventListener("mouseover", () => {
            tooltip.innerHTML = `
          <!--<tp-yt-paper-tooltip position="top" class="" role="tooltip" tabindex="-1" style="left: 25.6833px; bottom: -64px;"><!--css-build:shady-->
          <div id="tooltip" class="style-scope tp-yt-paper-tooltip visible" style="background:#616161; max-width:110px; Position:Absolute; Z-Index: 4">
          ${likes} / ${dislikes}
        </tp-yt-paper-tooltip>
          `;

            selector.appendChild(tooltip);
          });
          progress.addEventListener("mouseout", () => {
            tooltip.parentNode.removeChild(tooltip);
          });

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

      chrome.runtime.onMessage.addListener(function (
        request,
        sender,
        sendResponse
      ) {
        // listen for messages sent from background.js
        if (request.message === "progressbar") {
          let progressBar = document.getElementById("custom-progress");
          progressBar.parentElement.removeChild(progressBar);
        }
        // run();
      });
      run();
    })();
  });
});
