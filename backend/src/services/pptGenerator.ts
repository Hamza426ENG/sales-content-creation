import PptxGenJS from 'pptxgenjs';
import path from 'path';
import { SlideData } from '../types';
import { BRAND } from '../utils/brand';

const LOGO_PATH = path.join(__dirname, '../../assets/logo.svg');

const COLORS = {
  primary: BRAND.colors.primary.replace('#', ''),
  secondary: BRAND.colors.secondary.replace('#', ''),
  accent: BRAND.colors.accent.replace('#', ''),
  dark: BRAND.colors.dark.replace('#', ''),
  medium: BRAND.colors.medium.replace('#', ''),
  light: BRAND.colors.light.replace('#', ''),
  white: BRAND.colors.white.replace('#', ''),
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
    title: 'Thank You',
    subtitle: `${BRAND.tagline}\n\n${BRAND.website}`,
    layout: 'closing',
  });

  return slides;
}

function addBrandedFooter(slide: PptxGenJS.Slide, pptx: PptxGenJS, slideNum: number, isDark: boolean) {
  // Footer bar
  slide.addShape(pptx.ShapeType.rect, {
    x: 0, y: 7.0, w: '100%', h: 0.5,
    fill: { color: isDark ? '0D1117' : COLORS.light },
  });

  // Footer text
  slide.addText(`© ${new Date().getFullYear()} ${BRAND.company}  •  ${BRAND.website}`, {
    x: 0.5, y: 7.05, w: 8, h: 0.4,
    fontSize: 9,
    fontFace: BRAND.fonts.body,
    color: isDark ? '6B7280' : COLORS.medium,
  });

  // Slide number
  slide.addText(`${slideNum}`, {
    x: 11.5, y: 7.05, w: 1.5, h: 0.4,
    fontSize: 9,
    fontFace: BRAND.fonts.body,
    color: isDark ? '6B7280' : COLORS.medium,
    align: 'right',
  });
}

