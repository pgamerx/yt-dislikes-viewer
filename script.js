// This is a highly modified script from the original one by aquelemiguel.

/* Import all the functions */
const {fetchInfo} = require('functions/fetchInfo.js');
const {editDislikes} = require('functions/editDislikes.js');
const {fetch_from_repl} = require('functions/fetch_from_repl.js');
const {put_on_repl} = require('functions/put_on_repl.js');
const {addBar, likePercentage} = require('functions/bar_fns.js');


const {numberToAbbreviatedString} = require('functions/numberToAbbreviatedString.js');

chrome.storage.sync.get("savedApi", ({ savedApi }) => {
  (function () {
    const YT_API_KEY = savedApi;
    const BASE_ENDPOINT = "https://www.googleapis.com/youtube/v3";

    const video_id = new URLSearchParams(window.location.search).get("v");
    async function run() {
      if (
        !(await fetch_from_repl(video_id)) ||
        (await fetch_from_repl(video_id)) == 010101
      ) {
        fetchInfo(BASE_ENDPOINT, YT_API_KEY,video_id).then(async (info) => {
          if (info) console.log(info);

          const like_amount = info.likes;
          const percentage_like = likePercentage(
            parseInt(like_amount),
            parseInt(Math.round(info.dislikes))
          );
          addBar(percentage_like);

          editDislikes(info.dislikes, numberToAbbreviatedString);
          await put_on_repl(video_id, parseInt(info.dislikes));
        });
        console
          .log("Putting on Archive API")
          .catch((err) => console.error(err));
      } else {
        const like_amount = fetchInfo(video_id).then(async (info) => {
          info.likes;
        });
        const percentage_like = likePercentage(parseInt(like_amount));
        addBar(percentage_like);
        // const like_amount = getLikes();
        // const percentage_like = likePercentage(parseInt(like_amount));
        // addBar(percentage_like);
        const disss = await fetch_from_repl(video_id);
        console.log(disss + " " + " disss ");
        editDislikes(disss);
        console.log("Fetched from the archive API");
      }
    }
    // function getLikes() {
    //   const count = document
    //     .querySelector(
    //       "ytd-menu-renderer.ytd-video-primary-info-renderer > div > :nth-child(1) yt-formatted-string"
    //     )
    //     .ariaLabel.replace(/[^\d-]/g, "");
    //   return parseInt(count);
    // }

    chrome.runtime.onMessage.addListener(function ( 
      request,
      sender,
      sendResponse
    ) {
      // listen for messages sent from background.js
      if (request.message === "progressbar") {
        // let test = document.querySelector(
        //   "ytd-menu-renderer.ytd-video-primary-info-renderer > div > :nth-child(2) yt-formatted-string"
        // );
        // test.parentNode.removeChild(test);
        let progressBar = document.getElementById("custom-progress");
        progressBar.parentElement.removeChild(progressBar);
      }
      // run();
    });
    run();
  })();
});
