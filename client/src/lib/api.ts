// client/src/lib/api.ts
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

export async function chatWithAI(message: string): Promise<string> {
    const response = await fetch(`${API_BASE_URL}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message }),
    });

    if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    return data.reply;
}