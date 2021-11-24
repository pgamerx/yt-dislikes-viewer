const youtubeRegex =
  /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
async function getVideoId(url) {
  const match = url.match(youtubeRegex);
  if (match && match[1]) {
    return match[1];
  }
  return false;
}

browser.webNavigation.onCompleted.addListener(async (details) => {
  if (!(await getVideoId(details.url))) return;
  executeScript(details.tabId);
});

browser.webNavigation.onHistoryStateUpdated.addListener(async (details) => {
  if (!(await getVideoId(details.url))) return;
  executeScript(details.tabId);
});

function executeScript(tabId) {
  browser.tabs.executeScript(tabId, {
    file: "script.js",
  });
}
browser.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  // read changeInfo data and do something with it
  // like send the new url to contentscripts.js
  if (changeInfo.url) {
    chrome.tabs.sendMessage(tabId, {
      message: "progressbar",
      url: changeInfo.url,
    });
  }
});
