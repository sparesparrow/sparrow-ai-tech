// src/api/pdf.js
// Serverless API route for PDF generation
// POST /api/pdf
// Request: { html: string } or { markdown: string }
// Response: application/pdf (stream) or { error: string }

import puppeteer from 'puppeteer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }
  const { html, markdown } = req.body || {};
  if (!html && !markdown) {
    res.status(400).json({ error: 'Missing html or markdown content' });
    return;
  }
  let content = html;
  // Optionally, convert markdown to HTML if markdown is provided
  if (!html && markdown) {
    try {
      const { marked } = await import('marked');
      content = marked(markdown);
    } catch (err) {
      res.status(500).json({ error: 'Failed to convert markdown to HTML', details: err.message });
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
  } catch (err) {
    res.status(500).json({ error: 'Failed to generate PDF', details: err.message });
  }
} 