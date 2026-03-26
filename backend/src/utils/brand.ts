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
    primary: '#5B21B6',        // Deep purple (headings, accents)
    primaryDark: '#3B0764',    // Darker purple (dark sections)
    primaryDeep: '#1E0A3C',    // Very dark purple (footer/closing sections)
    lavender: '#F3E8FF',       // Light lavender (background sections)
    lavenderMid: '#EDE9FE',    // Mid lavender (cards/quote boxes)
    accent: '#10B981',         // Emerald green (underlines, bullets, accents)
    accentLight: '#ECFDF5',    // Light green (callout boxes, card backgrounds)
    gold: '#D97706',           // Amber/gold (stats, key numbers)
    dark: '#1F2937',           // Dark text
    medium: '#4B5563',         // Body text
    light: '#F9FAFB',          // Light background
    white: '#FFFFFF',
  },
  fonts: {
    heading: 'Open Sans',
    body: 'Open Sans',
  },
};

export function getLogoSvgPath(): string {
  return path.join(__dirname, '../../assets/logo.svg');
}

export function getLogoSvg(): string {
  return fs.readFileSync(getLogoSvgPath(), 'utf-8');
}

export function getLogoBase64(): string {
  const svgContent = getLogoSvg();
  return `data:image/svg+xml;base64,${Buffer.from(svgContent).toString('base64')}`;
}

// Purple version of logo for dark backgrounds
export function getLogoWhiteBase64(): string {
  const svgContent = getLogoSvg().replace(/fill="#000000"/g, 'fill="#FFFFFF"');
  return `data:image/svg+xml;base64,${Buffer.from(svgContent).toString('base64')}`;
}

export function getLogoPurpleBase64(): string {
  const svgContent = getLogoSvg().replace(/fill="#000000"/g, `fill="${BRAND.colors.primary}"`);
  return `data:image/svg+xml;base64,${Buffer.from(svgContent).toString('base64')}`;
}
