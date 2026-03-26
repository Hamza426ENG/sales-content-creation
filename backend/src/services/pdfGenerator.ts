import puppeteer from 'puppeteer-core';
import chromium from '@sparticuz/chromium';
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
    args: chromium.args,
    defaultViewport: { width: 1280, height: 720 },
    executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || await chromium.executablePath(),
    headless: true,
  });

  try {
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: 'networkidle0' });
    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: { top: '20mm', bottom: '22mm', left: '0mm', right: '0mm' },
    });
    return Buffer.from(pdfBuffer);
  } finally {
    await browser.close();
  }
}
