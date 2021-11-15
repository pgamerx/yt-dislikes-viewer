// This is a modified script from the original one by aquelemiguel.
chrome.storage.sync.get('savedApi', ({savedApi}) => {
(function () {
  const YT_API_KEY = savedApi;
  const BASE_ENDPOINT = "https://www.googleapis.com/youtube/v3";

  async function run() {
    fetchDislikes()
      .then((dislikeNo) => editDislikes(dislikeNo))
      .catch((err) => console.error(err));
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
    result = num.toFixed(1) + unit;
    return result;
  }
  async function fetchDislikes() {
    const videoId = new URLSearchParams(window.location.search).get("v");
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

    // Update the label with the new dislike count
    const formattedDislikes = numberToAbbreviatedString(dislikeNo);
    dislikeLabel.textContent = formattedDislikes;
  }


  run();
})();

})
