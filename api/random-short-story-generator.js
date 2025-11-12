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
          { role: "system", content: "You are a creative writing assistant that generates unique and imaginative short stories based on user requests." },
          { role: "user", content: "Please create a unique and engaging short story." }
        ],
        max_tokens: 300,
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