import PptxGenJS from 'pptxgenjs';
import path from 'path';
import { SlideData } from '../types';
import { BRAND } from '../utils/brand';

const LOGO_PATH = path.join(__dirname, '../../assets/logo.svg');

// Strip # from hex colors for pptxgenjs
const c = (hex: string) => hex.replace('#', '');

const COLORS = {
  plum: c(BRAND.colors.primary),        // #4A0F70 - primary brand, logo, headings, footer bg
  violet: c(BRAND.colors.primaryMid),    // #7C3AED - web accent
  lilacPale: c(BRAND.colors.primaryPale),// #E5D9F9 - cover page bg
  mauve: c(BRAND.colors.mauve),          // #C6AAFC - soft purple
  accent: c(BRAND.colors.accent),        // #059669 - green accents
  accentLight: c(BRAND.colors.accentLight),// #ECFDF5 - green card bg
  gold: c(BRAND.colors.gold),            // #D97706 - stats numbers
  dark: c(BRAND.colors.dark),            // #111827 - body text
  medium: c(BRAND.colors.medium),        // #4B5563 - secondary text
  muted: c(BRAND.colors.muted),          // #9CA3AF - muted text
  light: c(BRAND.colors.light),          // #FAFAFA - light bg
  border: c(BRAND.colors.borderLight),   // #F0F0F4 - borders
  white: c(BRAND.colors.white),          // #FFFFFF
};

