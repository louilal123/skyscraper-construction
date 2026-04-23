// server\routes\chat.ts
import express from 'express';
import Groq from 'groq-sdk';

const router = express.Router();

// Groq client reads GROQ_API_KEY automatically from environment
const groq = new Groq();

const SYSTEM_PROMPT = `You are a helpful assistant for Skyscraper Construction and Engineering Services. You answer general questions clearly and concisely.`;

router.post('/', async (req, res) => {
    const { message } = req.body;
    if (!message) {
        return res.status(400).json({ error: 'Message required' });
    }

    try {
        const chatCompletion = await groq.chat.completions.create({
            messages: [
                { role: 'system', content: SYSTEM_PROMPT },
                { role: 'user', content: message },
            ],
            model: 'llama-3.3-70b-versatile', // or any other Groq-supported model
            temperature: 0.7,                 // 0 = factual, 1 = creative
            max_tokens: 1024,
        });

        const reply = chatCompletion.choices[0]?.message?.content || 'No response generated.';
        res.json({ reply });
    } catch (error: any) {
        console.error('Groq error:', error?.message || error);
        res.status(500).json({ error: 'AI service unavailable' });
    }
});

export default router;