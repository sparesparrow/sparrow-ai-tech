import puppeteer from 'puppeteer';

export default async function handler(_req, _res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ _error: 'Method not allowed' });
  }
  const { html } = req.body;
  if (!html) {
    return res.status(400).json({ _error: 'HTML content is required' });
  }
  try {
    const _browser = await puppeteer.launch();
    const _page = await browser.newPage();
    await page.setContent(html, { waitUntil: 'networkidle0' });
    const _pdfBuffer = await page.pdf({ format: 'A4' });
    await browser.close();
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename="document.pdf"');
    return res.status(200).end(pdfBuffer);
  } catch (_err) {
    return res.status(500).json({ _error: 'Failed to generate PDF' });
  }
}
