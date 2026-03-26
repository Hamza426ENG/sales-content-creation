import { BRAND, getLogoBase64, getLogoWhiteBase64, getLogoPurpleBase64 } from './brand';

export function wrapInHtml(content: string, title?: string): string {
  const logoPurpleBase64 = getLogoPurpleBase64();
  const logoWhiteBase64 = getLogoWhiteBase64();
  const docTitle = title || 'Sales Content';

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <style>
    @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700;800&display=swap');

    * { margin: 0; padding: 0; box-sizing: border-box; }
    @page { margin: 0; size: A4; }

    body {
      font-family: 'DM Sans', system-ui, sans-serif;
      line-height: 1.7;
      color: #111827;
      -webkit-font-smoothing: antialiased;
    }

    /* ========== COVER PAGE ========== */
    .cover-page {
      width: 100%;
      height: 297mm; /* A4 height */
      background: #E5D9F9;
      display: flex;
      flex-direction: column;
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
    .cover-header img { height: 28px; }
    .cover-header .tagline {
      font-size: 11px;
      font-weight: 700;
      color: #4A0F70;
      border: 1.5px solid #4A0F70;
      border-radius: 100px;
      padding: 5px 16px;
      text-transform: uppercase;
      letter-spacing: 1.5px;
    }

    .cover-body {
      padding: 50px 50px 0;
      flex: 1;
    }
    .cover-title {
      font-size: 38px;
      font-weight: 800;
      color: #4A0F70;
      line-height: 1.15;
      letter-spacing: -0.5px;
      max-width: 580px;
      margin-bottom: 10px;
    }
    .cover-dotted {
      border: none;
      border-top: 2px dotted #9CA3AF;
      margin: 18px 0 20px;
      opacity: 0.35;
    }
    .cover-desc {
      font-size: 14px;
      color: #4B5563;
      line-height: 1.7;
      max-width: 460px;
    }

    /* Green callout */
    .cover-callout {
      background: #ECFDF5;
      border-radius: 12px;
      padding: 18px 22px;
      margin-top: 24px;
      max-width: 400px;
    }
    .cover-callout p {
      font-size: 13px;
      font-weight: 600;
      color: #4A0F70;
      font-style: italic;
      line-height: 1.5;
      margin: 0;
    }

    /* Stats bar — Plum purple, positioned above fixed footer */
    .cover-stats {
      background: #4A0F70;
      padding: 24px 50px 40px; /* extra bottom padding so labels don't get clipped */
      margin-bottom: 50px; /* space for fixed footer below */
      display: flex;
      justify-content: space-around;
      align-items: center;
    }
    .cover-stat { text-align: center; }
    .cover-stat .num {
      font-size: 26px;
      font-weight: 800;
      color: #D97706;
    }
    .cover-stat .lbl {
      font-size: 10px;
      color: rgba(255,255,255,0.8);
      margin-top: 3px;
    }

    /* Cover footer — hidden since fixed page-footer covers all pages */
    .cover-footer { display: none; }

    /* ========== CONTENT PAGES ========== */
    .content-page {
      padding: 0 0 60px;
      page-break-before: auto;
    }

    .page-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 20px 50px;
      border-bottom: 1px solid #F0F0F4;
      margin-bottom: 10px;
    }
    .page-header img { height: 22px; }
    .page-header .badge {
      font-size: 9px;
      color: #4A0F70;
      border: 1.5px solid #4A0F70;
      border-radius: 100px;
      padding: 4px 14px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 1.5px;
    }

    .content-body {
      padding: 10px 50px 100px; /* extra bottom padding for footer */
    }

    /* Typography */
    h1 {
      font-size: 26px;
      font-weight: 800;
      color: #4A0F70;
      margin-bottom: 6px;
      letter-spacing: -0.4px;
    }
    h2 {
      font-size: 19px;
      font-weight: 700;
      color: #4A0F70;
      margin-top: 28px;
      margin-bottom: 10px;
      position: relative;
      padding-bottom: 10px;
    }
    h2::after {
      content: '';
      position: absolute;
      bottom: 0; left: 0;
      width: 50px; height: 3px;
      background: #059669;
      border-radius: 2px;
    }
    h3 {
      font-size: 14px;
      font-weight: 700;
      color: #111827;
      margin-top: 20px;
      margin-bottom: 6px;
    }
    p {
      margin-bottom: 10px;
      font-size: 12.5px;
      color: #4B5563;
      line-height: 1.7;
    }
    ul, ol {
      margin-bottom: 12px;
      padding-left: 20px;
    }
    li {
      margin-bottom: 4px;
      font-size: 12.5px;
      color: #4B5563;
      line-height: 1.6;
    }
    li::marker { color: #059669; }
    strong { font-weight: 700; color: #111827; }
    em { font-style: italic; color: #4A0F70; }

    /* Blockquotes — green callout per brand guidelines */
    blockquote {
      background: #ECFDF5;
      border-radius: 12px;
      padding: 18px 22px;
      margin: 14px 0;
      border: none;
    }
    blockquote p {
      color: #4A0F70;
      font-weight: 600;
      font-style: italic;
      font-size: 13px;
      margin: 0;
    }

    /* Tables */
    table {
      width: 100%;
      border-collapse: separate;
      border-spacing: 0;
      margin: 14px 0;
      border-radius: 10px;
      overflow: hidden;
      border: 1.5px solid #E9E9ED;
    }
    th {
      background: #E5D9F9;
      font-weight: 700;
      color: #4A0F70;
      padding: 10px 14px;
      text-align: left;
      font-size: 11px;
      border-bottom: 2px solid #059669;
    }
    td {
      padding: 9px 14px;
      font-size: 11.5px;
      color: #4B5563;
      border-bottom: 1px solid #F0F0F4;
    }
    tr:last-child td { border-bottom: none; }

    /* Dotted divider */
    hr {
      border: none;
      border-top: 2px dotted #9CA3AF;
      margin: 22px 0;
      opacity: 0.25;
    }

    /* ========== PAGE FOOTER — fixed on every page except cover ========== */
    .page-footer {
      position: fixed;
      bottom: 0; left: 0; right: 0;
      padding: 12px 50px;
      font-size: 9px;
      color: rgba(255,255,255,0.75);
      background: #4A0F70;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .page-footer img { height: 14px; }
    .footer-right { text-align: right; }

    /* Hide fixed footer on cover page (cover has its own footer) */
    .cover-page ~ .page-footer { display: flex; }
    @media print {
      .cover-page { page-break-after: always; }
    }
  </style>
</head>
<body>

  <!-- COVER PAGE -->
  <div class="cover-page">
    <div class="cover-header">
      <img src="${logoPurpleBase64}" alt="${BRAND.company}" />
      <span class="tagline">${BRAND.tagline}</span>
    </div>
    <div class="cover-body">
      <div class="cover-title">${docTitle}</div>
      <hr class="cover-dotted" />
      <div class="cover-desc">
        ${BRAND.subtitle}. Edge provides dedicated, campus-based professionals who integrate into your workflows — fully managed, HIPAA compliant, and ready from day one.
      </div>
      <div class="cover-callout">
        <p>"Edge is in a tier of their own and then there's everybody else."<br/>— Jose Melendez, President, Melendez Insurance Group</p>
      </div>
    </div>
    <div class="cover-stats">
      <div class="cover-stat"><div class="num">97%</div><div class="lbl">retention rate</div></div>
      <div class="cover-stat"><div class="num">7 days</div><div class="lbl">avg. match time</div></div>
      <div class="cover-stat"><div class="num">60-70%</div><div class="lbl">cost savings</div></div>
      <div class="cover-stat"><div class="num">2-4%</div><div class="lbl">acceptance rate</div></div>
    </div>
    <div class="cover-footer">
      <div>
        <img src="${logoWhiteBase64}" alt="${BRAND.company}" />
        <div style="margin-top:2px">${BRAND.address}</div>
        <div>${BRAND.website}</div>
      </div>
      <div style="text-align:right">
        &copy; ${new Date().getFullYear()} ${BRAND.fullName}.<br/>All rights reserved.
      </div>
    </div>
  </div>

  <!-- CONTENT PAGES -->
  <div class="content-page">
    <div class="page-header">
      <img src="${logoPurpleBase64}" alt="${BRAND.company}" />
      <span class="badge">${BRAND.tagline}</span>
    </div>
    <div class="content-body">
      ${content}
    </div>
  </div>

  <!-- FIXED FOOTER on content pages -->
  <div class="page-footer">
    <div>
      <img src="${logoWhiteBase64}" alt="${BRAND.company}" />
      <div style="margin-top:2px">${BRAND.address}</div>
      <div>${BRAND.website}</div>
    </div>
    <div class="footer-right">
      &copy; ${new Date().getFullYear()} ${BRAND.fullName}.<br/>All rights reserved.
    </div>
  </div>

</body>
</html>`;
}
