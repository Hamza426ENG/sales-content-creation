import puppeteer from 'puppeteer-core';
import chromium from '@sparticuz/chromium';
import { wrapInHtml } from '../utils/htmlTemplate';
import { BRAND, getLogoWhiteBase64, getLogoPurpleBase64 } from '../utils/brand';

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
  const logoWhiteBase64 = getLogoWhiteBase64();
  const logoPurpleBase64 = getLogoPurpleBase64();

  const browser = await puppeteer.launch({
    args: chromium.args,
    defaultViewport: { width: 1280, height: 720 },
    executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || await chromium.executablePath(),
    headless: true,
  });

  try {
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: 'networkidle0' });

    // Puppeteer header — Edge logo + tagline badge
    const headerTemplate = `
      <div style="width:100%;display:flex;align-items:center;justify-content:space-between;padding:6px 50px;border-bottom:1px solid #F0F0F4;font-family:'DM Sans',system-ui,sans-serif;">
        <img src="${logoPurpleBase64}" style="height:20px;" />
        <span style="font-size:8px;color:#4A0F70;border:1.5px solid #4A0F70;border-radius:100px;padding:3px 12px;font-weight:700;text-transform:uppercase;letter-spacing:1.5px;">${BRAND.tagline}</span>
      </div>`;

    // Puppeteer footer — Plum purple with white logo
    const footerTemplate = `
      <div style="width:100%;display:flex;align-items:center;justify-content:space-between;padding:8px 50px;background:#4A0F70;font-family:'DM Sans',system-ui,sans-serif;font-size:8px;color:rgba(255,255,255,0.75);">
        <div>
          <img src="${logoWhiteBase64}" style="height:13px;" />
          <div style="margin-top:2px">${BRAND.address}</div>
          <div>${BRAND.website}</div>
        </div>
        <div style="text-align:right">
          &copy; ${new Date().getFullYear()} ${BRAND.fullName}.<br/>All rights reserved.
        </div>
      </div>`;

    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      displayHeaderFooter: true,
      headerTemplate: headerTemplate,
      footerTemplate: footerTemplate,
      margin: { top: '28mm', bottom: '28mm', left: '0mm', right: '0mm' },
    });
    return Buffer.from(pdfBuffer);
  } finally {
    await browser.close();
  }
}
