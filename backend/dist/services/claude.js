"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateSalesContent = generateSalesContent;
const sdk_1 = __importDefault(require("@anthropic-ai/sdk"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const client = new sdk_1.default({
    apiKey: process.env.ANTHROPIC_API_KEY,
});
function loadBrandGuidelines() {
    const guidelinesPath = path_1.default.join(__dirname, '../../brand-guidelines.md');
    if (fs_1.default.existsSync(guidelinesPath)) {
        return '\n\nBRAND GUIDELINES:\n' + fs_1.default.readFileSync(guidelinesPath, 'utf-8');
    }
    return '';
}
async function generateSalesContent(prompt) {
    const brandContext = loadBrandGuidelines();
    const response = await client.messages.create({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 4096,
        system: 'You are a sales content specialist. Generate professional, brand-aligned sales content based on the user\'s request. ' +
            'Output well-structured HTML using headings (<h1>, <h2>, <h3>), paragraphs (<p>), lists (<ul>, <ol>), ' +
            'bold (<strong>), and italic (<em>) tags. Do NOT include <html>, <head>, or <body> wrapper tags — just the inner content HTML. ' +
            'Do NOT wrap the output in markdown code blocks. Just output raw HTML directly. ' +
            'Make the content compelling, persuasive, and ready for professional use.' +
            brandContext,
        messages: [{ role: 'user', content: prompt }],
    });
    const textBlock = response.content.find((block) => block.type === 'text');
    if (!textBlock || textBlock.type !== 'text') {
        throw new Error('No text content in Claude response');
    }
    return textBlock.text;
}
//# sourceMappingURL=claude.js.map