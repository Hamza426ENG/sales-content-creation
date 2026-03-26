import fs from 'fs';
import path from 'path';

export const BRAND = {
  company: 'Edge',
  tagline: 'Hire World-Class Talent, Fully Managed',
  website: 'onedge.co',
  address: '800 W El Camino Real, Suite 180, Mountain View, CA 94040',
  colors: {
    primary: '#000000',
    secondary: '#1E3A5F',
    accent: '#10B981',
    dark: '#111827',
    medium: '#4B5563',
    light: '#F3F4F6',
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

export function getLogoForPptBase64(): string {
  // PPT needs a raster image — use the OG image or convert SVG to PNG
  const ogPath = path.join(__dirname, '../../assets/og-homepage.jpg');
  if (fs.existsSync(ogPath)) {
    const imgBuffer = fs.readFileSync(ogPath);
    return `data:image/jpeg;base64,${imgBuffer.toString('base64')}`;
  }
  return getLogoBase64();
}
