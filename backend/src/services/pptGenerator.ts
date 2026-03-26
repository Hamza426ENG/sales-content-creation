import PptxGenJS from 'pptxgenjs';
import path from 'path';
import { SlideData } from '../types';
import { BRAND } from '../utils/brand';

const LOGO_PATH = path.join(__dirname, '../../assets/logo.svg');

// Strip # from hex colors for pptxgenjs
const c = (hex: string) => hex.replace('#', '');

const COLORS = {
  primary: c(BRAND.colors.primary),
  primaryDark: c(BRAND.colors.primaryDark),
  primaryDeep: c(BRAND.colors.primaryDeep),
  lavender: c(BRAND.colors.lavender),
  lavenderMid: c(BRAND.colors.lavenderMid),
  accent: c(BRAND.colors.accent),
  accentLight: c(BRAND.colors.accentLight),
  gold: c(BRAND.colors.gold),
  dark: c(BRAND.colors.dark),
  medium: c(BRAND.colors.medium),
  light: c(BRAND.colors.light),
  white: c(BRAND.colors.white),
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

  // Add closing slide
  slides.push({
    title: 'Ready to Get Started?',
    subtitle: `Book a Discovery Call Today\n\n${BRAND.website}`,
    layout: 'closing',
  });

  return slides;
}

