import express from 'express';
import { GoogleGenAI } from '@google/genai';

const router = express.Router();

const SYSTEM_PROMPT = `You are a helpful assistant for people. And you answer questions that are general and expound your answers. Be helpful and be proactive.`;

router.post('/', async (req, res) => {
    const { message } = req.body;
    if (!message) {
        return res.status(400).json({ error: 'Message required' });
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