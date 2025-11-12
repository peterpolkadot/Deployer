export default async function handler(req, res) {
    const jokes = [
        'I told my wife she was drawing her eyebrows too high. She looked surprised.',
        'Why don’t skeletons fight each other? They don’t have the guts.',
        'I used to play piano by ear, but now I use my hands.',
        'What do you call cheese that isn't yours? Nacho cheese.',
        'Why did the scarecrow win an award? Because he was outstanding in his field!'
    ];
    const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];
    res.status(200).json({ joke: randomJoke });
}