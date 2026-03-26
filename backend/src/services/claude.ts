import Anthropic from '@anthropic-ai/sdk';
import fs from 'fs';
import path from 'path';

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

function loadBrandGuidelines(): string {
  const guidelinesPath = path.join(__dirname, '../../brand-guidelines.md');
  if (fs.existsSync(guidelinesPath)) {
    return '\n\nBRAND GUIDELINES:\n' + fs.readFileSync(guidelinesPath, 'utf-8');
  }
  return '';
}

export async function generateSalesContent(prompt: string): Promise<string> {
  const brandContext = loadBrandGuidelines();

  const response = await client.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 4096,
    system:
      'You are a sales content specialist. Generate professional, brand-aligned sales content based on the user\'s request. ' +
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
