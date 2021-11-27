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

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  // read changeInfo data and do something with it
  // like send the new url to contentscripts.js
  if (changeInfo.url) {
    chrome.tabs.sendMessage(tabId, {
      message: "progressbar",
      url: changeInfo.url,
    });
  }
});
