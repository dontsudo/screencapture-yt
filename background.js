chrome.commands.onCommand.addListener(async (command) => {
  if (command === "take-screenshot") {
    const [tab] = await chrome.tabs.query({
      active: true,
      currentWindow: true,
    });
    await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: takeScreenshot,
    });
  }
});

const takeScreenshot = () => {
  const video = document.querySelector("video");
  const canvas = document.createElement("canvas");
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  canvas.getContext("2d").drawImage(video, 0, 0, canvas.width, canvas.height);
  canvas.toBlob(async (blob) => {
    try {
      await navigator.clipboard.write([
        new ClipboardItem({ "image/png": blob }),
      ]);
      showMessage("Screenshot copied to clipboard!");
    } catch (error) {
      showMessage(`Failed to copy screenshot: ${error}`);
    }
  });
};
