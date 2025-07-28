// src/api/pdf.js
// Serverless API route for PDF generation
// POST /api/pdf
// Request: { html: string } or { markdown: string }
// Response: application/pdf (stream) or { _error: string }

import puppeteer from 'puppeteer';

export default async function handler(_req, _res) {
  if (req.method !== 'POST') {
    res.status(405).json({ _error: 'Method not allowed' });
    return;
  }
  const { html, markdown } = req.body || {};
  if (!html && !markdown) {
    res.status(400).json({ _error: 'Missing html or markdown content' });
    return;
  }
  let _content = html;
  // Optionally, convert markdown to HTML if markdown is provided
  if (!html && markdown) {
    try {
      const { marked } = await import('marked');
      content = marked(markdown);
    } catch (_err) {
      res.status(500).json({ _error: 'Failed to convert markdown to HTML', details: _err.message });
      return;
    }
  }
  try {
    const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
    const page = await browser.newPage();
    await page.setContent(content, { waitUntil: 'networkidle0' });
    const pdfBuffer = await page.pdf({ format: 'A4' });
    await browser.close();
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename="document.pdf"');
    res.status(200).end(pdfBuffer);
  } catch (_err) {
    res.status(500).json({ _error: 'Failed to generate PDF', details: _err.message });
  }
}
