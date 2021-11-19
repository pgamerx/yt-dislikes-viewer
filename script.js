// This is a modified script from the original one by aquelemiguel.
chrome.storage.sync.get("savedApi", ({ savedApi }) => {
  (function () {
    const YT_API_KEY = savedApi;
    const BASE_ENDPOINT = "https://www.googleapis.com/youtube/v3";

    const video_id = new URLSearchParams(window.location.search).get("v");
    async function fetch_from_repl(vid) {
      fetch(
        `https://yt-dislikes-viewer-api.websitedesigne1.repl.co/data/get?video_id=${vid}`
      )
        .then((response) => response.json())
        .then((data) => {
          if (!data || !data[0]) return 010101;
          if (data[0] == "nope") return false;
          console.log(data);
          return parseInt(data[0]);
        })
        .catch((error) => {
          console.log(error);
        });
    }

    async function put_on_repl(vid, count) {
      const url = `https://yt-dislikes-viewer-api.websitedesigne1.repl.co/data/put?video_id=${vid}&dislike_count=${count}`;
      fetch(url)
        .then((response) => response.json())
        .then((json) => console.log(json));
      console.log(await response.json());
    }
    async function run() {
      if (
        !(await fetch_from_repl(video_id)) ||
        (await fetch_from_repl(video_id)) == 010101
      ) {
        fetchDislikes(video_id).then(async (dislikeNo) => {
          if (dislikeNo) console.log(dislikeNo);
          editDislikes(dislikeNo);
          await put_on_repl(video_id, parseInt(dislikeNo));
        });
        console
          .log("Putting on Archieve API")
          .catch((err) => console.error(err));
      } else {
        const disss = await fetch_from_repl(video_id);
        console.log(disss + " " + " disss ");
        editDislikes(disss);
        console.log("Fetched from archieve API");
      }
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
        numStr.length === 3 || numStr.length === 2
          ? num.toFixed(0) + unit
          : num.toFixed(1) + unit;
      return result;
    }
    async function fetchDislikes(videoId) {
      if (!videoId) {
        videoID = new URLSearchParams(window.location.search).get("v");
      }
      const endpoint = `${BASE_ENDPOINT}/videos?key=${YT_API_KEY}&id=${videoId}&part=statistics`;

      return fetch(endpoint)
        .then((r) => r.json())
        .then((r) => parseInt(r.items[0].statistics.dislikeCount));
    }

    function editDislikes(dislikeNo) {
      // Fetch the dislike label
      const selector =
        "ytd-menu-renderer.ytd-video-primary-info-renderer > div > :nth-child(2) yt-formatted-string";
      const dislikeLabel = document.querySelector(selector);
      var progress = document.createElement("div");
      progress.innerHTML = "";
      let parentNode = document.getElementById("menu-container");
      progress.setAttribute("class", "style-scope ytd-sentiment-bar-renderer");
      progress.setAttribute("id", "like-bar");

      parentNode.appendChild(progress);
      // Update the label with the new dislike count
      const formattedDislikes = numberToAbbreviatedString(dislikeNo);
      dislikeLabel.textContent = formattedDislikes;
      progress.style.maxWidth = "40%";
      progress.style.Width = `${formattedDislikes}%`;
    }

    // removes the like bar each time the url changes otherwise duplicates.
    chrome.runtime.onMessage.addListener(function (
      request,
      sender,
      sendResponse
    ) {
      // listen for messages sent from background.js
      if (request.message === "progressBar") {
        let progressBar = document.getElementById("like-bar");
        progressBar.parentElement.removeChild(progressBar);
      }
    });
    run();
  })();
});
