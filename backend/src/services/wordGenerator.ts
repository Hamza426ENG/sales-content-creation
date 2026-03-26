const HTMLtoDOCX = require('html-to-docx');
import { wrapInHtml } from '../utils/htmlTemplate';

function extractTitle(content: string): string {
  const match = content.match(/<h1[^>]*>(.*?)<\/h1>/i);
  if (match) {
    return match[1].replace(/<[^>]+>/g, '').trim();
  }
  return 'Sales Content';
}

export async function generateWord(content: string): Promise<Buffer> {
  const title = extractTitle(content);
  const html = wrapInHtml(content, title);
  const docxBuffer = await HTMLtoDOCX(html, null, {
    table: { row: { cantSplit: true } },
    footer: true,
    pageNumber: true,
    title: title,
    font: 'DM Sans',
    fontSize: 22,
  });
  return Buffer.from(docxBuffer as ArrayBuffer);
}
