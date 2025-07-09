// POST /api/chatbot
// Request body: { message: string }
// Response: { reply: string } (or error)
// This endpoint proxies requests to the ElevenLabs API securely.

export async function post({ request }) {
  const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY;
  if (!ELEVENLABS_API_KEY) {
    return new Response(JSON.stringify({ error: 'Missing API key' }), { status: 500 });
  }

  let body;
  try {
    body = await request.json();
  } catch (e) {
    return new Response(JSON.stringify({ error: 'Invalid JSON' }), { status: 400 });
  }

  const { message } = body;
  if (!message) {
    return new Response(JSON.stringify({ error: 'Missing message' }), { status: 400 });
  }

  // Example: Forward to ElevenLabs API (replace with actual endpoint and payload as needed)
  const elevenLabsUrl = 'https://api.elevenlabs.io/v1/chat';
  try {
    const elevenRes = await fetch(elevenLabsUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'xi-api-key': ELEVENLABS_API_KEY,
      },
      body: JSON.stringify({ message }),
    });
    if (!elevenRes.ok) {
      const err = await elevenRes.text();
      return new Response(JSON.stringify({ error: err }), { status: elevenRes.status });
    }
    const data = await elevenRes.json();
    // Assume ElevenLabs returns { reply: string }
    return new Response(JSON.stringify({ reply: data.reply }), { status: 200 });
  } catch (e) {
    return new Response(JSON.stringify({ error: 'Failed to contact ElevenLabs API' }), {
      status: 502,
    });
  }
}
