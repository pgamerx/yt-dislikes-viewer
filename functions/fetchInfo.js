export async function fetchInfo(BASE_ENDPOINT, YT_API_KEY, videoId) {
    if (!videoId) {
      videoId = new URLSearchParams(window.location.search).get("v");
    }
    const endpoint = `${BASE_ENDPOINT}/videos?key=${YT_API_KEY}&id=${videoId}&part=statistics`;

    return fetch(endpoint)
      .then((r) => r.json())
      .then(
        (r) =>
          (values = {
            dislikes: parseInt(r.items[0].statistics.dislikeCount),
            likes: parseInt(r.items[0].statistics.likeCount),
          })
      );
  }

