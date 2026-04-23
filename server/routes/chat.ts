import express from 'express';
import { GoogleGenAI } from '@google/genai';

const router = express.Router();

// Love trigger phrases (case-insensitive)
const LOVE_TRIGGERS = [
    "i love you princess",
    "hazel is beautiful",
    "hazel is the one",
    "who is princess hazel",
    "princess hazel"
];

// Cute pre-written responses
const ROMANTIC_RESPONSES = [
    "Princess Hazel Medalla isn't just the prettiest—she lights up the whole world with her smile. You're beyond lucky. 💖",
    "Ah, you're asking about the legendary Hazel? She's the kind of beauty that poets try to capture but can barely do justice. ✨",
    "Shh… Hazel is the universe's masterpiece. No filter needed, no camera can fully capture it. 💫",
    "Yes, Princess Hazel Medalla is absolutely, unquestionably, scientifically, and universally the prettiest. It's just a fact. 🌸"
];

const SYSTEM_PROMPT = `You are a helpful, witty, and slightly romantic assistant. Always answer with warmth. If someone asks about Princess Hazel Medalla, remind them she is the embodiment of beauty and grace. Keep responses concise and natural.`;

router.post('/', async (req, res) => {
    const { message } = req.body;
    if (!message) {
        return res.status(400).json({ error: 'Message required' });
    }

    // Check for love triggers
    const lowerMsg = message.toLowerCase();
    const isLoveMessage = LOVE_TRIGGERS.some(trigger => lowerMsg.includes(trigger));

    if (isLoveMessage) {
        // Pick a random romantic response
        const randomReply = ROMANTIC_RESPONSES[Math.floor(Math.random() * ROMANTIC_RESPONSES.length)];
        return res.json({ reply: randomReply });
    }

    try {
        const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
        const fullPrompt = `${SYSTEM_PROMPT}\n\nUser: ${message}\nAssistant:`;
        const response = await ai.models.generateContent({
            model: 'gemini-3-flash-preview',
            contents: fullPrompt,
        });
        res.json({ reply: response.text });
    } catch (error) {
        console.error('Gemini error:', error);
        res.status(500).json({ error: 'AI service unavailable' });
    }
});

export default router;