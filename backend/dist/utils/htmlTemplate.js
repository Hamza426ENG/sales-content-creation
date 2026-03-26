"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wrapInHtml = wrapInHtml;
const brand_1 = require("./brand");
function wrapInHtml(content, title) {
    const logoPurpleBase64 = (0, brand_1.getLogoPurpleBase64)();
    const logoWhiteBase64 = (0, brand_1.getLogoWhiteBase64)();
    const docTitle = title || 'Sales Content';
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <style>
    @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap');
    * { margin: 0; padding: 0; box-sizing: border-box; }
    @page {
      size: A4;
      margin: 20mm 0 22mm 0;
    }
    body {
      font-family: 'DM Sans', system-ui, sans-serif;
      line-height: 1.65;
      color: #111827;
      -webkit-font-smoothing: antialiased;
    }

    /* ======== RUNNING HEADER (top of every page) ======== */
    .running-header {
      position: fixed;
      top: 0; left: 0; right: 0;
      height: 18mm;
      padding: 10px 50px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid #F0F0F4;
      background: #fff;
    }
    .running-header img { height: 20px; }
    .running-header .badge {
      font-size: 8px;
      color: #4A0F70;
      border: 1.5px solid #4A0F70;
      border-radius: 100px;
      padding: 3px 12px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 1.5px;
    }

    /* ======== RUNNING FOOTER (bottom of every page) ======== */
    .running-footer {
      position: fixed;
      bottom: 0; left: 0; right: 0;
      height: 20mm;
      padding: 8px 50px;
      font-size: 8px;
      color: rgba(255,255,255,0.75);
      background: #4A0F70;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .running-footer img { height: 13px; }

    /* ======== COVER SECTION (first page content) ======== */
    .cover {
      background: #E5D9F9;
      margin: -20mm 0 0 0;
      padding: 30px 50px 0;
      min-height: calc(100vh + 20mm);
      display: flex;
      flex-direction: column;
      page-break-after: always;
    }
    .cover-top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-bottom: 30px;
    }
    .cover-top img { height: 28px; }
    .cover-top .tagline {
      font-size: 10px;
      font-weight: 700;
      color: #4A0F70;
      border: 1.5px solid #4A0F70;
      border-radius: 100px;
      padding: 5px 14px;
      text-transform: uppercase;
      letter-spacing: 1.5px;
    }
    .cover-title {
      font-size: 36px;
      font-weight: 800;
      color: #4A0F70;
      line-height: 1.12;
      letter-spacing: -0.5px;
      max-width: 560px;
      margin-bottom: 8px;
    }
    .cover-line {
      border: none;
      border-top: 2px dotted #9CA3AF;
      margin: 16px 0;
      opacity: 0.35;
    }
    .cover-desc {
      font-size: 13px;
      color: #4B5563;
      line-height: 1.7;
      max-width: 440px;
    }
    .cover-quote {
      background: #ECFDF5;
      border-radius: 10px;
      padding: 16px 20px;
      margin-top: 20px;
      max-width: 400px;
    }
    .cover-quote p {
      font-size: 12px;
      font-weight: 600;
      color: #4A0F70;
      font-style: italic;
      line-height: 1.5;
      margin: 0;
    }
    .cover-bottom {
      margin-top: auto;
    }
    .cover-stats {
      background: #4A0F70;
      margin: 0 -50px;
      padding: 20px 50px;
      display: flex;
      justify-content: space-around;
    }
    .cover-stat { text-align: center; }
    .cover-stat .n { font-size: 24px; font-weight: 800; color: #D97706; }
    .cover-stat .l { font-size: 9px; color: rgba(255,255,255,0.8); margin-top: 2px; }

    /* ======== MAIN CONTENT ======== */
    .main-content {
      padding: 8px 50px 10px;
    }

    /* Typography */
    h1 { font-size: 24px; font-weight: 800; color: #4A0F70; margin-bottom: 6px; letter-spacing: -0.3px; }
    h2 {
      font-size: 17px; font-weight: 700; color: #4A0F70;
      margin-top: 24px; margin-bottom: 8px;
      padding-bottom: 8px; position: relative;
      page-break-after: avoid;
    }
    h2::after {
      content: ''; position: absolute; bottom: 0; left: 0;
      width: 45px; height: 3px; background: #059669; border-radius: 2px;
    }
    h3 {
      font-size: 13px; font-weight: 700; color: #111827;
      margin-top: 16px; margin-bottom: 4px;
      page-break-after: avoid;
    }
    p { margin-bottom: 8px; font-size: 11.5px; color: #4B5563; line-height: 1.65; }
    ul, ol { margin-bottom: 10px; padding-left: 18px; }
    li { margin-bottom: 3px; font-size: 11.5px; color: #4B5563; line-height: 1.6; }
    li::marker { color: #059669; }
    strong { font-weight: 700; color: #111827; }
    em { font-style: italic; color: #4A0F70; }

    /* Blockquotes */
    blockquote {
      background: #ECFDF5; border-radius: 10px;
      padding: 14px 18px; margin: 12px 0; border: none;
      page-break-inside: avoid;
    }
    blockquote p { color: #4A0F70; font-weight: 600; font-style: italic; font-size: 12px; margin: 0; }

    /* Tables */
    table {
      width: 100%; border-collapse: separate; border-spacing: 0;
      margin: 12px 0; border-radius: 8px; overflow: hidden;
      border: 1.5px solid #E9E9ED;
      page-break-inside: avoid;
    }
    th {
      background: #E5D9F9; font-weight: 700; color: #4A0F70;
      padding: 8px 12px; text-align: left; font-size: 10px;
      border-bottom: 2px solid #059669;
    }
    td { padding: 7px 12px; font-size: 10.5px; color: #4B5563; border-bottom: 1px solid #F0F0F4; }
    tr:last-child td { border-bottom: none; }

    hr { border: none; border-top: 2px dotted #9CA3AF; margin: 18px 0; opacity: 0.2; }
  </style>
</head>
<body>

  <!-- Running header (appears on every page via position:fixed) -->
  <div class="running-header">
    <img src="${logoPurpleBase64}" alt="Edge" />
    <span class="badge">${brand_1.BRAND.tagline}</span>
  </div>

  <!-- Running footer (appears on every page via position:fixed) -->
  <div class="running-footer">
    <div>
      <img src="${logoWhiteBase64}" alt="Edge" />
      <div style="margin-top:2px">${brand_1.BRAND.address}</div>
      <div>${brand_1.BRAND.website}</div>
    </div>
    <div style="text-align:right">
      &copy; ${new Date().getFullYear()} ${brand_1.BRAND.fullName}.<br/>All rights reserved.
    </div>
  </div>

  <!-- COVER PAGE -->
  <div class="cover">
    <div class="cover-top">
      <img src="${logoPurpleBase64}" alt="Edge" />
      <span class="tagline">${brand_1.BRAND.tagline}</span>
    </div>
    <div class="cover-title">${docTitle}</div>
    <hr class="cover-line" />
    <div class="cover-desc">
      ${brand_1.BRAND.subtitle}. Edge provides dedicated, campus-based professionals who integrate into your workflows — fully managed, HIPAA compliant, and ready from day one.
    </div>
    <div class="cover-quote">
      <p>"Edge is in a tier of their own and then there's everybody else."<br/>— Jose Melendez, President, Melendez Insurance Group</p>
    </div>
    <div class="cover-bottom">
      <div class="cover-stats">
        <div class="cover-stat"><div class="n">97%</div><div class="l">retention rate</div></div>
        <div class="cover-stat"><div class="n">7 days</div><div class="l">avg. match time</div></div>
        <div class="cover-stat"><div class="n">60-70%</div><div class="l">cost savings</div></div>
        <div class="cover-stat"><div class="n">2-4%</div><div class="l">acceptance rate</div></div>
      </div>
    </div>
  </div>

  <!-- CONTENT -->
  <div class="main-content">
    ${content}
  </div>

</body>
</html>`;
}
//# sourceMappingURL=htmlTemplate.js.map