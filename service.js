const youtubeRegex =
  /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
async function getVideoId(url) {
  const match = url.match(youtubeRegex);
  if (match && match[1]) {
    return match[1];
  }
  return false;
}

chrome.webNavigation.onCompleted.addListener((details) => {
  if (!getVideoId(details.url)) return;
  executeScript(details.tabId);
});

chrome.webNavigation.onHistoryStateUpdated.addListener((details) => {
  if (!getVideoId(details.url)) return;
  executeScript(details.tabId);
});

function executeScript(tabId) {
  chrome.scripting.executeScript({
    target: { tabId },
    files: ["script.js"],
  });
}

// listens for changes to the url so it can remove element from html
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if (changeInfo.url) {
    chrome.tabs.sendMessage(tabId, {
      message: "progressBar",
      url: changeInfo.url,
    });
  }
});
