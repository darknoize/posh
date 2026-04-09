const fs = require('fs');
const path = require('path');

const outDir = path.resolve(__dirname, '../core-products/products');

const iconLabels = {
  'HF-RFID.png': 'High Frequency RFID',
  'LF-RFID.png': 'Low Frequency RFID',
  'DF-RFID.png': 'Dual Frequency RFID',
  'FingerPrint.png': 'Fingerprint Reader',
  'IC-SC.png': 'Smart Chip Reader',
  'mag_card.png': 'Magnetic Card Reader',
  '2DW.png': 'Barcode Reader',
  'POS.png': 'Point of Sale',
  'BlueTooth.png': 'Bluetooth'
};

const familyByName = {
  'K9-MAG-2DW': 'K9 Family',
  'K9-MAG-2DW-FP': 'K9 Family',
  'K9Jr-2DW': 'K9Jr Family',
  'K9Jr-BT-2DW': 'K9Jr Family',
  'POS108': 'POS Family',
  'POS708': 'POS Family',
  'MX5PT': 'MX5-PT Family',
  'MX5C-CBP-EM': 'MX5C Family',
  'MX5C-CBP-EM-FP': 'MX5C Family',
  'MX5C-CBP-M2': 'MX5C Family',
  'MX5C-CBP-M2-FP': 'MX5C Family',
  'MX5C-CBP-SC': 'MX5C Family',
  'MX5C-CBP-SC-FP': 'MX5C Family',
  'MX5P3-SC': 'MX5-P3 Family',
  'MX5P3-SC-FP': 'MX5-P3 Family',
  'MX5P3-SC-M2': 'MX5-P3 Family',
  'MX5P3-SC-M2-FP': 'MX5-P3 Family',
  'MX5PC-SC-M2': 'MX5-PC Family',
  'MX5PC-SC-M2-FP': 'MX5-PC Family',
  'MX53-CBP-CLS': 'MX53 Family',
  'MX53-CBP-LIT': 'MX53 Family',
  'MX53-CBP-EM': 'MX53 Family',
  'MX53-CBP-EM-FP': 'MX53 Family',
  'MX53-CBP-M2': 'MX53 Family',
  'MX53-CBP-M2-FP': 'MX53 Family'
};

const fileNameByName = {
  'K9-MAG-2DW': 'k9-mag-2dw.html',
  'K9-MAG-2DW-FP': 'k9-mag-2dw-fp.html',
  'K9Jr-2DW': 'k9jr-2dw.html',
  'K9Jr-BT-2DW': 'k9jr-bt-2dw.html',
  'POS108': 'pos-108.html',
  'POS708': 'pos-708.html',
  'MX5PT': 'mx5-pt.html',
  'MX5C-CBP-EM': 'mx5c-cbp-em.html',
  'MX5C-CBP-EM-FP': 'mx5c-cbp-em-fp.html',
  'MX5C-CBP-M2': 'mx5c-cbp-m2.html',
  'MX5C-CBP-M2-FP': 'mx5c-cbp-m2-fp.html',
  'MX5C-CBP-SC': 'mx5c-cbp-sc.html',
  'MX5C-CBP-SC-FP': 'mx5c-cbp-sc-fp.html',
  'MX5P3-SC': 'mx5-p3-sc.html',
  'MX5P3-SC-FP': 'mx5-p3-sc-fp.html',
  'MX5P3-SC-M2': 'mx5-p3-sc-m2.html',
  'MX5P3-SC-M2-FP': 'mx5-p3-sc-m2-fp.html',
  'MX5PC-SC-M2': 'mx5-pc-sc-m2.html',
  'MX5PC-SC-M2-FP': 'mx5-pc-sc-m2-fp.html',
  'MX53-CBP-CLS': 'mx53-cbp-cls.html',
  'MX53-CBP-LIT': 'mx53-cbp-lit.html',
  'MX53-CBP-EM': 'mx53-cbp-em.html',
  'MX53-CBP-EM-FP': 'mx53-cbp-em-fp.html',
  'MX53-CBP-M2': 'mx53-cbp-m2.html',
  'MX53-CBP-M2-FP': 'mx53-cbp-m2-fp.html'
};

const displayName = (name) => name
  .replace(/^MX5PT$/, 'MX5-PT')
  .replace(/^POS108$/, 'POS-108')
  .replace(/^POS708$/, 'POS-708')
  .replace(/^MX5P3/, 'MX5-P3')
  .replace(/^MX5PC/, 'MX5-PC');

