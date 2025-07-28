import puppeteer from 'puppeteer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  const { html } = req.body;
  if (!html) {
    return res.status(400).json({ error: 'HTML content is required' });
  }
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: 'networkidle0' });
    const pdfBuffer = await page.pdf({ format: 'A4' });
    await browser.close();
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename="document.pdf"');
    return res.status(200).end(pdfBuffer);
  } catch (/* eslint-disable-line @typescript-eslint/no-unused-vars */ _err) {
    return res.status(500).json({ error: 'Failed to generate PDF' });
  }
}
