export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  
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
          { role: "system", content: "You are a humorous assistant that generates playful and light-hearted roasts for friends. Your comebacks should be funny and friendly, never hurtful." },
          { role: "user", content: "Give me a funny roast for a friend." }
        ],
        max_tokens: 150,
        temperature: 0.9
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error("OpenAI API error: " + response.status);
    }

    const data = await response.json();
    const result = data.choices && data.choices[0] && data.choices[0].message 
      ? data.choices[0].message.content.trim() 
      : "Error generating content";
    
    res.status(200).json({ result });
  } catch (err) {
    console.error('API error:', err);
    res.status(500).json({ 
      error: 'Failed to generate content',
      message: err.message 
    });
  }
}