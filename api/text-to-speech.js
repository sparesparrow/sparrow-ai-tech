// ElevenLabs Text-to-Speech Proxy Serverless Function
// Place this file in your `api/` directory for Netlify, Vercel, or similar platforms

const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY;
const ELEVENLABS_API_URL = 'https://api.elevenlabs.io/v1/text-to-speech';

export default async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const { text, voice_id } = req.body || {};
  if (!text || !voice_id) {
    res.status(400).json({ error: 'Missing text or voice_id' });
    return;
  }

  try {
    const apiRes = await fetch(`${ELEVENLABS_API_URL}/${voice_id}`, {
      method: 'POST',
      headers: {
        'xi-api-key': ELEVENLABS_API_KEY,
        'Content-Type': 'application/json',
        'Accept': 'audio/mpeg',
      },
      body: JSON.stringify({
        text,
        model_id: 'eleven_monolingual_v1',
        voice_settings: {
          stability: 0.5,
          similarity_boost: 0.5
        }
      })
    });

    if (!apiRes.ok) {
      const errorText = await apiRes.text();
      res.status(apiRes.status).json({ error: errorText });
      return;
    }

    res.setHeader('Content-Type', 'audio/mpeg');
    apiRes.body.pipe(res);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error', details: err.message });
  }
};
