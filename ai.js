async function sendMessage() {
    const input = document.getElementById("userInput");
    const body = document.getElementById("chatBody");
    if (!input || !body) return;

    const text = input.value.trim();
    if (!text) return;

    const userDiv = document.createElement("div");
    userDiv.className = "msg user-msg";
    userDiv.innerText = text;
    body.appendChild(userDiv);
    input.value = "";

    const botDiv = document.createElement("div");
    botDiv.className = "msg bot-msg";
    botDiv.innerText = "Soch raha hoon...";
    body.appendChild(botDiv);
    body.scrollTop = body.scrollHeight;

    try {
        const res = await fetch(
            "https://quran50m-backend.vercel.app/api/chat",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    message: text
                })
            }
        );

        const data = await res.json();

        if (data.choices && data.choices[0]) {
            const ans = data.choices[0].message.content;
            botDiv.innerText = ans;
            speakAnswer(ans); // voice bolegi
        } else {
            botDiv.innerText = "Maaf karna, jawab nahi mila.";
        }

    } catch (err) {
        console.error(err);
        botDiv.innerText = "Server error.";
    }
}if(window.speechSynthesis) window.speechSynthesis.getVoices();

