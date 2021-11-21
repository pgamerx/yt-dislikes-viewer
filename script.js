// This is a highly modified script from the original one by aquelemiguel.
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
    async function AbbreviatedStringToNumber(count_in_string){
      const string = count_in_string.toLowerCase()
      if(string.endsWith("k")){
      const str = string.slice(0, -1)
      return parseFloat(str) * 1000
      }else if(string.endsWith("m")){
      const str = string.slice(0, -1); 
      return parseFloat(str) * 1000000;
      }
      else{
        const result = parseFloat(string)
        return result
      }
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
         const like_amoun = getLikes()
         const like_amount = AbbreviatedStringToNumber(like_amoun.toString)
         const percentage_like = likePercentage(parseInt(like_amount))
          addBar(percentage_like)
          editDislikes(dislikeNo);
          await put_on_repl(video_id, parseInt(dislikeNo));
        });
        console
          .log("Putting on Archive API")
          .catch((err) => console.error(err));
      } else {
        const like_amoun = getLikes()
        const like_amount = AbbreviatedStringToNumber(like_amoun.toString())
        const percentage_like = likePercentage(parseInt(like_amount))
         addBar(percentage_like)
        const disss = await fetch_from_repl(video_id);
        console.log(disss + " " + " disss ");
        editDislikes(disss);
        console.log("Fetched from the archive API");
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
        numStr.length == 3 ? num.toFixed(0) + unit : num.toFixed(1) + unit;
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

      // Update the label with the new dislike count
      const formattedDislikes = numberToAbbreviatedString(dislikeNo);
      dislikeLabel.textContent = formattedDislikes;
    }

    function getLikes(){
      const count = document.querySelector("ytd-menu-renderer.ytd-video-primary-info-renderer > div > :nth-child(1) yt-formatted-string").innerText;
     return parseInt(count)
     }

    function likePercentage(likeCount, dislikeCount){
      const first_step = dislikeCount/likeCount
      const percentage = first_step*100
      const result = 100-parseInt(percentage)
      return parseInt(result)
    }

    function addBar(likePercentage) {
      const selector = document.querySelector(
        "div#menu.style-scope.ytd-video-primary-info-renderer"
      );

      const prgroess = document.querySelector(".progress");

      if (prgroess) {
        return;
      }

      const progress = document.createElement("div");
      const color = document.createElement("div");

      progress.className = "progress";
      progress.style.position = "relative";
      progress.style.height = "3px";
      progress.style.width = "40%";
      progress.style.background = "#CDCDCD";

      color.className = "color";
      color.style.position = "absolute";
      color.style.background = "#065FD4";
      color.style.width = `${likePercentage}%`;
      color.style.height = "3px";

      progress.appendChild(color);

      selector.appendChild(progress);
    }

    run();
  })();
});
