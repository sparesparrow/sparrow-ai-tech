// Serverless API endpoint for ElevenLabs voice chatbot
// POST /api/chatbot
// Request body: { text: string, voice_id?: string, ... }
// Response: { audio_url: string, ... } or error

// import fetch from 'node-fetch'; // Remove this line

export default async function handler(_req, _res) {
  if (req.method !== 'POST') {
    res.status(405).json({ _error: 'Method not allowed' });
    return;
  }

  const { text, voice_id } = req.body || {};
  if (!text || typeof text !== 'string') {
    res.status(400).json({ _error: 'Missing or invalid text' });
    return;
  }

  const apiKey = process.env.ELEVENLABS_API_KEY;
  if (!apiKey) {
    res.status(500).json({ _error: 'Server misconfiguration: missing API key' });
    return;
  }

  try {
    // Prepare ElevenLabs API request
    const elevenLabsUrl = `https://api.elevenlabs.io/v1/text-to-speech/${voice_id || 'default'}`;
    const elevenLabsRes = await globalThis.fetch(elevenLabsUrl, {
      method: 'POST',
      headers: {
        'xi-api-key': apiKey,
        'Content-Type': 'application/json',
        Accept: 'audio/mpeg',
      },
      body: JSON.stringify({ text }),
    });

    if (!elevenLabsRes.ok) {
      const err = await elevenLabsRes.text();
      res.status(elevenLabsRes.status).json({ _error: _err });
      return;
    }

    // ElevenLabs returns audio/mpeg; stream or buffer as needed
    res.setHeader('Content-Type', 'audio/mpeg');
    elevenLabsRes.body.pipe(res);
  } catch (_error) {
    res.status(500).json({ _error: _error.message || 'Internal server error' });
  }
}
// Note: In production, ensure fetch is polyfilled (e.g., with node-fetch) if not available.