const esc = (v) => String(v || '')
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;')
  .replace(/'/g, '&#39;');

(async () => {
  const res = await fetch('https://www.poshmfg.ca/assets/products/products_data.json');
  const data = await res.json();

  let written = 0;
  for (const p of data.products) {
    const file = fileNameByName[p.name];
    if (!file) continue;

    const title = displayName(p.name);
    const subtitle = familyByName[p.name] || 'Product Family';
    const slug = file.replace(/\.html$/, '');
    const image = `https://www.poshmfg.ca/assets/products/${encodeURIComponent(p.name)}/${encodeURIComponent((p.images || [])[0] || 'front.png')}`;

    const iconMarkup = (p.icons || []).map((icon) => {
      const label = iconLabels[icon] || icon;
      return `<span class="product-feature-icon" title="${esc(label)}"><img src="../../assets/images/icons/${esc(icon)}" alt="${esc(label)}" /></span>`;
    }).join('');

    const downloads = (p.downloads || []).map((d) => {
      const url = `https://www.poshmfg.ca/assets/downloads/${d.url}`;
      return `<a class="button button-light" href="${esc(url)}" target="_blank" rel="noopener">${esc(d.label || 'Download')}</a>`;
    }).join('\n          ');

    const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>${esc(title)} | POSHMFG</title>
  <script id="theme-init">(function(){try{var saved=localStorage.getItem("posch-theme");var theme=saved||"dark";document.documentElement.setAttribute("data-theme",theme);}catch(e){document.documentElement.setAttribute("data-theme","dark");}})();</script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="../../assets/css/styles.css" />
  <link rel="stylesheet" href="../styles.css" />
</head>
<body class="core-products-body">
  <header class="site-header inner-header">
    <div class="shell nav-wrap glass">
      <a class="brand brand-image" href="../../index.html" aria-label="POSH home"><img class="brand-logo brand-logo-dark" src="../../assets/images/Poshlogo_sm-dark.png" alt="POSH" /><img class="brand-logo brand-logo-light" src="../../assets/images/Poshlogo_sm-light.png" alt="POSH" /></a>
      <button class="nav-toggle" aria-expanded="false" aria-controls="site-nav"><span></span><span></span><span></span></button>
      <nav id="site-nav" class="site-nav">
        <div class="nav-links">
          <a href="../../index.html">Home</a>
          <a href="../../about.html">About Us</a>
          <a href="../../products.html" class="active">Products</a>
          <a href="../../use-cases.html">Use Cases</a>
          <a href="../../downloads.html">Downloads</a>
          <a href="../../contact.html">Contact Us</a>
        </div>
        <div class="nav-actions">
          <div class="theme-switcher" role="group" aria-label="Theme switcher">
            <button class="theme-option" type="button" data-theme-value="dark" aria-pressed="false" aria-label="Dark theme"><img src="../../assets/images/theme-toggle-dark.svg" alt="" class="theme-icon" /></button>
            <button class="theme-option" type="button" data-theme-value="light" aria-pressed="false" aria-label="Light theme"><img src="../../assets/images/theme-toggle-light.svg" alt="" class="theme-icon" /></button>
          </div>
          <a class="button button-light" href="../../contact.html#inquiry">Request Consultation</a>
        </div>
      </nav>
    </div>
  </header>

  <div class="page-shell">
    <header class="page-header">
      <p class="eyebrow">POSH MFG</p>
      <a class="product-search-link" href="../../products.html#core" aria-label="Back to Products">Back to Products</a>
    </header>

    <main class="product-page">
      <section class="panel product-hero">
        <div class="product-hero-frame">
          <img src="${esc(image)}" alt="${esc(title)}">
        </div>
      </section>

      <aside class="panel product-copy" data-product-slug="${esc(slug)}">
        <p class="detail-label">Product Detail</p>
        <h2>${esc(title)}</h2>
        <div class="product-feature-icons" aria-label="Product capabilities">${iconMarkup}</div>
        <p class="detail-subtitle">${esc(subtitle)}</p>
        <p class="detail-description">${esc(String(p.description || '').replace(/\s+/g, ' ').trim())}</p>

        <div class="detail-actions">
          ${downloads || '<a class="button button-light" href="../../downloads.html">Downloads</a>'}
        </div>
      </aside>
    </main>
  </div>

  <footer class="site-footer">
    <div class="shell footer-bottom">© 2026 POSH MFG. All rights reserved.</div>
  </footer>
  <script src="../../assets/js/main.js"></script>
</body>
</html>
`;

    fs.writeFileSync(path.join(outDir, file), html, 'utf8');
    written += 1;
  }

  console.log(`Wrote ${written} variant pages.`);
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
