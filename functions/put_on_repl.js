"use strict";
export async function put_on_repl(vid, count) {
    const url = `https://yt-dislikes-viewer-api.websitedesigne1.repl.co/data/put?video_id=${vid}&dislike_count=${count}`;
    fetch(url)
      .then((response) => response.json())
      .then((json) => console.log(json));
    console.log(await response.json());
  }