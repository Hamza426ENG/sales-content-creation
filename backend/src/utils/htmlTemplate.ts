import { BRAND, getLogoBase64, getLogoWhiteBase64, getLogoPurpleBase64 } from './brand';

export function wrapInHtml(content: string, title?: string): string {
  const logoBase64 = getLogoBase64();
  const logoPurpleBase64 = getLogoPurpleBase64();
  const logoWhiteBase64 = getLogoWhiteBase64();
  const docTitle = title || 'Sales Content';

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700;800&display=swap');

    * { margin: 0; padding: 0; box-sizing: border-box; }

    @page { margin: 0; size: A4; }

    :root {
      --plum: #4A0F70;
      --amethyst: #914DE8;
      --violet: #7C3AED;
      --mauve: #C6AAFC;
      --lilac-pale: #E5D9F9;
      --accent: #059669;
      --accent-light: #ECFDF5;
      --gold: #D97706;
      --text: #111827;
      --text-s: #4B5563;
      --text-m: #9CA3AF;
      --border: #E9E9ED;
      --border-light: #F0F0F4;
      --bg: #FAFAFA;
    }

    body {
      font-family: 'DM Sans', system-ui, -apple-system, sans-serif;
      line-height: 1.7;
      color: var(--text);
      -webkit-font-smoothing: antialiased;
    }

    /* ---- COVER PAGE ---- */
    .cover-page {
      width: 100%;
      min-height: 100vh;
      background: var(--lilac-pale);
      display: flex;
      flex-direction: column;
      padding: 0;
      page-break-after: always;
      position: relative;
    }

    .cover-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 30px 50px;
    }

    .cover-header img { height: 28px; }

    .cover-header .tagline {
      font-size: 11px;
      font-weight: 700;
      color: var(--plum);
      border: 1.5px solid var(--plum);
      border-radius: 100px;
      padding: 5px 16px;
      text-transform: uppercase;
      letter-spacing: 1.5px;
    }

    .cover-content {
      padding: 60px 50px 40px;
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
    }

    .cover-title {
      font-size: 40px;
      font-weight: 800;
      color: var(--plum);
      margin-bottom: 12px;
      line-height: 1.15;
      letter-spacing: -0.6px;
      max-width: 600px;
    }

    .cover-dotted-line {
      border: none;
      border-top: 2px dotted var(--text-m);
      margin: 20px 0 24px 0;
      opacity: 0.3;
    }

    .cover-description {
      font-size: 14px;
      color: var(--text-s);
      line-height: 1.7;
      max-width: 480px;
    }

    /* Green callout box on cover */
    .cover-callout {
      background: var(--accent-light);
      border-radius: 12px;
      padding: 20px 24px;
      margin-top: 28px;
      max-width: 380px;
    }

    .cover-callout p {
      font-size: 14px;
      font-weight: 600;
      color: var(--plum);
      font-style: italic;
      line-height: 1.5;
    }

    /* Stats bar at bottom of cover — uses Plum purple */
    .cover-stats {
      background: var(--plum);
      padding: 28px 50px;
      display: flex;
      justify-content: space-around;
      align-items: center;
    }

    .cover-stat { text-align: center; }

    .cover-stat .number {
      font-size: 28px;
      font-weight: 800;
      color: var(--gold);
    }

    .cover-stat .label {
      font-size: 10px;
      color: rgba(255,255,255,0.75);
      margin-top: 4px;
      font-weight: 500;
    }

    /* ---- PAGE HEADER ---- */
    .page-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 20px 50px;
      border-bottom: 1px solid var(--border-light);
      margin-bottom: 10px;
    }

    .page-header img { height: 22px; }

    .page-header .header-badge {
      font-size: 9px;
      color: var(--plum);
      border: 1.5px solid var(--plum);
      border-radius: 100px;
      padding: 4px 14px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 1.5px;
    }

    /* ---- CONTENT ---- */
    .content-body { padding: 10px 50px 80px; }

    h1 {
      font-size: 28px;
      font-weight: 800;
      color: var(--plum);
      margin-bottom: 8px;
      letter-spacing: -0.4px;
    }

    h2 {
      font-size: 20px;
      font-weight: 700;
      color: var(--plum);
      margin-top: 30px;
      margin-bottom: 10px;
      position: relative;
      padding-bottom: 10px;
    }

    h2::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 50px;
      height: 3px;
      background: var(--accent);
      border-radius: 2px;
    }

    h3 {
      font-size: 15px;
      font-weight: 700;
      color: var(--text);
      margin-top: 22px;
      margin-bottom: 6px;
    }

    p {
      margin-bottom: 12px;
      font-size: 13px;
      color: var(--text-s);
      line-height: 1.7;
    }

    ul, ol {
      margin-bottom: 14px;
      padding-left: 20px;
    }

    li {
      margin-bottom: 5px;
      font-size: 13px;
      color: var(--text-s);
      line-height: 1.65;
    }

    li::marker { color: var(--accent); }

    strong { font-weight: 700; color: var(--text); }

    em { font-style: italic; color: var(--plum); }

    /* Callout / quote blocks */
    blockquote {
      background: var(--accent-light);
      border-radius: 12px;
      padding: 20px 24px;
      margin: 16px 0;
      border: none;
    }

    blockquote p {
      color: var(--plum);
      font-weight: 600;
      font-style: italic;
      font-size: 14px;
    }

    /* Tables */
    table {
      width: 100%;
      border-collapse: separate;
      border-spacing: 0;
      margin: 16px 0;
      border-radius: 12px;
      overflow: hidden;
      border: 1.5px solid var(--border);
    }

    th {
      background: var(--lilac-pale);
      font-weight: 700;
      color: var(--plum);
      padding: 12px 16px;
      text-align: left;
      font-size: 12px;
      border-bottom: 2px solid var(--accent);
    }

    td {
      padding: 10px 16px;
      text-align: left;
      font-size: 12px;
      color: var(--text-s);
      border-bottom: 1px solid var(--border-light);
    }

    tr:last-child td { border-bottom: none; }

    /* Dotted divider */
    hr {
      border: none;
      border-top: 2px dotted var(--text-m);
      margin: 24px 0;
      opacity: 0.2;
    }

    /* ---- FOOTER — Plum purple background ---- */
    .page-footer {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      padding: 14px 50px;
      font-size: 9px;
      color: rgba(255,255,255,0.7);
      background: var(--plum);
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .page-footer img {
      height: 14px;
    }

    .footer-right { text-align: right; }
  </style>
</head>
<body>

  <!-- COVER PAGE -->
  <div class="cover-page">
    <div class="cover-header">
      <img src="${logoPurpleBase64}" alt="${BRAND.company}" />
      <span class="tagline">${BRAND.tagline}</span>
    </div>
    <div class="cover-content">
      <div class="cover-title">${docTitle}</div>
      <hr class="cover-dotted-line" />
      <div class="cover-description">
        ${BRAND.subtitle}. Edge provides dedicated, campus-based professionals who integrate into your workflows — fully managed, HIPAA compliant, and ready from day one.
      </div>
      <div class="cover-callout">
        <p>"Edge is in a tier of their own and then there's everybody else." — Jose Melendez, President, Melendez Insurance Group</p>
      </div>
    </div>
    <div class="cover-stats">
      <div class="cover-stat"><div class="number">97%</div><div class="label">retention rate</div></div>
      <div class="cover-stat"><div class="number">7 days</div><div class="label">avg. match time</div></div>
      <div class="cover-stat"><div class="number">60-70%</div><div class="label">cost savings</div></div>
      <div class="cover-stat"><div class="number">2-4%</div><div class="label">acceptance rate</div></div>
    </div>
  </div>

  <!-- CONTENT PAGES -->
  <div class="page-header">
    <img src="${logoPurpleBase64}" alt="${BRAND.company}" />
    <span class="header-badge">${BRAND.tagline}</span>
  </div>

  <div class="content-body">
    ${content}
  </div>

  <!-- FOOTER — Plum purple with white text -->
  <div class="page-footer">
    <div>
      <img src="${logoWhiteBase64}" alt="${BRAND.company}" />
      <div style="margin-top: 3px;">${BRAND.address}</div>
      <div>${BRAND.website}</div>
    </div>
    <div class="footer-right">
      &copy; ${new Date().getFullYear()} ${BRAND.fullName}.<br/>All rights reserved.
    </div>
  </div>

</body>
</html>`;
}
