import fs from 'fs';
import path from 'path';

export const BRAND = {
  company: 'Edge',
  fullName: 'Edge Services and Solutions, LLC',
  tagline: 'Match Your Ambition',
  subtitle: 'Hire World-Class Talent, Fully Managed',
  website: 'onedge.co',
  address: '800 El Camino Real, Suite 180, Mountain View, CA 94040',
  colors: {
    // Primary brand colors (purple hues from brand guidelines)
    primary: '#4A0F70',         // Plum - logo color, primary brand
    primaryLight: '#914DE8',    // Amethyst - accent purple
    primaryMid: '#7C3AED',      // Lilac/violet - web accent (--lilac)
    primaryPale: '#E5D9F9',     // Lilac pale - light backgrounds
    mauve: '#C6AAFC',           // Mauve - soft purple

    // Secondary brand colors (green hues)
    accent: '#059669',          // Green - positive metrics, CTAs
    accentLight: '#ECFDF5',     // Light green - card backgrounds
    accentDark: '#003731',      // Phthalo - deep green
    seafoam: '#A2D7C3',         // Seafoam
    honeydew: '#DFEFE0',        // Honeydew - light green bg

    // Semantic colors
    gold: '#D97706',            // Amber/gold - stats, key numbers
    blue: '#2563EB',            // Blue - healthcare accent
    teal: '#0D9488',            // Teal - dental accent
    red: '#DC2626',             // Red - negative/alerts

    // Neutrals
    dark: '#111827',            // --text primary
    darkBg: '#0B0F1A',         // Dark section backgrounds
    medium: '#4B5563',          // --text-s body text
    muted: '#9CA3AF',           // --text-m muted text
    border: '#E9E9ED',          // --border
    borderLight: '#F0F0F4',     // --border-light
    light: '#FAFAFA',           // --bg light background
    white: '#FFFFFF',
    black: '#000000',
  },
  fonts: {
    heading: 'DM Sans',         // Web font (FKT Gnarly VF is brand font but not available as web font)
    body: 'DM Sans',
  },
};

export function getLogoSvgPath(): string {
  // Try multiple paths since __dirname differs between src/ and dist/
  const candidates = [
    path.join(__dirname, '../../assets/logo.svg'),
    path.join(__dirname, '../../../assets/logo.svg'),
    path.join(process.cwd(), 'assets/logo.svg'),
  ];
  for (const p of candidates) {
    if (fs.existsSync(p)) return p;
  }
  return candidates[0];
}

export function getLogoSvg(): string {
  try {
    return fs.readFileSync(getLogoSvgPath(), 'utf-8');
  } catch {
    // Fallback: inline minimal Edge SVG if file not found
    return '<svg xmlns="http://www.w3.org/2000/svg" width="120" height="28" viewBox="0 0 100 23"><text x="0" y="18" font-family="DM Sans,sans-serif" font-size="20" font-weight="800" fill="#000000">EDGE</text></svg>';
  }
}

export function getLogoBase64(): string {
  const svgContent = getLogoSvg();
  return `data:image/svg+xml;base64,${Buffer.from(svgContent).toString('base64')}`;
}

export function getLogoWhiteBase64(): string {
  const svgContent = getLogoSvg().replace(/fill="#000000"/g, 'fill="#FFFFFF"');
  return `data:image/svg+xml;base64,${Buffer.from(svgContent).toString('base64')}`;
}

export function getLogoPurpleBase64(): string {
  const svgContent = getLogoSvg().replace(/fill="#000000"/g, `fill="${BRAND.colors.primary}"`);
  return `data:image/svg+xml;base64,${Buffer.from(svgContent).toString('base64')}`;
}
