import { BRAND, getLogoBase64, getLogoWhiteBase64 } from './brand';

export function wrapInHtml(content: string, title?: string): string {
  const logoBase64 = getLogoBase64();
  const logoWhiteBase64 = getLogoWhiteBase64();
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
      size: A4;
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
      background: ${BRAND.colors.lavender};
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      padding: 0;
      page-break-after: always;
      position: relative;
      overflow: hidden;
    }

    .cover-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 30px 50px;
    }

    .cover-header img {
      height: 28px;
    }

    .cover-header .tagline {
      font-size: 12px;
      font-weight: 600;
      color: ${BRAND.colors.primary};
      border: 1.5px solid ${BRAND.colors.primary};
      border-radius: 20px;
      padding: 6px 20px;
    }

    .cover-content {
      padding: 60px 50px 40px 50px;
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
    }

    .cover-title {
      font-size: 38px;
      font-weight: 700;
      color: ${BRAND.colors.primary};
      margin-bottom: 8px;
      line-height: 1.2;
      max-width: 600px;
    }

    .cover-subtitle {
      font-size: 20px;
      font-weight: 600;
      color: ${BRAND.colors.dark};
      margin-bottom: 30px;
      max-width: 550px;
    }

    .cover-dotted-line {
      border: none;
      border-top: 2px dotted ${BRAND.colors.medium};
      margin: 20px 0 30px 0;
      opacity: 0.3;
    }

    .cover-description {
      font-size: 14px;
      color: ${BRAND.colors.medium};
      line-height: 1.7;
      max-width: 500px;
    }

    /* Quote callout box (like in the RCM doc) */
    .cover-callout {
      background: ${BRAND.colors.accentLight};
      border-radius: 12px;
      padding: 24px 30px;
      margin-top: 30px;
      max-width: 400px;
    }

    .cover-callout p {
      font-size: 16px;
      font-weight: 600;
      color: ${BRAND.colors.primary};
      font-style: italic;
      line-height: 1.5;
    }

    /* Stats bar at bottom of cover */
    .cover-stats {
      background: ${BRAND.colors.primaryDark};
      padding: 30px 50px;
      display: flex;
      justify-content: space-around;
      align-items: center;
    }

    .cover-stat {
      text-align: center;
    }

    .cover-stat .number {
      font-size: 32px;
      font-weight: 700;
      color: ${BRAND.colors.gold};
    }

    .cover-stat .label {
      font-size: 11px;
      color: rgba(255,255,255,0.7);
      margin-top: 4px;
    }

    /* ---- HEADER ---- */
    .page-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 20px 50px;
      border-bottom: none;
      margin-bottom: 10px;
    }

    .page-header img {
      height: 22px;
    }

    .page-header .header-badge {
      font-size: 11px;
      color: ${BRAND.colors.primary};
      border: 1.5px solid ${BRAND.colors.primary};
      border-radius: 20px;
      padding: 5px 16px;
      font-weight: 600;
    }

    /* ---- CONTENT ---- */
    .content-body {
      padding: 10px 50px 60px 50px;
    }

    h1 {
      font-size: 28px;
      font-weight: 700;
      color: ${BRAND.colors.primary};
      margin-bottom: 6px;
    }

    h2 {
      font-size: 20px;
      font-weight: 700;
      color: ${BRAND.colors.primary};
      margin-top: 30px;
      margin-bottom: 10px;
      position: relative;
      padding-bottom: 8px;
    }

    h2::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 60px;
      height: 3px;
      background: ${BRAND.colors.accent};
      border-radius: 2px;
    }

    h3 {
      font-size: 16px;
      font-weight: 700;
      color: ${BRAND.colors.dark};
      margin-top: 22px;
      margin-bottom: 6px;
    }

    p {
      margin-bottom: 12px;
      font-size: 13px;
      color: ${BRAND.colors.medium};
      line-height: 1.7;
    }

    ul, ol {
      margin-bottom: 14px;
      padding-left: 20px;
    }

    li {
      margin-bottom: 5px;
      font-size: 13px;
      color: ${BRAND.colors.medium};
      line-height: 1.6;
    }

    li::marker {
      color: ${BRAND.colors.accent};
    }

    strong {
      font-weight: 700;
      color: ${BRAND.colors.dark};
    }

    em {
      font-style: italic;
      color: ${BRAND.colors.primary};
    }

    /* Callout / quote blocks */
    blockquote {
      background: ${BRAND.colors.accentLight};
      border-radius: 10px;
      padding: 20px 24px;
      margin: 16px 0;
      border: none;
    }

    blockquote p {
      color: ${BRAND.colors.primary};
      font-weight: 600;
      font-style: italic;
      font-size: 15px;
    }

    /* Tables */
    table {
      width: 100%;
      border-collapse: separate;
      border-spacing: 0;
      margin: 16px 0;
      border-radius: 10px;
      overflow: hidden;
      border: 1px solid #E5E7EB;
    }

    th {
      background: ${BRAND.colors.lavender};
      font-weight: 700;
      color: ${BRAND.colors.primary};
      padding: 12px 16px;
      text-align: left;
      font-size: 13px;
      border-bottom: 2px solid ${BRAND.colors.accent};
    }

    td {
      padding: 10px 16px;
      text-align: left;
      font-size: 12px;
      color: ${BRAND.colors.medium};
      border-bottom: 1px solid #F3F4F6;
    }

    tr:last-child td {
      border-bottom: none;
    }

    /* Card-style sections (like RCM services cards) */
    .card {
      background: ${BRAND.colors.accentLight};
      border-radius: 12px;
      padding: 20px 24px;
      margin: 10px 0;
    }

    /* Dotted divider */
    hr {
      border: none;
      border-top: 2px dotted ${BRAND.colors.medium};
      margin: 24px 0;
      opacity: 0.2;
    }

    /* ---- FOOTER ---- */
    .page-footer {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      padding: 16px 50px;
      font-size: 9px;
      color: rgba(255,255,255,0.6);
      background: ${BRAND.colors.primaryDeep};
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .page-footer img {
      height: 16px;
      filter: brightness(0) invert(1);
    }

    .footer-right {
      text-align: right;
    }
  </style>
</head>
<body>

  <!-- COVER PAGE -->
  <div class="cover-page">
    <div class="cover-header">
      <img src="${logoBase64}" alt="${BRAND.company}" />
      <span class="tagline">${BRAND.tagline}</span>
    </div>
    <div class="cover-content">
      <div class="cover-title">${docTitle}</div>
      <hr class="cover-dotted-line" />
      <div class="cover-description">
        ${BRAND.subtitle}. Edge provides college-educated, healthcare-trained professionals who integrate into your workflows within weeks.
      </div>
    </div>
  </div>

  <!-- CONTENT PAGES -->
  <div class="page-header">
    <img src="${logoBase64}" alt="${BRAND.company}" />
    <span class="header-badge">${BRAND.tagline}</span>
  </div>

  <div class="content-body">
    ${content}
  </div>

  <!-- FOOTER -->
  <div class="page-footer">
    <div>
      <img src="${logoWhiteBase64}" alt="${BRAND.company}" />
      <div style="margin-top: 4px;">${BRAND.address}</div>
      <div>${BRAND.website}</div>
    </div>
    <div class="footer-right">
      &copy; ${new Date().getFullYear()} ${BRAND.fullName}.<br/>All rights reserved.
    </div>
  </div>

</body>
</html>`;
}
