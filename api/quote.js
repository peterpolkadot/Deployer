
export default async function handler(req, res) {
  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + process.env.OPENAI_KEY"
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: "You generate short, inspiring quotes." },
          { role: "user", content: "Give me one uplifting original quote." }
        ],
        max_tokens: 40
      })
    });

    const data = await response.json();
    const quote = data.choices?.[0]?.message?.content?.trim() || "Keep going — you're doing great!";
    res.status(200).json({ quote });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
