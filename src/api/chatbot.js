// Serverless API endpoint for ElevenLabs voice chatbot
// POST /api/chatbot
// Request body: { text: string, voice_id?: string, ... }
// Response: { audio_url: string, ... } or error

import fetch from 'node-fetch';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const { text, voice_id } = req.body || {};
  if (!text || typeof text !== 'string') {
    res.status(400).json({ error: 'Missing or invalid text' });
    return;
  }

  const apiKey = process.env.ELEVENLABS_API_KEY;
  if (!apiKey) {
    res.status(500).json({ error: 'Server misconfiguration: missing API key' });
    return;
  }

  try {
    // Prepare ElevenLabs API request
    const elevenLabsUrl = `https://api.elevenlabs.io/v1/text-to-speech/${voice_id || 'default'}`;
    const elevenLabsRes = await fetch(elevenLabsUrl, {
      method: 'POST',
      headers: {
        'xi-api-key': apiKey,
        'Content-Type': 'application/json',
        'Accept': 'audio/mpeg',
      },
      body: JSON.stringify({ text }),
    });

    if (!elevenLabsRes.ok) {
      const err = await elevenLabsRes.text();
      res.status(elevenLabsRes.status).json({ error: err });
      return;
    }

    // ElevenLabs returns audio/mpeg; stream or buffer as needed
    res.setHeader('Content-Type', 'audio/mpeg');
    elevenLabsRes.body.pipe(res);
  } catch (error) {
    res.status(500).json({ error: error.message || 'Internal server error' });
  }
} 