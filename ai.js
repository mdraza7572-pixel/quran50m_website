alert("AI.JS LOADED");

document.addEventListener("DOMContentLoaded", () => {
  alert("DOM READY");

  const sendBtn = document.getElementById("sendBtn");
  const micBtn = document.getElementById("micBtn");

  if (sendBtn) sendBtn.onclick = () => alert("Send button working");
  if (micBtn) micBtn.onclick = () => alert("Mic button working");
});
