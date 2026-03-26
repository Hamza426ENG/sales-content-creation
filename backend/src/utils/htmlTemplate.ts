import { BRAND, getLogoBase64 } from './brand';

export function wrapInHtml(content: string, title?: string): string {
  const logoBase64 = getLogoBase64();
  const docTitle = title || 'Sales Content';

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700&display=swap');

    * { margin: 0; padding: 0; box-sizing: border-box; }

    @page {
      margin: 0;
    }

    body {
      font-family: '${BRAND.fonts.body}', 'Helvetica Neue', Arial, sans-serif;
      line-height: 1.7;
      color: ${BRAND.colors.dark};
    }

    /* ---- COVER PAGE ---- */
    .cover-page {
      width: 100%;
      height: 100vh;
      background: linear-gradient(135deg, ${BRAND.colors.primary} 0%, ${BRAND.colors.secondary} 100%);
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding: 80px 60px;
      page-break-after: always;
      position: relative;
      overflow: hidden;
    }
    .cover-page::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 6px;
      background: ${BRAND.colors.accent};
    }
    .cover-page::after {
      content: '';
      position: absolute;
      bottom: 0;
      right: 0;
      width: 300px;
      height: 300px;
      border-radius: 50%;
      background: rgba(16, 185, 129, 0.08);
      transform: translate(100px, 100px);
    }
    .cover-logo {
      margin-bottom: 60px;
    }
    .cover-logo img {
      height: 40px;
      filter: brightness(0) invert(1);
    }
    .cover-title {
      font-size: 42px;
      font-weight: 700;
      color: ${BRAND.colors.white};
      margin-bottom: 16px;
      line-height: 1.2;
      max-width: 600px;
    }
    .cover-tagline {
      font-size: 18px;
      color: rgba(255,255,255,0.7);
      margin-bottom: 40px;
      max-width: 500px;
    }
    .cover-divider {
      width: 80px;
      height: 4px;
      background: ${BRAND.colors.accent};
      margin-bottom: 30px;
    }
    .cover-meta {
      font-size: 13px;
      color: rgba(255,255,255,0.5);
    }

    /* ---- HEADER ---- */
    .page-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 20px 50px;
      border-bottom: 2px solid ${BRAND.colors.accent};
      margin-bottom: 30px;
    }
    .page-header img {
      height: 24px;
    }
    .page-header .header-text {
      font-size: 11px;
      color: ${BRAND.colors.medium};
      text-transform: uppercase;
      letter-spacing: 1px;
    }

    /* ---- CONTENT ---- */
    .content-body {
      padding: 0 50px 40px 50px;
      max-width: 800px;
      margin: 0 auto;
    }
    h1 {
      font-size: 28px;
      font-weight: 700;
      color: ${BRAND.colors.primary};
      margin-bottom: 20px;
      padding-bottom: 10px;
      border-bottom: 3px solid ${BRAND.colors.accent};
    }
    h2 {
      font-size: 22px;
      font-weight: 600;
      color: ${BRAND.colors.secondary};
      margin-top: 32px;
      margin-bottom: 12px;
    }
    h3 {
      font-size: 18px;
      font-weight: 600;
      color: ${BRAND.colors.dark};
      margin-top: 24px;
      margin-bottom: 8px;
    }
    p {
      margin-bottom: 14px;
      font-size: 14px;
      color: ${BRAND.colors.medium};
    }
    ul, ol {
      margin-bottom: 14px;
      padding-left: 24px;
    }
    li {
      margin-bottom: 6px;
      font-size: 14px;
      color: ${BRAND.colors.medium};
    }
    li::marker {
      color: ${BRAND.colors.accent};
    }
    strong { font-weight: 600; color: ${BRAND.colors.dark}; }
    em { font-style: italic; }
    table {
      width: 100%;
      border-collapse: collapse;
      margin: 16px 0;
    }
    th, td {
      border: 1px solid #e5e7eb;
      padding: 10px 14px;
      text-align: left;
      font-size: 13px;
    }
    th {
      background: ${BRAND.colors.light};
      font-weight: 600;
      color: ${BRAND.colors.dark};
    }

    /* ---- FOOTER ---- */
    .page-footer {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 12px 50px;
      border-top: 1px solid #e5e7eb;
      font-size: 10px;
      color: ${BRAND.colors.medium};
      background: ${BRAND.colors.white};
    }
    .footer-accent {
      color: ${BRAND.colors.accent};
      font-weight: 600;
    }
  </style>
</head>
<body>

  <!-- COVER PAGE -->
  <div class="cover-page">
    <div class="cover-logo">
      <img src="${logoBase64}" alt="${BRAND.company}" />
    </div>
    <div class="cover-divider"></div>
    <div class="cover-title">${docTitle}</div>
    <div class="cover-tagline">${BRAND.tagline}</div>
    <div class="cover-meta">${BRAND.website} &bull; ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
  </div>

  <!-- HEADER -->
  <div class="page-header">
    <img src="${logoBase64}" alt="${BRAND.company}" />
    <span class="header-text">Confidential</span>
  </div>

  <!-- CONTENT -->
  <div class="content-body">
    ${content}
  </div>

  <!-- FOOTER -->
  <div class="page-footer">
    <span>&copy; ${new Date().getFullYear()} <span class="footer-accent">${BRAND.company}</span> &bull; ${BRAND.website}</span>
    <span>${BRAND.address}</span>
  </div>

</body>
</html>`;
}