export function parseSlideData(content: string): SlideData[] {
  try {
    const jsonMatch = content.match(/\[[\s\S]*\]/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
  } catch {
    // fallback to HTML parsing
  }

  const slides: SlideData[] = [];
  const sections = content.split(/<h[12][^>]*>/i).filter(Boolean);

  if (sections.length === 0) {
    slides.push({
      title: 'Sales Content',
      body: content.replace(/<[^>]+>/g, ''),
      layout: 'content',
    });
    return slides;
  }

  sections.forEach((section, i) => {
    const titleMatch = section.match(/^([^<]+)/);
    const title = titleMatch ? titleMatch[1].replace(/<\/h[12]>/i, '').trim() : `Slide ${i + 1}`;
    const remaining = section.replace(/^[^<]+<\/h[12]>/i, '');

    const bullets: string[] = [];
    const liRegex = /<li[^>]*>([\s\S]*?)<\/li>/gi;
    let match;
    while ((match = liRegex.exec(remaining)) !== null) {
      bullets.push(match[1].replace(/<[^>]+>/g, '').trim());
    }

    const bodyText = remaining
      .replace(/<ul[\s\S]*?<\/ul>/gi, '')
      .replace(/<ol[\s\S]*?<\/ol>/gi, '')
      .replace(/<[^>]+>/g, '')
      .trim();

    if (i === 0) {
      slides.push({ title, subtitle: bodyText || undefined, layout: 'title' });
    } else {
      slides.push({
        title,
        bullets: bullets.length > 0 ? bullets : undefined,
        body: bullets.length === 0 ? bodyText : undefined,
        layout: 'content',
      });
    }
  });

  slides.push({
    title: 'Ready to Get Started?',
    subtitle: `Book a Discovery Call Today\n\n${BRAND.website}`,
    layout: 'closing',
  });

  return slides;
}

function addBrandedFooter(slide: PptxGenJS.Slide, pptx: PptxGenJS, slideNum: number, isDark: boolean) {
  // Footer always uses Plum purple background with white text per brand guidelines
  slide.addShape(pptx.ShapeType.rect, {
    x: 0, y: 6.9, w: '100%', h: 0.6,
    fill: { color: COLORS.plum },
  });

  slide.addText(`© ${new Date().getFullYear()} ${BRAND.fullName}. All rights reserved.`, {
    x: 0.5, y: 6.95, w: 8, h: 0.4,
    fontSize: 8,
    fontFace: BRAND.fonts.body,
    color: 'CCCCCC',
  });

  slide.addText(`${BRAND.website}`, {
    x: 10, y: 6.95, w: 3, h: 0.4,
    fontSize: 8,
    fontFace: BRAND.fonts.body,
    color: 'CCCCCC',
    align: 'right',
  });
}

export async function generatePpt(content: string): Promise<Buffer> {
  const pptx = new PptxGenJS();

  pptx.layout = 'LAYOUT_WIDE';
  pptx.author = BRAND.company;
  pptx.company = BRAND.fullName;
  pptx.subject = 'Sales Content';

  const slides = parseSlideData(content);
  let slideNum = 0;

  for (const slideData of slides) {
    const slide = pptx.addSlide();
    slideNum++;

    if (slideData.layout === 'title') {
      // ===== COVER SLIDE — Lilac pale background per brand guidelines =====
      slide.background = { color: COLORS.lilacPale };

      // Logo top-left (Plum colored)
      try {
        slide.addImage({ path: LOGO_PATH, x: 0.6, y: 0.4, w: 1.6, h: 0.45 });
      } catch { /* */ }

      // Tagline badge top-right — Plum colored per brand guidelines
      slide.addShape(pptx.ShapeType.roundRect, {
        x: 10, y: 0.35, w: 2.5, h: 0.45,
        rectRadius: 0.22,
        line: { color: COLORS.plum, width: 1.5 },
        fill: { type: 'none' as any },
      });
      slide.addText(BRAND.tagline.toUpperCase(), {
        x: 10, y: 0.35, w: 2.5, h: 0.45,
        fontSize: 8,
        fontFace: BRAND.fonts.body,
        color: COLORS.plum,
        bold: true,
        align: 'center',
      });

      // Title — Plum purple
      slide.addText(slideData.title, {
        x: 0.6, y: 1.8, w: 10, h: 1.8,
        fontSize: 36,
        fontFace: BRAND.fonts.heading,
        color: COLORS.plum,
        bold: true,
        lineSpacing: 42,
      });

      // Dotted line divider per brand guidelines
      slide.addShape(pptx.ShapeType.line, {
        x: 0.6, y: 3.7, w: 11.5, h: 0,
        line: { color: COLORS.muted, width: 1, dashType: 'sysDot' },
      });

      if (slideData.subtitle) {
        slide.addText(slideData.subtitle, {
          x: 0.6, y: 4.0, w: 7, h: 1.0,
          fontSize: 14,
          fontFace: BRAND.fonts.body,
          color: COLORS.medium,
          lineSpacing: 22,
        });
      }

      // Green callout box per brand guidelines
      slide.addShape(pptx.ShapeType.roundRect, {
        x: 8, y: 4.0, w: 4.5, h: 1.5,
        rectRadius: 0.15,
        fill: { color: COLORS.accentLight },
      });
      slide.addText(BRAND.subtitle, {
        x: 8.3, y: 4.15, w: 3.9, h: 1.2,
        fontSize: 13,
        fontFace: BRAND.fonts.body,
        color: COLORS.plum,
        bold: true,
        italic: true,
        lineSpacing: 20,
      });

      // Stats bar at bottom — Plum purple per brand guidelines
      slide.addShape(pptx.ShapeType.rect, {
        x: 0, y: 5.8, w: '100%', h: 1.1,
        fill: { color: COLORS.plum },
      });

      const stats = [
        { num: '97%', label: 'retention rate' },
        { num: '7 days', label: 'avg. match' },
        { num: '60-70%', label: 'cost savings' },
        { num: '2-4%', label: 'acceptance rate' },
      ];
      stats.forEach((stat, i) => {
        const xPos = 1 + i * 3;
        slide.addText(stat.num, {
          x: xPos, y: 5.85, w: 2.5, h: 0.6,
          fontSize: 26, fontFace: BRAND.fonts.heading,
          color: COLORS.gold, bold: true, align: 'center',
        });
        slide.addText(stat.label, {
          x: xPos, y: 6.4, w: 2.5, h: 0.35,
          fontSize: 9, fontFace: BRAND.fonts.body,
          color: 'FFFFFF', align: 'center',
        });
      });

      addBrandedFooter(slide, pptx, slideNum, true);

    } else if (slideData.layout === 'closing') {
      // ===== CLOSING SLIDE — Plum purple per brand guidelines =====
      slide.background = { color: COLORS.plum };

      try {
        slide.addImage({ path: LOGO_PATH, x: 0.6, y: 0.4, w: 1.6, h: 0.45 });
      } catch { /* */ }

      slide.addText(slideData.title, {
        x: 1, y: 2.0, w: 11.33, h: 1.2,
        fontSize: 36, fontFace: BRAND.fonts.heading,
        color: COLORS.white, bold: true, align: 'center',
      });

      // Green underline
      slide.addShape(pptx.ShapeType.rect, {
        x: 5.5, y: 3.3, w: 2.3, h: 0.04,
        fill: { color: COLORS.accent },
      });

      if (slideData.subtitle) {
        slide.addText(slideData.subtitle, {
          x: 2, y: 3.6, w: 9.33, h: 1.5,
          fontSize: 18, fontFace: BRAND.fonts.body,
          color: COLORS.gold, bold: true, align: 'center',
          lineSpacing: 28,
        });
      }

      slide.addText(`${BRAND.address}`, {
        x: 2, y: 5.5, w: 9.33, h: 0.4,
        fontSize: 10, fontFace: BRAND.fonts.body,
        color: COLORS.muted, align: 'center',
      });

      addBrandedFooter(slide, pptx, slideNum, true);

    } else if (slideData.layout === 'section') {
      // ===== SECTION DIVIDER — Plum purple =====
      slide.background = { color: COLORS.plum };

      try {
        slide.addImage({ path: LOGO_PATH, x: 0.6, y: 0.4, w: 1.6, h: 0.45 });
      } catch { /* */ }

      slide.addText(slideData.title, {
        x: 0.8, y: 2.5, w: 11.33, h: 1.5,
        fontSize: 32, fontFace: BRAND.fonts.heading,
        color: COLORS.white, bold: true,
      });

      slide.addShape(pptx.ShapeType.rect, {
        x: 0.8, y: 4.1, w: 3, h: 0.04,
        fill: { color: COLORS.accent },
      });

      addBrandedFooter(slide, pptx, slideNum, true);

    } else {
      // ===== CONTENT SLIDE — White background =====
      slide.background = { color: COLORS.white };

      // Logo top-left
      try {
        slide.addImage({ path: LOGO_PATH, x: 0.5, y: 0.25, w: 1.3, h: 0.36 });
      } catch { /* */ }

      // Badge top-right — Plum per brand guidelines
      slide.addShape(pptx.ShapeType.roundRect, {
        x: 10.5, y: 0.2, w: 2.2, h: 0.4,
        rectRadius: 0.2,
        line: { color: COLORS.plum, width: 1 },
        fill: { type: 'none' as any },
      });
      slide.addText(BRAND.tagline.toUpperCase(), {
        x: 10.5, y: 0.2, w: 2.2, h: 0.4,
        fontSize: 7, fontFace: BRAND.fonts.body,
        color: COLORS.plum, bold: true, align: 'center',
      });

      // Title
      slide.addText(slideData.title, {
        x: 0.6, y: 1.0, w: 11.5, h: 0.7,
        fontSize: 22, fontFace: BRAND.fonts.heading,
        color: COLORS.plum, bold: true,
      });

      // Green underline
      slide.addShape(pptx.ShapeType.rect, {
        x: 0.6, y: 1.75, w: 1.5, h: 0.035,
        fill: { color: COLORS.accent },
      });

      if (slideData.bullets && slideData.bullets.length > 0) {
        const bulletRows = slideData.bullets.map((b) => ({
          text: b,
          options: {
            fontSize: 14,
            fontFace: BRAND.fonts.body,
            color: COLORS.medium,
            bullet: { code: '2022', color: COLORS.accent } as any,
            spacing: { before: 6, after: 6 },
          },
        }));

        // Light card background for bullets
        slide.addShape(pptx.ShapeType.roundRect, {
          x: 0.5, y: 2.0, w: 12.3, h: 4.5,
          rectRadius: 0.12,
          fill: { color: COLORS.light },
          line: { color: COLORS.border, width: 1 },
        });

        slide.addText(bulletRows, {
          x: 0.8, y: 2.2, w: 11.7, h: 4.2,
          valign: 'top',
          paraSpaceAfter: 10,
        });
      } else if (slideData.body) {
        slide.addText(slideData.body, {
          x: 0.6, y: 2.0, w: 12, h: 4.5,
          fontSize: 14, fontFace: BRAND.fonts.body,
          color: COLORS.medium, valign: 'top',
          lineSpacing: 24,
        });
      }

      addBrandedFooter(slide, pptx, slideNum, false);
    }
  }

  const arrayBuffer = await pptx.write({ outputType: 'arraybuffer' }) as ArrayBuffer;
  return Buffer.from(arrayBuffer);
}
