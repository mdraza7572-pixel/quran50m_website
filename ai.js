export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST allowed" });
  }

  const userMessage = req.body?.message;
  if (!userMessage) {
    return res.status(400).json({ error: "Message required" });
  }

  const useGemini =
    userMessage.length > 180 ||
    userMessage.toLowerCase().includes("detail") ||
    userMessage.toLowerCase().includes("explain");

  // 🟢 Helper: LLaMA call
  async function callLlama() {
    const llamaRes = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "llama-3.1-8b-instant",
          messages: [
            {
              role: "system",
              content:
                "Tum ek polite Islamic AI ho. Hinglish me short aur respectful jawab do."
            },
            { role: "user", content: userMessage }
          ],
          temperature: 0.7,
          max_tokens: 200
        })
      }
    );

    const data = await llamaRes.json();
    return data;
  }

  try {
    // 🔵 TRY GEMINI FIRST (if needed)
    if (useGemini) {
      try {
        const geminiRes = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.GEMINI_API_KEY}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              contents: [
                {
                  parts: [
                    {
                      text:
                        "Tum ek polite Islamic AI ho. Hinglish me short aur respectful jawab do.\n\nUser: " +
                        userMessage
                    }
                  ]
                }
              ]
            })
          }
        );

        const geminiData = await geminiRes.json();
        const text =
          geminiData?.candidates?.[0]?.content?.parts?.[0]?.text;

        if (text) {
          return res.status(200).json({
            choices: [{ message: { content: text } }],
            model: "gemini"
          });
        }

        // ❗ Gemini fail → fallback
        const llamaFallback = await callLlama();
        return res.status(200).json(llamaFallback);

      } catch {
        const llamaFallback = await callLlama();
        return res.status(200).json(llamaFallback);
      }
    }

    // 🟢 Normal → LLaMA
    const llamaData = await callLlama();
    return res.status(200).json(llamaData);

  } catch (err) {
    return res.status(500).json({ error: "AI Server Error" });
  }
}
