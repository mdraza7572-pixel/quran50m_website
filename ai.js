module.exports = async function (req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST method allowed" });
  }

  try {
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ error: "Message required" });
    }

    const groqRes = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "llama-3.1-8b-instant",
          messages: [
            {
              role: "system",
              content:
                "Tum ek soft, polite aur respectful Islamic AI ho. Hinglish me short jawab do."
            },
            { role: "user", content: message }
          ],
          max_tokens: 200,
          temperature: 0.7
        })
      }
    );

    const data = await groqRes.json();
    return res.status(200).json(data);

  } catch (e) {
    console.error("ERROR:", e);
    return res.status(500).json({ error: "Backend crash" });
  }
};
