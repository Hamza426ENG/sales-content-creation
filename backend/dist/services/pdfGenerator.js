"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generatePdf = generatePdf;
const puppeteer_core_1 = __importDefault(require("puppeteer-core"));
const chromium_1 = __importDefault(require("@sparticuz/chromium"));
const htmlTemplate_1 = require("../utils/htmlTemplate");
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
    const browser = await puppeteer_core_1.default.launch({
        args: chromium_1.default.args,
        defaultViewport: { width: 1280, height: 720 },
        executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || await chromium_1.default.executablePath(),
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
    }
    finally {
        await browser.close();
    }
}
//# sourceMappingURL=pdfGenerator.js.map