export async function generatePpt(content: string): Promise<Buffer> {
  const pptx = new PptxGenJS();

  pptx.layout = 'LAYOUT_WIDE';
  pptx.author = BRAND.company;
  pptx.company = BRAND.company;
  pptx.subject = 'Sales Content';

  const slides = parseSlideData(content);
  let slideNum = 0;

  for (const slideData of slides) {
    const slide = pptx.addSlide();
    slideNum++;

    if (slideData.layout === 'title') {
      // ===== TITLE / COVER SLIDE =====
      slide.background = { color: COLORS.primary };

      // Top accent bar
      slide.addShape(pptx.ShapeType.rect, {
        x: 0, y: 0, w: '100%', h: 0.08,
        fill: { color: COLORS.accent },
      });

      // Decorative circle
      slide.addShape(pptx.ShapeType.ellipse, {
        x: 10, y: 4.5, w: 4, h: 4,
        fill: { color: COLORS.accent, transparency: 90 },
      });

      // Logo
      try {
        slide.addImage({
          path: LOGO_PATH,
          x: 0.8, y: 0.6, w: 1.8, h: 0.5,
        });
      } catch { /* logo not found */ }

      // Divider
      slide.addShape(pptx.ShapeType.rect, {
        x: 0.8, y: 2.2, w: 1.2, h: 0.06,
        fill: { color: COLORS.accent },
      });

      // Title
      slide.addText(slideData.title, {
        x: 0.8, y: 2.5, w: 10, h: 1.8,
        fontSize: 36,
        fontFace: BRAND.fonts.heading,
        color: COLORS.white,
        bold: true,
        align: 'left',
        lineSpacing: 42,
      });

      if (slideData.subtitle) {
        slide.addText(slideData.subtitle, {
          x: 0.8, y: 4.4, w: 8, h: 1,
          fontSize: 16,
          fontFace: BRAND.fonts.body,
          color: '9CA3AF',
          align: 'left',
        });
      }

      // Tagline
      slide.addText(BRAND.tagline, {
        x: 0.8, y: 5.8, w: 8, h: 0.5,
        fontSize: 12,
        fontFace: BRAND.fonts.body,
        color: '6B7280',
        italic: true,
      });

      // Date
      slide.addText(new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }), {
        x: 0.8, y: 6.3, w: 4, h: 0.4,
        fontSize: 10,
        fontFace: BRAND.fonts.body,
        color: '6B7280',
      });

      addBrandedFooter(slide, pptx, slideNum, true);

    } else if (slideData.layout === 'closing') {
      // ===== CLOSING SLIDE =====
      slide.background = { color: COLORS.secondary };

      slide.addShape(pptx.ShapeType.rect, {
        x: 0, y: 0, w: '100%', h: 0.08,
        fill: { color: COLORS.accent },
      });

      try {
        slide.addImage({
          path: LOGO_PATH,
          x: 5.1, y: 1.5, w: 3, h: 0.85,
        });
      } catch { /* logo not found */ }

      slide.addText(slideData.title, {
        x: 2, y: 2.8, w: 9.33, h: 1.2,
        fontSize: 40,
        fontFace: BRAND.fonts.heading,
        color: COLORS.white,
        bold: true,
        align: 'center',
      });

      if (slideData.subtitle) {
        slide.addText(slideData.subtitle, {
          x: 2, y: 4.2, w: 9.33, h: 1.2,
          fontSize: 16,
          fontFace: BRAND.fonts.body,
          color: '9CA3AF',
          align: 'center',
        });
      }

      // Contact info
      slide.addText(`${BRAND.address}`, {
        x: 2, y: 5.8, w: 9.33, h: 0.4,
        fontSize: 10,
        fontFace: BRAND.fonts.body,
        color: '6B7280',
        align: 'center',
      });

      addBrandedFooter(slide, pptx, slideNum, true);

    } else if (slideData.layout === 'section') {
      // ===== SECTION DIVIDER SLIDE =====
      slide.background = { color: COLORS.secondary };

      slide.addShape(pptx.ShapeType.rect, {
        x: 0, y: 0, w: '100%', h: 0.08,
        fill: { color: COLORS.accent },
      });

      try {
        slide.addImage({
          path: LOGO_PATH,
          x: 0.8, y: 0.5, w: 1.5, h: 0.42,
        });
      } catch { /* logo not found */ }

      slide.addText(slideData.title, {
        x: 0.8, y: 2.5, w: 11.33, h: 1.5,
        fontSize: 32,
        fontFace: BRAND.fonts.heading,
        color: COLORS.white,
        bold: true,
        align: 'left',
      });

      addBrandedFooter(slide, pptx, slideNum, true);

    } else {
      // ===== CONTENT SLIDE =====
      slide.background = { color: COLORS.white };

      // Top accent bar
      slide.addShape(pptx.ShapeType.rect, {
        x: 0, y: 0, w: '100%', h: 0.06,
        fill: { color: COLORS.accent },
      });

      // Left stripe
      slide.addShape(pptx.ShapeType.rect, {
        x: 0, y: 0, w: 0.06, h: '100%',
        fill: { color: COLORS.primary },
      });

      // Logo top right
      try {
        slide.addImage({
          path: LOGO_PATH,
          x: 11, y: 0.25, w: 1.5, h: 0.42,
        });
      } catch { /* logo not found */ }

      // Title
      slide.addText(slideData.title, {
        x: 0.8, y: 0.3, w: 10, h: 0.8,
        fontSize: 24,
        fontFace: BRAND.fonts.heading,
        color: COLORS.primary,
        bold: true,
      });

      // Divider under title
      slide.addShape(pptx.ShapeType.rect, {
        x: 0.8, y: 1.15, w: 2, h: 0.04,
        fill: { color: COLORS.accent },
      });

      if (slideData.bullets && slideData.bullets.length > 0) {
        const bulletRows = slideData.bullets.map((b) => ({
          text: b,
          options: {
            fontSize: 15,
            fontFace: BRAND.fonts.body,
            color: COLORS.medium,
            bullet: { code: '25CF', color: COLORS.accent } as any,
            spacing: { before: 8, after: 8 },
          },
        }));

        slide.addText(bulletRows, {
          x: 0.8, y: 1.5, w: 11.5, h: 5,
          valign: 'top',
          paraSpaceAfter: 12,
        });
      } else if (slideData.body) {
        slide.addText(slideData.body, {
          x: 0.8, y: 1.5, w: 11.5, h: 5,
          fontSize: 15,
          fontFace: BRAND.fonts.body,
          color: COLORS.medium,
          valign: 'top',
          lineSpacing: 24,
        });
      }

      addBrandedFooter(slide, pptx, slideNum, false);
    }
  }

  const arrayBuffer = await pptx.write({ outputType: 'arraybuffer' }) as ArrayBuffer;
  return Buffer.from(arrayBuffer);
}
