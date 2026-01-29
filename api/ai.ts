import { Hono } from 'hono';
import { GoogleGenAI } from '@google/genai';

export const aiRouter = new Hono();

aiRouter.post('/poem', async (c) => {
  // Obtain API key exclusively from process.env.API_KEY as per guidelines
  const apiKey = process.env.API_KEY;

  // Fix: Removed generic type argument from c.req.json() to resolve "Untyped function calls may not accept type arguments" error
  const body = (await c.req.json()) as any;
  const name = body?.name;

  if (!name) {
    return c.json({ error: 'Name is required' }, 400);
  }

  if (!apiKey) {
    return c.json({ error: 'API key not configured on server' }, 500);
  }

  try {
    // Fix: Initialize GoogleGenAI using process.env.API_KEY directly as per SDK requirements
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Write a very short, romantic, 4-line poem for someone named ${name} for Valentine's Day. Make it sweet and poetic.`,
      config: {
        temperature: 0.8,
        topP: 0.95,
      }
    });

    // Fix: Access response.text as a property instead of a method call
    return c.json({ poem: response.text });
  } catch (error: any) {
    console.error('Gemini API Error:', error);
    return c.json({ error: 'Failed to generate poem' }, 500);
  }
});
