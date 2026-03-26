import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

// Brand guidelines embedded directly to avoid file path issues on Railway
const BRAND_GUIDELINES = `
BRAND GUIDELINES:
# Edge Brand Guidelines — Sales Content Generation

## Company
- Name: Edge (legal: Edge Services and Solutions, LLC)
- Tagline: Match Your Ambition
- Vision: To reimagine how the world works
- Mission: To connect the dots between impactful jobs and great global hires
- Value Prop: Hire World-Class Talent, Fully Managed
- Website: onedge.co
- Platform Type: Managed Talent Platform (NOT a staffing agency, NOT a BPO)

## Brand Voice
- Archetype: The Trusted Coach — patient, supportive, warm, direct, encouraging, clear
- Use clear, direct language — avoid jargon
- Lead with outcomes and data
- Never use diminishing language like "resources" for people — use "professionals" or "talent"
- Never describe Edge talent as "the cheaper option" — focus on value

## Industries Served
Healthcare, Dental, Insurance, Accounting, Physical Therapy, Veterinary

## Key Messaging
- Campus-based professionals (not freelancers, not work-from-home)
- Fully managed — Edge handles hiring, training, compliance, equipment, IT, retention
- 60-70% cost reduction vs. U.S.-based hiring
- Edge Edu certification — only 2-4% of applicants pass
- Employer of Record (EOR) — Edge handles payroll, benefits, taxes, HR
- Dedicated Relationship Manager per client
- HIPAA compliant: secured campus, VPN, biometric access, enterprise equipment
- $0 replacement guarantee — average 7-day replacement

## Key Stats
- 97% retention rate at 12 months
- 7-day average match time
- 1,000+ professionals placed
- 500+ businesses served
- $50M+ client savings
- 4.9/5 satisfaction score

## Customer Testimonials
- Jose Melendez, Melendez Insurance: "Edge is in a tier of their own" — 30% YoY growth
- Dr. Jyothi Mamidi Juarez, Partners in Endocrinology: "The backbone of my practice"
- DHR Health: 75 professionals placed, 97% retention
- John T. Shen, DDS: "A beacon of hope in desperate times"

## Visual Style for HTML Output
- Use headings with h1, h2, h3 tags
- Use blockquote for testimonials
- Use strong/em for emphasis
- Use bullet lists for feature lists
- Use tables for comparisons
- Structure: headline > subtitle > challenges/solutions > stats > roles > compliance > testimonial > CTA
`;

export async function generateSalesContent(prompt: string): Promise<string> {
  const response = await client.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 4096,
    system:
      'You are a sales content specialist for Edge (onedge.co). Generate professional, brand-aligned sales content based on the user\'s request. ' +
      'Output well-structured HTML using headings (<h1>, <h2>, <h3>), paragraphs (<p>), lists (<ul>, <ol>), ' +
      'bold (<strong>), italic (<em>), blockquotes (<blockquote>), and tables where appropriate. ' +
      'Do NOT include <html>, <head>, or <body> wrapper tags — just the inner content HTML. ' +
      'Do NOT wrap the output in markdown code blocks. Just output raw HTML directly. ' +
      'Make the content compelling, persuasive, data-driven, and ready for professional use. ' +
      'Always include relevant Edge stats (97% retention, 7-day match, 60-70% savings). ' +
      'Include at least one customer testimonial quote in a blockquote. ' +
      'End with a clear call-to-action section.' +
      BRAND_GUIDELINES,
    messages: [{ role: 'user', content: prompt }],
  });

  const textBlock = response.content.find((block) => block.type === 'text');
  if (!textBlock || textBlock.type !== 'text') {
    throw new Error('No text content in Claude response');
  }
  return textBlock.text;
}
