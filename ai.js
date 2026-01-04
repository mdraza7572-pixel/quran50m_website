// ===== BASIC AI CHAT (STABLE) =====

const API_URL = "https://quran50m-backend.vercel.app/api/chat";

document.addEventListener("DOMContentLoaded", () => {
  const sendBtn = document.getElementById("sendBtn");
  const input = document.getElementById("userInput");

  if (sendBtn) sendBtn.addEventListener("click", sendMessage);
  if (input) {
    input.addEventListener("keypress", (e) => {
      if (e.key === "Enter") sendMessage();
    });
  }
});

async function sendMessage() {
  const input = document.getElementById("userInput");
  const body = document.getElementById("chatBody");

  if (!input || !body) return;

  const text = input.value.trim();
  if (!text) return;

  input.value = "";

  const userDiv = document.createElement("div");
  userDiv.className = "msg user-msg";
  userDiv.innerText = text;
  body.appendChild(userDiv);

  const botDiv = document.createElement("div");
  botDiv.className = "msg bot-msg";
  botDiv.innerText = "Soch raha hoon...";
  body.appendChild(botDiv);

  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: text })
    });

    const data = await res.json();
    const ans =
      data?.choices?.[0]?.message?.content ||
      "Abhi jawab nahi mil paaya.";

    botDiv.innerText = ans;
    body.scrollTop = body.scrollHeight;

  } catch (err) {
    console.error(err);
    botDiv.innerText = "Server error. Thodi der baad koshish karein.";
  }
}
