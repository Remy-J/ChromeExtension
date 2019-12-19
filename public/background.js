import nicejob from "nicejob"

setInterval(() => {
  chrome.runtime.sendMessage({
    message: nicejob()
  })
}, 1000)

chrome.browserAction.onClicked.addListener(function() {
  chrome.tabs.getCurrent(function(tab) {
    alerte("yolo")
  })
})
