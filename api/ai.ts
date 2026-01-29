import { Hono } from 'hono';
import { GoogleGenAI } from '@google/genai';

export const aiRouter = new Hono();

aiRouter.post('/poem', async (c) => {
  // Obtain API key exclusively from process.env.API_KEY as per guidelines
  const apiKey = process.env.API_KEY;

  if (!apiKey) {
    return c.json({ error: 'API key not configured on server' }, 500);
  }

  try {
    const body = (await c.req.json()) as { name?: string };
    const name = body?.name;

    if (!name) {
      return c.json({ error: 'Name is required' }, 400);
    }

    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Write a very short, romantic, 4-line poem for someone named ${name} for Valentine's Day. Make it sweet, poetic, and focused on the joy of meeting them.`,
      config: {
        temperature: 0.85,
        topP: 0.95,
      }
    });

    const poem = response.text || "Your presence is a gift, a dream come true,\nA world of color whenever I'm with you.\nIn every heartbeat, a song of sweet grace,\nMy favorite view is the smile on your face.";

    return c.json({ poem });
  } catch (error: any) {
    console.error('Gemini API Error:', error);
    return c.json({ error: 'Failed to generate poem' }, 500);
  }
});