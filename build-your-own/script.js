
const activeFilters = new Set();
const chips = Array.from(document.querySelectorAll('.feature-chip'));
const resultCount = document.getElementById('resultCount');
const emptyState = document.getElementById('emptyState');
const clearFilters = document.getElementById('clearFilters');
const variantSearchInput = document.getElementById('variantSearchInput');
const productGrid = document.getElementById('productGrid');

let cards = [];
let copyBlocks = [];
let searchQuery = '';
const focusSlug = new URLSearchParams(window.location.search).get('focus') || '';
const productLibrary = window.POSH_PRODUCT_LIBRARY || {};
const ICON_META = productLibrary.iconMeta || {};
const FAMILY_ORDER = productLibrary.familyOrder || ['K9', 'K9Jr', 'POS', 'MX5-PT', 'MX5C', 'MX5-P3', 'MX5-PC', 'MX53'];
const VARIANT_CATALOG = Array.isArray(productLibrary.variants) ? productLibrary.variants : [];

function normalizeDisplayName(name) {
  return name
    .replace(/^MX5PT$/, 'MX5-PT')
    .replace(/^POS108$/, 'POS-108')
    .replace(/^POS708$/, 'POS-708')
    .replace(/^MX5P3/, 'MX5-P3')
    .replace(/^MX5PC/, 'MX5-PC');
}

