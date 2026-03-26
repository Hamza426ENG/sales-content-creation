import puppeteer from 'puppeteer';
import { wrapInHtml } from '../utils/htmlTemplate';

function extractTitle(content: string): string {
  const match = content.match(/<h1[^>]*>(.*?)<\/h1>/i);
  if (match) {
    return match[1].replace(/<[^>]+>/g, '').trim();
  }
  return 'Sales Content';
}

export async function generatePdf(content: string): Promise<Buffer> {
  const title = extractTitle(content);
  const html = wrapInHtml(content, title);
  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  try {
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: 'networkidle0' });
    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: { top: '0mm', bottom: '0mm', left: '0mm', right: '0mm' },
    });
    return Buffer.from(pdfBuffer);
  } finally {
    await browser.close();
  }
}