function addBrandedFooter(slide: PptxGenJS.Slide, pptx: PptxGenJS, slideNum: number, isDark: boolean) {
  const footerBg = isDark ? COLORS.primaryDeep : COLORS.light;
  const footerColor = isDark ? '9CA3AF' : COLORS.medium;

  slide.addShape(pptx.ShapeType.rect, {
    x: 0, y: 6.9, w: '100%', h: 0.6,
    fill: { color: footerBg },
  });

  slide.addText(`© ${new Date().getFullYear()} ${BRAND.fullName}. All rights reserved.`, {
    x: 0.5, y: 6.95, w: 8, h: 0.4,
    fontSize: 8,
    fontFace: BRAND.fonts.body,
    color: footerColor,
  });

  slide.addText(`${BRAND.website}`, {
    x: 10, y: 6.95, w: 3, h: 0.4,
    fontSize: 8,
    fontFace: BRAND.fonts.body,
    color: footerColor,
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
      // ===== COVER SLIDE — Lavender background =====
      slide.background = { color: COLORS.lavender };

      // Logo top-left
      try {
        slide.addImage({ path: LOGO_PATH, x: 0.6, y: 0.4, w: 1.6, h: 0.45 });
      } catch { /* */ }

      // "Match Your Ambition" badge top-right
      slide.addShape(pptx.ShapeType.roundRect, {
        x: 10, y: 0.35, w: 2.5, h: 0.5,
        rectRadius: 0.25,
        line: { color: COLORS.primary, width: 1.5 },
        fill: { type: 'none' as any },
      });
      slide.addText(BRAND.tagline, {
        x: 10, y: 0.35, w: 2.5, h: 0.5,
        fontSize: 10,
        fontFace: BRAND.fonts.body,
        color: COLORS.primary,
        bold: true,
        align: 'center',
      });

      // Title
      slide.addText(slideData.title, {
        x: 0.6, y: 1.8, w: 10, h: 1.8,
        fontSize: 34,
        fontFace: BRAND.fonts.heading,
        color: COLORS.primary,
        bold: true,
        lineSpacing: 40,
      });

      // Dotted line
      slide.addShape(pptx.ShapeType.line, {
        x: 0.6, y: 3.7, w: 11.5, h: 0,
        line: { color: COLORS.medium, width: 1, dashType: 'sysDot' },
      });

      if (slideData.subtitle) {
        slide.addText(slideData.subtitle, {
          x: 0.6, y: 4.0, w: 7, h: 1.2,
          fontSize: 14,
          fontFace: BRAND.fonts.body,
          color: COLORS.medium,
          lineSpacing: 22,
        });
      }

      // Green callout box
      slide.addShape(pptx.ShapeType.roundRect, {
        x: 8, y: 4.0, w: 4.5, h: 1.6,
        rectRadius: 0.15,
        fill: { color: COLORS.accentLight },
      });
      slide.addText(BRAND.subtitle, {
        x: 8.3, y: 4.2, w: 3.9, h: 1.2,
        fontSize: 13,
        fontFace: BRAND.fonts.body,
        color: COLORS.primary,
        bold: true,
        italic: true,
        lineSpacing: 20,
      });

      // Stats bar at bottom
      slide.addShape(pptx.ShapeType.rect, {
        x: 0, y: 5.8, w: '100%', h: 1.1,
        fill: { color: COLORS.primaryDark },
      });

      const stats = [
        { num: '98%', label: 'collection' },
        { num: '95%', label: 'first pass' },
        { num: '70%', label: 'faster hiring' },
        { num: '40%', label: 'cost reduction' },
      ];
      stats.forEach((stat, i) => {
        const xPos = 1 + i * 3;
        slide.addText(stat.num, {
          x: xPos, y: 5.85, w: 2.5, h: 0.6,
          fontSize: 28, fontFace: BRAND.fonts.heading,
          color: COLORS.gold, bold: true, align: 'center',
        });
        slide.addText(stat.label, {
          x: xPos, y: 6.4, w: 2.5, h: 0.35,
          fontSize: 10, fontFace: BRAND.fonts.body,
          color: 'FFFFFF', align: 'center',
        });
      });

      addBrandedFooter(slide, pptx, slideNum, true);

    } else if (slideData.layout === 'closing') {
      // ===== CLOSING SLIDE — Dark purple =====
      slide.background = { color: COLORS.primaryDeep };

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
        x: 5.5, y: 3.3, w: 2.3, h: 0.05,
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
        color: '9CA3AF', align: 'center',
      });

      addBrandedFooter(slide, pptx, slideNum, true);

    } else if (slideData.layout === 'section') {
      // ===== SECTION DIVIDER — Purple =====
      slide.background = { color: COLORS.primary };

      try {
        slide.addImage({ path: LOGO_PATH, x: 0.6, y: 0.4, w: 1.6, h: 0.45 });
      } catch { /* */ }

      slide.addText(slideData.title, {
        x: 0.8, y: 2.5, w: 11.33, h: 1.5,
        fontSize: 32, fontFace: BRAND.fonts.heading,
        color: COLORS.white, bold: true,
      });

      // Green underline
      slide.addShape(pptx.ShapeType.rect, {
        x: 0.8, y: 4.1, w: 3, h: 0.05,
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

      // Badge top-right
      slide.addShape(pptx.ShapeType.roundRect, {
        x: 10.5, y: 0.2, w: 2.2, h: 0.45,
        rectRadius: 0.22,
        line: { color: COLORS.primary, width: 1 },
        fill: { type: 'none' as any },
      });
      slide.addText(BRAND.tagline, {
        x: 10.5, y: 0.2, w: 2.2, h: 0.45,
        fontSize: 8, fontFace: BRAND.fonts.body,
        color: COLORS.primary, bold: true, align: 'center',
      });

      // Title
      slide.addText(slideData.title, {
        x: 0.6, y: 1.0, w: 11.5, h: 0.7,
        fontSize: 22, fontFace: BRAND.fonts.heading,
        color: COLORS.primary, bold: true,
      });

      // Green underline
      slide.addShape(pptx.ShapeType.rect, {
        x: 0.6, y: 1.75, w: 1.5, h: 0.04,
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

        // Light green card background for bullets
        slide.addShape(pptx.ShapeType.roundRect, {
          x: 0.5, y: 2.0, w: 12.3, h: 4.5,
          rectRadius: 0.15,
          fill: { color: COLORS.accentLight },
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
