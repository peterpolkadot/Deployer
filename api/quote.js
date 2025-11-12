export default async function handler(req, res) {
  if (req.method !== 'GET' && req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + process.env.OPENAI_KEY
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: "You generate short, inspiring quotes." },
          { role: "user", content: "Give me one uplifting original quote." }
        ],
        max_tokens: 40,
        temperature: 0.9
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error("OpenAI API error: " + response.status + " - " + errorText);
    }

    const data = await response.json();
    const quote = data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content 
      ? data.choices[0].message.content.trim() 
      : "Keep going — you are doing great!";
    
    res.status(200).json({ quote });
  } catch (err) {
    console.error('Quote API error:', err);
    res.status(500).json({ 
      error: 'Failed to generate quote',
      message: err.message 
    });
  }
}
