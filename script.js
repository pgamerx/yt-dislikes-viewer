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
     const dislikeNo = await fetchDislikes(video_id);
     console.log(dislikeNo)
          console.log(dislikeNo)
          const like_amount = getLikes();
          const percentage_like = likePercentage(
            AbbreviatedStringToNumber(like_amount),
            parseInt(dislikeNo)
          );
          addBar(percentage_like);
          editDislikes(dislikeNo);
          await put_on_repl(video_id, parseInt(dislikeNo));

          console
          .log("Putting on Archive API")
          .catch((err) => console.error(err));
      } else {
        const like_amount = getLikes();
        const disss = await fetch_from_repl(video_id);
        console.log(disss);
        const percentage_like = likePercentage(AbbreviatedStringToNumber(like_amount), parseInt(disss));
        console.log(like_amount)
        console.log(percentage_like)
        addBar(percentage_like);
        console.log(disss + " " + " disss ");
        editDislikes(disss);
        console.log("Fetched from the archive API");
      }
    }

function AbbreviatedStringToNumber(string){
    // Create a function that will convet abbrivated string to number
    // for eg- "1k" to 1000
    // "1m" to 1000000
    // "1b" to 1000000000
    // "1t" to 1000000000000
    // "1.1k" to 1100
    // "1.1m" to 1100000

    // Create a regex to match the abbrivated string
    const regex = /(\d+)([kmbt])/;
    // Check if the string matches the regex
    if(regex.test(string)){
        // Get the match
        const match = string.match(regex);
        // Get the number
        const number = parseFloat(string.slice(0, -1))
        console.log(match)
        // Get the abbrivated string
        const abbrivated = match[2];
        // Return the number
        return number * abbrivatedToNumber(abbrivated);
    }
    // If the string doesn't match the regex, return the string as a number
    return Number(string);  // Convert the string to a number
}
function abbrivatedToNumber(abbrivated){
    // Create a function that will convert abbrivated string to number
    // for eg- "k" to 1000
    // "m" to 1000000
    // "b" to 1000000000

    // Check if the abbrivated string is "k"
    if(abbrivated === "k"){
        // Return 1000
        return 1000;
    }
    // Check if the abbrivated string is "m"
    if(abbrivated === "m"){
        // Return 1000000
        return 1000000;
    }
    // Check if the abbrivated string is "b"
    if(abbrivated === "b"){
        // Return 1000000000
        return 1000000000;
    }
    else{
        // Return 1
        return 1;
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
        numStr.length <= 3 && unit === ""
          ? num.toFixed(0) + unit
          : num.toFixed(1) + unit;
      return result;
    }
    async function fetchDislikes(videoId) {
      if (!videoId) {
        videoId = new URLSearchParams(window.location.search).get("v");
      }
      const endpoint = `${BASE_ENDPOINT}/videos?key=${YT_API_KEY}&id=${videoId}&part=statistics`;

      return fetch(endpoint)
        .then((r) => r.json())
        .then((r) => {
          console.log(r)
          parseInt(r.items[0].statistics.dislikeCount)});
    }

    function editDislikes(dislikeNo) {
      // Fetch the dislike label
      const selector =
        "ytd-menu-renderer.ytd-video-primary-info-renderer > div > :nth-child(2) yt-formatted-string";
      const dislikeLabel = document.querySelector(selector);

      // Update the label with the new dislike count
      const formattedDislikes = numberToAbbreviatedString(dislikeNo);
      dislikeLabel.textContent = formattedDislikes;
    }

    function getLikes() {
      const count = document
        .querySelector(
          "ytd-menu-renderer.ytd-video-primary-info-renderer > div > :nth-child(1) yt-formatted-string"
        )
        .ariaLabel.replace(/[^\d-]/g, "");
      return parseInt(count);
    }

    function likePercentage(likeCount, dislikeCount) {
      return parseInt((100 * likeCount) / (likeCount + dislikeCount))
    }


    function addBar(likePercentage) {
      console.log(likePercentage)
      const selector = document.getElementById("menu-container");

      const prgroess = document.getElementById("custom-progress");

      let clipButton = document.querySelector('[aria-label="Clip"]');
      let ThanksButton = document.querySelector('[aria-label="Thanks"]');
      // const clipButton = document.querySelectorAll(
      //   "yt-formatted-string#text.style-scope.ytd-button-renderer.style-default.size-default"
      // );

      // const thanksButton = document.querySelectorAll(
      //   "yt-formatted-string#text.style-scope.ytd-button-renderer.style-default.size-default"
      // );

      if (prgroess) {
        return;
      }

      const progress = document.createElement("div");
      const color = document.createElement("div");

      progress.className = "progress";
      progress.style.position = "relative";
      progress.style.height = "3px";
      progress.style.width = "40%";
      progress.style.background = "rgb(171 17 17)";
      progress.style.marginright = "20px";
      progress.setAttribute("id", "custom-progress");
      color.className = "color";
      color.style.position = "absolute";
      color.style.background = "#CC0000";
      color.style.width = `${parseInt(likePercentage)}%`;
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

    chrome.runtime.onMessage.addListener(function (
      request,
      sender,
      sendResponse
    ) {
      // listen for messages sent from background.js
      if (request.message === "progressbar") {
        let progressBar = document.querySelector(".progress");
        progressBar.parentElement.removeChild(progressBar);
      }
    });
    run();
  })();
});