// src/api/chatbot.js
// Serverless API route for ElevenLabs voice chatbot
// POST /api/chatbot
// Request: { text: string, voice_id?: string }
// Response: audio/mpeg (stream) or { error: string }

import fetch from 'node-fetch';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }
  const { text, voice_id } = req.body || {};
  if (!text) {
    res.status(400).json({ error: 'Missing text' });
    return;
  }
  const apiKey = process.env.ELEVENLABS_API_KEY;
  if (!apiKey) {
    res.status(500).json({ error: 'Server misconfiguration: missing API key' });
    return;
  }
  try {
    const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voice_id || 'default'}`, {
      method: 'POST',
      headers: {
        'xi-api-key': apiKey,
        'Content-Type': 'application/json',
        'Accept': 'audio/mpeg',
      },
      body: JSON.stringify({ text }),
    });
    if (!response.ok) {
      const err = await response.text();
      res.status(response.status).json({ error: err });
      return;
    }
    res.setHeader('Content-Type', 'audio/mpeg');
    response.body.pipe(res);
  } catch (err) {
    res.status(500).json({ error: 'Failed to contact ElevenLabs API', details: err.message });
  }
} 