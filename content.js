const showMessage = (message, duration = 2000) => {
  const div = document.createElement("div");
  Object.assign(div.style, {
    position: "fixed",
    top: "10px",
    right: "10px",
    padding: "10px",
    background: "rgba(0, 0, 0, 0.8)",
    color: "white",
    zIndex: 9999,
  });
  div.textContent = message;
  document.body.appendChild(div);
  setTimeout(() => div.remove(), duration);
};

const takeScreenshot = () => {
  const video = document.querySelector("video");
  const canvas = document.createElement("canvas");
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  canvas.getContext("2d").drawImage(video, 0, 0, canvas.width, canvas.height);
  canvas.toBlob((blob) => {
    navigator.clipboard.write([new ClipboardItem({ "image/png": blob })]).then(
      () => showMessage("Screenshot copied to clipboard!"),
      (error) => showMessage(`Failed to copy screenshot: ${error}`)
    );
  });
};

chrome.runtime.onMessage.addListener((request) => {
  if (request.action === "takeScreenshot") {
    takeScreenshot();
  }
});
