"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateWord = generateWord;
const HTMLtoDOCX = require('html-to-docx');
const htmlTemplate_1 = require("../utils/htmlTemplate");
function extractTitle(content) {
    const match = content.match(/<h1[^>]*>(.*?)<\/h1>/i);
    if (match) {
        return match[1].replace(/<[^>]+>/g, '').trim();
    }
    return 'Sales Content';
}
async function generateWord(content) {
    const title = extractTitle(content);
    const html = (0, htmlTemplate_1.wrapInHtml)(content, title);
    const docxBuffer = await HTMLtoDOCX(html, null, {
        table: { row: { cantSplit: true } },
        footer: true,
        pageNumber: true,
        title: title,
        font: 'DM Sans',
        fontSize: 22,
    });
    return Buffer.from(docxBuffer);
}
//# sourceMappingURL=wordGenerator.js.map