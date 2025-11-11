
export default function handler(req, res) {
  const quotes = [
    "Stay hungry, stay foolish.",
    "You miss 100% of the shots you don't take.",
    "The best time to start was yesterday. The next best time is now.",
    "Dream big. Start small. Act now.",
    "Do one thing every day that scares you."
  ];
  const quote = quotes[Math.floor(Math.random() * quotes.length)];
  res.status(200).json({ quote });
}