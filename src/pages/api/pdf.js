/* eslint-env node */

import puppeteer from 'puppeteer';

// Simple in-memory rate limiter (per IP, 10 requests/minute)
const rateLimitMap = new Map();
const RATE_LIMIT = 10;
const WINDOW_MS = 60 * 1000; // 1 minute

function getClientIp(request) {
  return request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
}

function checkRateLimit(ip) {
  const now = Date.now();
  let entry = rateLimitMap.get(ip);
  if (!entry || now - entry.start > WINDOW_MS) {
    entry = { count: 1, start: now };
  } else {
    entry.count += 1;
  }
  rateLimitMap.set(ip, entry);
  return entry.count <= RATE_LIMIT;
}

// GET handler - returns API documentation
export async function GET() {
  return new Response(
    JSON.stringify({
      service: 'Sparrow AI Tech PDF Generator API',
      version: '1.0.0',
      methods: ['POST'],
      usage: 'Send POST request with {"html": "your html content"} to generate PDF',
      status: 'active',
    }),
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
}

// POST handler - PDF generation functionality
export async function POST({ request }) {
  const ip = getClientIp(request);
  if (!checkRateLimit(ip)) {
    return new Response(JSON.stringify({ error: 'Too many requests' }), { status: 429 });
  }

  let body;
  try {
    body = await request.json();
  } catch (_e) {
    return new Response(JSON.stringify({ error: 'Invalid JSON' }), { status: 400 });
  }

  const { html } = body;
  if (!html) {
    return new Response(JSON.stringify({ error: 'Missing html' }), { status: 400 });
  }
  if (typeof html !== 'string' || html.length > 100000) {
    return new Response(JSON.stringify({ error: 'HTML too large (max 100,000 chars)' }), {
      status: 400,
    });
  }

  let browser;
  try {
    browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: 'networkidle0' });
    const pdfBuffer = await page.pdf({ format: 'A4' });
    await browser.close();
    return new Response(pdfBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="document.pdf"',
      },
    });
  } catch (_e) {
    if (browser) await browser.close();
    return new Response(JSON.stringify({ error: 'Failed to generate PDF' }), { status: 500 });
  }
}
