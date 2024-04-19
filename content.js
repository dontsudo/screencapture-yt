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
