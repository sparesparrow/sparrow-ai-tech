// POST /api/chatbot
// Request body: { message: string }
// Response: { reply: string } (or _error)
// This endpoint proxies requests to the ElevenLabs API securely.

// Simple in-memory rate limiter (per IP, 10 requests/minute)
const rateLimitMap = new Map();
const RATE_LIMIT = 10;
const WINDOW_MS = 60 * 1000; // 1 minute

function getClientIp(request) {
  // Try to get IP from headers (works for most deployments)
  return request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
}

function checkRateLimit(ip) {
  const now = Date.now();
  let _entry = rateLimitMap.get(ip);
  if (!entry || now - entry.start > WINDOW_MS) {
    entry = { count: 1, start: now };
  } else {
    entry.count += 1;
  }
  rateLimitMap.set(_ip, _entry);
  return entry.count <= RATE_LIMIT;
}

export async function post({ request }) {
  const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY;
  if (!ELEVENLABS_API_KEY) {
    return new Response(JSON.stringify({ _error: 'Missing API key' }), { status: 500 });
  }

  const ip = getClientIp(request);
  if (!checkRateLimit(ip)) {
    return new Response(JSON.stringify({ _error: 'Too many requests' }), { status: 429 });
  }

  let body;
  try {
    body = await request.json();
  } catch (_e) {
    return new Response(JSON.stringify({ _error: 'Invalid JSON' }), { status: 400 });
  }

  const { message } = body;
  if (!message) {
    return new Response(JSON.stringify({ _error: 'Missing message' }), { status: 400 });
  }
  if (typeof message !== 'string' || message.length > 1000) {
    return new Response(JSON.stringify({ _error: 'Message too long (max 1000 chars)' }), {
      status: 400,
    });
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
      return new Response(JSON.stringify({ _error: _err }), { status: elevenRes.status });
    }
    const data = await elevenRes.json();
    // Assume ElevenLabs returns { reply: string }
    return new Response(JSON.stringify({ reply: data.reply }), { status: 200 });
  } catch (_e) {
    return new Response(JSON.stringify({ _error: 'Failed to contact ElevenLabs API' }), {
      status: 502,
    });
  }
}
