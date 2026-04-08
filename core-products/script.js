
const products = [{'slug': 'mx5p3-sc-m2-fp', 'title': 'MX5P3-SC-M2-FP', 'subtitle': 'Core multi-format platform', 'description': 'A central multi-format reader platform designed as the anchor product in the MX ecosystem. This page can hold your production specifications, configuration options, credential support, and deployment guidance.', 'image': 'product-core.png', 'x': 50, 'y': 44, 'size': 23}, {'slug': 'k9jr-bt-2dw-front', 'title': 'K9Jr-BT-2DW', 'subtitle': 'Bluetooth keyboard variant', 'description': 'Compact peripheral format for workflows that need wireless keyboard interaction and 2D scanning support. Use this page for technical positioning, workflows, and accessory integration.', 'image': 'product-k9-front.png', 'x': 26, 'y': 22, 'size': 11}, {'slug': 'k9jr-bt-2dw-top', 'title': 'K9Jr-BT-2DW', 'subtitle': 'Primary compact unit', 'description': 'An alternate presentation of the K9Jr platform showing the broader housing and hardware surface. Useful for product-family storytelling and dimensional reference.', 'image': 'product-k9-rear.png', 'x': 50, 'y': 14, 'size': 11}, {'slug': 'k9jr-bt-2dw-rear', 'title': 'K9Jr-BT-2DW', 'subtitle': 'Rear hardware perspective', 'description': 'Rear and side perspective for the K9Jr variant, useful for housing, mounting, and integration storytelling in a more technical product-detail page.', 'image': 'product-compact-side.png', 'x': 73, 'y': 21, 'size': 11}, {'slug': 'mx5pt-classic', 'title': 'MX5PT', 'subtitle': 'Table top reader classic', 'description': 'Low-profile tabletop presentation designed for controlled access, desk placement, and modular credential workflows. Ideal for describing install environments and operational use cases.', 'image': 'product-classic.png', 'x': 18, 'y': 46, 'size': 11}, {'slug': 'mx5pt-wedge', 'title': 'MX5PT', 'subtitle': 'Table top reader wedge', 'description': 'Angular tabletop reader format for clean surface deployments. Use this layout to present product photography, features, and integration notes in your established site style.', 'image': 'product-tabletop.png', 'x': 81, 'y': 44, 'size': 11}, {'slug': 'mx5pt-rfid-display', 'title': 'MX5PT', 'subtitle': 'RFID display variant', 'description': 'Front-facing display-equipped RFID presentation suitable for readers that need stronger local feedback, device state indication, or enhanced user interaction.', 'image': 'product-front-rfid.png', 'x': 18, 'y': 73, 'size': 11}, {'slug': 'mx5pt-rfid-low-profile', 'title': 'MX5PT', 'subtitle': 'Low-profile RFID reader', 'description': 'Slim RFID form factor for a compact hardware story. This page is ready for a more polished product description, documentation links, and technical feature callouts.', 'image': 'product-front-rfid-chip.png', 'x': 43, 'y': 84, 'size': 11}, {'slug': 'mx5pt-rfid-chip', 'title': 'MX5PT', 'subtitle': 'RFID and chip variant', 'description': 'RFID and smart-chip capable tabletop configuration built from the same core product language. Use this page to explain dual-mode credentials and workflow flexibility.', 'image': 'product-top-chip-rfid.png', 'x': 62, 'y': 82, 'size': 11}];

const detailImage = document.getElementById('detailImage');
const detailTitle = document.getElementById('detailTitle');
const detailSubtitle = document.getElementById('detailSubtitle');
const detailDescription = document.getElementById('detailDescription');
const detailLink = document.getElementById('detailLink');

function setActiveProduct(slug) {
  const product = products.find(p => p.slug === slug);
  if (!product) return;

  detailImage.src = `assets/${product.image}`;
  detailImage.alt = product.title;
  detailTitle.textContent = product.title;
  detailSubtitle.textContent = product.subtitle;
  detailDescription.textContent = product.description;
  detailLink.href = `products/${product.slug}.html`;

  document.querySelectorAll('[data-product]').forEach(el => {
    el.classList.toggle('active', el.dataset.product === slug);
  });
}

document.querySelectorAll('.hotspot, .thumb-link').forEach(el => {
  el.addEventListener('mouseenter', () => setActiveProduct(el.dataset.product));
  el.addEventListener('focus', () => setActiveProduct(el.dataset.product));
  el.addEventListener('click', () => setActiveProduct(el.dataset.product));
});

const thumbScroller = document.getElementById('thumbScroller');
const thumbPrev = document.getElementById('thumbPrev');
const thumbNext = document.getElementById('thumbNext');

if (thumbScroller && thumbPrev && thumbNext) {
  const scrollStep = () => Math.max(220, Math.floor(thumbScroller.clientWidth * 0.7));

  thumbPrev.addEventListener('click', () => {
    thumbScroller.scrollBy({ left: -scrollStep(), behavior: 'smooth' });
  });

  thumbNext.addEventListener('click', () => {
    thumbScroller.scrollBy({ left: scrollStep(), behavior: 'smooth' });
  });
}
