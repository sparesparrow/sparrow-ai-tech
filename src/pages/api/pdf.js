// POST /api/pdf
// Request body: { html: string }
// Response: PDF file (application/pdf)
// This endpoint generates a PDF from provided HTML using Puppeteer.

import puppeteer from 'puppeteer';

export async function post({ request }) {
  let body;
  try {
    body = await request.json();
  } catch (e) {
    return new Response(JSON.stringify({ error: 'Invalid JSON' }), { status: 400 });
  }

  const { html } = body;
  if (!html) {
    return new Response(JSON.stringify({ error: 'Missing html' }), { status: 400 });
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
  } catch (e) {
    if (browser) await browser.close();
    return new Response(JSON.stringify({ error: 'Failed to generate PDF' }), { status: 500 });
  }
}
