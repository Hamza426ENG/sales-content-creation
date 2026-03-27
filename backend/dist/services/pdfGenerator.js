"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generatePdf = generatePdf;
const puppeteer_core_1 = __importDefault(require("puppeteer-core"));
const chromium_1 = __importDefault(require("@sparticuz/chromium"));
const htmlTemplate_1 = require("../utils/htmlTemplate");
const brand_1 = require("../utils/brand");
function extractTitle(content) {
    const match = content.match(/<h1[^>]*>(.*?)<\/h1>/i);
    if (match) {
        return match[1].replace(/<[^>]+>/g, '').trim();
    }
    return 'Sales Content';
}
async function generatePdf(content) {
    const title = extractTitle(content);
    const html = (0, htmlTemplate_1.wrapInHtml)(content, title);
    const logoWhiteBase64 = (0, brand_1.getLogoWhiteBase64)();
    const logoPurpleBase64 = (0, brand_1.getLogoPurpleBase64)();
    const browser = await puppeteer_core_1.default.launch({
        args: chromium_1.default.args,
        defaultViewport: { width: 1280, height: 720 },
        executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || await chromium_1.default.executablePath(),
        headless: true,
    });
    try {
        const page = await browser.newPage();
        await page.setContent(html, { waitUntil: 'networkidle0' });
        // Puppeteer header — Edge logo + tagline badge
        const headerTemplate = `
      <div style="width:100%;display:flex;align-items:center;justify-content:space-between;padding:6px 50px;border-bottom:1px solid #F0F0F4;font-family:'DM Sans',system-ui,sans-serif;">
        <img src="${logoPurpleBase64}" style="height:20px;" />
        <span style="font-size:8px;color:#4A0F70;border:1.5px solid #4A0F70;border-radius:100px;padding:3px 12px;font-weight:700;text-transform:uppercase;letter-spacing:1.5px;">${brand_1.BRAND.tagline}</span>
      </div>`;
        // Puppeteer footer — Plum purple with white logo
        const footerTemplate = `
      <div style="width:100%;display:flex;align-items:center;justify-content:space-between;padding:8px 50px;background:#4A0F70;font-family:'DM Sans',system-ui,sans-serif;font-size:8px;color:rgba(255,255,255,0.75);">
        <div>
          <img src="${logoWhiteBase64}" style="height:13px;" />
          <div style="margin-top:2px">${brand_1.BRAND.address}</div>
          <div>${brand_1.BRAND.website}</div>
        </div>
        <div style="text-align:right">
          &copy; ${new Date().getFullYear()} ${brand_1.BRAND.fullName}.<br/>All rights reserved.
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
    }
    finally {
        await browser.close();
    }
}
//# sourceMappingURL=pdfGenerator.js.map