function escapeHtml(value) {
  return String(value || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function escapeRegExp(value) {
  return String(value || '').replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function tokenizeSearch(value) {
  return String(value || '')
    .toLowerCase()
    .split(/\s+/)
    .map((token) => token.trim())
    .filter(Boolean);
}

function variantSlugFromName(name) {
  return String(name || '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function buildDescriptionHtml(rawDescription, terms) {
  const uniqueTerms = Array.from(new Set((terms || []).map((term) => String(term || '').trim()).filter(Boolean)))
    .sort((a, b) => b.length - a.length);

  let html = escapeHtml(rawDescription || '');
  uniqueTerms.forEach((term) => {
    const pattern = new RegExp(`(${escapeRegExp(term)})`, 'gi');
    html = html.replace(pattern, '<strong>$1</strong>');
  });
  return html;
}

function buildProductHref(detailHref, targetSlug) {
  const normalizedHref = String(detailHref || '').replace(/^\.\//, '').replace(/^\//, '');
  if (!normalizedHref) {
    return '';
  }

  const url = new URL(`../${normalizedHref}`, window.location.href);
  if (targetSlug) {
    url.searchParams.set('product', targetSlug);
  }
  return url.pathname + url.search + url.hash;
}

function getVariantCards() {
  const sharedCatalog = window.poshProductCatalog || {};

  return VARIANT_CATALOG
    .slice()
    .sort((a, b) => {
      const aFamily = FAMILY_ORDER.indexOf(a.family);
      const bFamily = FAMILY_ORDER.indexOf(b.family);
      if (aFamily !== bFamily) return aFamily - bFamily;
      return normalizeDisplayName(a.name).localeCompare(normalizeDisplayName(b.name));
    })
    .map((variant) => {
      const shared = sharedCatalog[variant.targetSlug] || {};
      const detailHref = variant.pageSlug
        ? `core-products/products/${variant.pageSlug}.html`
        : (variant.detailHref || '');
      const variantSlug = variant.pageSlug || variantSlugFromName(variant.name);
      const variableTokens = Array.isArray(variant.variables)
        ? variant.variables
        : String(variant.name || '')
        .split('-')
        .filter((token) => token && token !== variant.family);
      const tags = variant.icons
        .map((icon) => ({
          icon,
          key: ICON_META[icon]?.key,
          label: ICON_META[icon]?.label || icon
        }))
        .filter((item) => item.key);

      const features = tags.map((tag) => tag.key).join(' ');
      const title = variant.title || normalizeDisplayName(variant.name);
      const subtitleParts = [];
      if (variant.family) subtitleParts.push(`${variant.family} Family`);
      if (shared.subtitle) subtitleParts.push(shared.subtitle);
      const description = variant.description || shared.description || 'Variant configuration from the legacy catalog.';
      const searchIndex = [
        variant.name,
        title,
        variant.family,
        variableTokens.join(' '),
        shared.title,
        shared.subtitle,
        description,
        ...tags.map((tag) => `${tag.key} ${tag.label}`)
      ].join(' ').toLowerCase();

      return {
        title,
        subtitle: subtitleParts.join(' • ') || 'Variant configuration',
        description,
        image: variant.image || (shared.image ? `../${shared.image}` : '../assets/images/products/posh-products-04.png'),
        href: buildProductHref(detailHref, variantSlug),
        features,
        tags,
        variableTokens,
        targetSlug: variantSlug,
        family: variant.family,
        searchIndex
      };
    });
}

function renderVariantCards() {
  if (!productGrid) return;

  const variants = getVariantCards();
  productGrid.innerHTML = variants
    .map((item) => `
      <article class="product-card" data-product="${escapeHtml(item.targetSlug)}" data-features="${escapeHtml(item.features)}" data-search-index="${escapeHtml(item.searchIndex)}">
        <div class="product-media">
          <img src="${escapeHtml(item.image)}" alt="${escapeHtml(item.title)}">
        </div>
        <div class="product-copy">
          <h3>${escapeHtml(item.title)}</h3>
          <p class="product-sub">${escapeHtml(item.subtitle)}</p>
          <p class="variant-variables"><strong>Variables:</strong> ${escapeHtml(item.variableTokens.join(' + ') || 'Base')}</p>
          <p class="product-desc" data-raw-description="${escapeHtml(item.description)}">${buildDescriptionHtml(item.description, [item.title, item.family, ...item.tags.map((tag) => tag.label)])}</p>
          <div class="tag-row">${item.tags.map((tag) => `<span class="tag"><img src="../assets/images/icons/${escapeHtml(tag.icon)}" alt="${escapeHtml(tag.label)}"><span>${escapeHtml(tag.label)}</span></span>`).join('')}</div>
          <div class="card-actions">
            <a class="btn btn-primary" href="${escapeHtml(item.href)}">View Product</a>
          </div>
        </div>
      </article>`)
    .join('');

  cards = Array.from(productGrid.querySelectorAll('.product-card'));
  copyBlocks = Array.from(productGrid.querySelectorAll('.product-copy'));

  copyBlocks.forEach((copy) => {
    copy.addEventListener('scroll', () => updateScrollIndicator(copy), { passive: true });
  });
}

function updateDescriptionHighlights() {
  const searchTerms = tokenizeSearch(searchQuery);

  cards.forEach((card) => {
    const desc = card.querySelector('.product-desc');
    if (!desc) return;

    const raw = desc.dataset.rawDescription || desc.textContent || '';
    const title = card.querySelector('h3')?.textContent || '';
    const subtitle = card.querySelector('.product-sub')?.textContent || '';
    const tagTerms = Array.from(card.querySelectorAll('.tag span')).map((el) => el.textContent || '');
    const terms = [
      title,
      subtitle,
      ...tagTerms,
      'RFID',
      'NFC',
      'Magstripe',
      'Barcode',
      'Bluetooth',
      'Smart Card',
      'Fingerprint',
      'Point of Sale',
      ...searchTerms
    ];

    desc.innerHTML = buildDescriptionHtml(raw, terms);
  });
}

function ensureScrollTrack(copy) {
  let track = copy.querySelector('.scroll-track');
  if (!track) {
    track = document.createElement('span');
    track.className = 'scroll-track';
    const thumb = document.createElement('span');
    thumb.className = 'scroll-thumb';
    track.appendChild(thumb);
    copy.appendChild(track);
  }
  return track;
}

function updateScrollIndicator(copy) {
  const track = ensureScrollTrack(copy);
  const thumb = track.firstElementChild;
  const hasOverflow = copy.scrollHeight > copy.clientHeight + 1;

  copy.classList.toggle('has-overflow', hasOverflow);
  if (!hasOverflow || copy.clientHeight <= 0) {
    thumb.style.height = '0px';
    thumb.style.transform = 'translateY(0)';
    return;
  }

  const trackHeight = track.clientHeight;
  const thumbHeight = Math.max(24, (copy.clientHeight / copy.scrollHeight) * trackHeight);
  const maxScrollTop = copy.scrollHeight - copy.clientHeight;
  const scrollRatio = maxScrollTop > 0 ? copy.scrollTop / maxScrollTop : 0;
  const maxThumbTop = trackHeight - thumbHeight;
  const thumbTop = scrollRatio * maxThumbTop;

  thumb.style.height = `${thumbHeight}px`;
  thumb.style.transform = `translateY(${thumbTop}px)`;
}

function updateAllScrollIndicators() {
  copyBlocks.forEach(updateScrollIndicator);
}

function updateResults() {
  let visible = 0;
  const searchTokens = tokenizeSearch(searchQuery);

  cards.forEach(card => {
    const features = card.dataset.features.split(' ');
    const iconMatches = [...activeFilters].every(feature => features.includes(feature));
    const haystack = card.dataset.searchIndex || '';
    const searchMatches = searchTokens.every((token) => haystack.includes(token));

    const show = iconMatches && searchMatches;
    card.style.display = show ? 'grid' : 'none';
    if (show) visible += 1;
  });

  resultCount.textContent = `${visible}/${cards.length}`;
  emptyState.classList.toggle('is-visible', visible === 0);
  updateDescriptionHighlights();
  requestAnimationFrame(updateAllScrollIndicators);
}

function focusRequestedCard() {
  if (!focusSlug || !cards.length) return;

  const target = cards.find((card) => card.dataset.product === focusSlug);
  if (!target) return;

  cards.forEach((card) => card.classList.remove('is-focus-target'));
  target.classList.add('is-focus-target');
  target.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

if (productGrid) {
  productGrid.addEventListener('click', (event) => {
    const link = event.target.closest('a[href]');
    if (!link || !productGrid.contains(link)) return;

    const href = link.getAttribute('href');
    if (!href || href === '#') {
      event.preventDefault();
      return;
    }

    event.preventDefault();
    window.location.assign(link.href);
  });
}

chips.forEach(chip => {
  chip.addEventListener('click', () => {
    const feature = chip.dataset.feature;
    if (activeFilters.has(feature)) {
      activeFilters.delete(feature);
      chip.classList.remove('is-active');
      chip.setAttribute('aria-pressed', 'false');
    } else {
      activeFilters.add(feature);
      chip.classList.add('is-active');
      chip.setAttribute('aria-pressed', 'true');
    }
    updateResults();
  });
});

clearFilters.addEventListener('click', () => {
  activeFilters.clear();
  chips.forEach(chip => {
    chip.classList.remove('is-active');
    chip.setAttribute('aria-pressed', 'false');
  });
  if (variantSearchInput) {
    variantSearchInput.value = '';
  }
  searchQuery = '';
  updateResults();
});

if (variantSearchInput) {
  variantSearchInput.addEventListener('input', () => {
    searchQuery = variantSearchInput.value.trim().toLowerCase();
    updateResults();
  });
}

window.addEventListener('resize', updateAllScrollIndicators);

renderVariantCards();
updateResults();
focusRequestedCard();
