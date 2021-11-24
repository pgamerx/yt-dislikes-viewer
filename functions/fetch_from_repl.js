"use strict";
export async function fetch_from_repl(vid) {
    fetch(
      `https://yt-dislikes-viewer-api.websitedesigne1.repl.co/data/get?video_id=${vid}`
    )
      .then((response) => response.json())
      .then((data) => {
        if (!data || !data[0]) return "e";
        if (data[0] == "nope") return false;
        console.log(data);
        return parseInt(data[0]);
      })
      .catch((error) => {
        console.log(error);
      });
  }