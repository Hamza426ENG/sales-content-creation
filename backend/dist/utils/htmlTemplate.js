"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wrapInHtml = wrapInHtml;
const brand_1 = require("./brand");
function wrapInHtml(content, title) {
    const logoBase64 = (0, brand_1.getLogoBase64)();
    const logoPurpleBase64 = (0, brand_1.getLogoPurpleBase64)();
    const logoWhiteBase64 = (0, brand_1.getLogoWhiteBase64)();
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
      --primary: ${brand_1.BRAND.colors.primary};
      --violet: ${brand_1.BRAND.colors.primaryMid};
      --accent: ${brand_1.BRAND.colors.accent};
      --gold: ${brand_1.BRAND.colors.gold};
      --text: ${brand_1.BRAND.colors.dark};
      --text-s: ${brand_1.BRAND.colors.medium};
      --text-m: ${brand_1.BRAND.colors.muted};
      --border: ${brand_1.BRAND.colors.border};
      --border-light: ${brand_1.BRAND.colors.borderLight};
      --bg: ${brand_1.BRAND.colors.light};
      --dark-bg: ${brand_1.BRAND.colors.darkBg};
    }

    body {
      font-family: '${brand_1.BRAND.fonts.body}', system-ui, -apple-system, sans-serif;
      line-height: 1.7;
      color: var(--text);
      -webkit-font-smoothing: antialiased;
    }

    /* ---- COVER PAGE ---- */
    .cover-page {
      width: 100%;
      min-height: 100vh;
      background: linear-gradient(175deg, rgba(124,58,237,0.06) 0%, #fff 60%);
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
      color: var(--violet);
      border: 1.5px solid var(--violet);
      border-radius: 100px;
      padding: 5px 16px;
      text-transform: uppercase;
      letter-spacing: 1.5px;
    }

    .cover-content {
      padding: 80px 50px 40px;
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
    }

    .cover-badge {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 5px 13px;
      border-radius: 100px;
      font-size: 10px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 1.8px;
      color: var(--accent);
      background: rgba(5,150,105,0.06);
      border: 1px solid rgba(5,150,105,0.15);
      margin-bottom: 20px;
      width: fit-content;
    }

    .cover-title {
      font-size: 42px;
      font-weight: 800;
      color: var(--primary);
      margin-bottom: 16px;
      line-height: 1.08;
      letter-spacing: -0.6px;
      max-width: 600px;
    }

    .cover-subtitle {
      font-size: 16px;
      font-weight: 500;
      color: var(--text-s);
      line-height: 1.7;
      max-width: 520px;
      margin-bottom: 40px;
    }

    .cover-stats {
      background: var(--dark-bg);
      padding: 28px 50px;
      display: flex;
      justify-content: space-around;
      align-items: center;
      margin-top: auto;
    }

    .cover-stat { text-align: center; }

    .cover-stat .number {
      font-size: 28px;
      font-weight: 800;
      color: var(--gold);
    }

    .cover-stat .label {
      font-size: 10px;
      color: rgba(255,255,255,0.45);
      margin-top: 4px;
      font-weight: 500;
    }

    /* ---- PAGE HEADER ---- */
    .page-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 20px 50px;
      margin-bottom: 10px;
    }

    .page-header img { height: 20px; }

    .page-header .header-badge {
      font-size: 9px;
      color: var(--violet);
      border: 1.5px solid var(--violet);
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
      color: var(--primary);
      margin-bottom: 8px;
      letter-spacing: -0.4px;
    }

    h2 {
      font-size: 20px;
      font-weight: 800;
      color: var(--primary);
      margin-top: 32px;
      margin-bottom: 10px;
      letter-spacing: -0.3px;
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

    strong {
      font-weight: 700;
      color: var(--text);
    }

    em {
      font-style: italic;
      color: var(--violet);
    }

    /* Callout / quote blocks */
    blockquote {
      background: rgba(124,58,237,0.06);
      border-left: 4px solid var(--violet);
      border-radius: 0 12px 12px 0;
      padding: 18px 22px;
      margin: 16px 0;
    }

    blockquote p {
      color: var(--primary);
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
      border: 1.5px solid var(--border-light);
    }

    th {
      background: var(--bg);
      font-weight: 700;
      color: var(--primary);
      padding: 12px 16px;
      text-align: left;
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 1px;
      border-bottom: 1.5px solid var(--border);
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
      border-top: 1px solid var(--border-light);
      margin: 28px 0;
    }

    /* ---- FOOTER ---- */
    .page-footer {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      padding: 14px 50px;
      font-size: 9px;
      color: rgba(255,255,255,0.5);
      background: var(--dark-bg);
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
      <img src="${logoPurpleBase64}" alt="${brand_1.BRAND.company}" />
      <span class="tagline">${brand_1.BRAND.tagline}</span>
    </div>
    <div class="cover-content">
      <div class="cover-badge">Edge Sales Document</div>
      <div class="cover-title">${docTitle}</div>
      <div class="cover-subtitle">
        ${brand_1.BRAND.subtitle}. Edge provides dedicated, campus-based professionals who integrate into your workflows — fully managed, HIPAA compliant, and ready from day one.
      </div>
    </div>
    <div class="cover-stats">
      <div class="cover-stat"><div class="number">97%</div><div class="label">Retention Rate</div></div>
      <div class="cover-stat"><div class="number">7 days</div><div class="label">Avg. Match Time</div></div>
      <div class="cover-stat"><div class="number">60-70%</div><div class="label">Cost Savings</div></div>
      <div class="cover-stat"><div class="number">2-4%</div><div class="label">Acceptance Rate</div></div>
    </div>
  </div>

  <!-- CONTENT PAGES -->
  <div class="page-header">
    <img src="${logoPurpleBase64}" alt="${brand_1.BRAND.company}" />
    <span class="header-badge">${brand_1.BRAND.tagline}</span>
  </div>

  <div class="content-body">
    ${content}
  </div>

  <!-- FOOTER -->
  <div class="page-footer">
    <div>
      <img src="${logoWhiteBase64}" alt="${brand_1.BRAND.company}" />
      <div style="margin-top: 3px;">${brand_1.BRAND.address}</div>
      <div>${brand_1.BRAND.website}</div>
    </div>
    <div class="footer-right">
      &copy; ${new Date().getFullYear()} ${brand_1.BRAND.fullName}.<br/>All rights reserved.
    </div>
  </div>

</body>
</html>`;
}
//# sourceMappingURL=htmlTemplate.js.map