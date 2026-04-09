
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
const SEQUENCE_CATALOG = Array.isArray(productLibrary.sequence) ? productLibrary.sequence : [];

const CORE_CAPABILITIES = {
  'mx5p3-sc-m2-fp': ['HF-RFID.png', 'IC-SC.png', 'mag_card.png', 'FingerPrint.png'],
  'pos108': ['POS.png'],
  'mx5-k9': ['BlueTooth.png', '2DW.png'],
  'mx5pt': ['HF-RFID.png', 'LF-RFID.png'],
  'mx5c-sc': ['IC-SC.png'],
  'mx5p3-sc-m2': ['HF-RFID.png', 'IC-SC.png', 'mag_card.png'],
  'mx5c-m2': ['HF-RFID.png'],
  'mx5c-m2-fp': ['HF-RFID.png', 'FingerPrint.png'],
  'mx5p3': ['IC-SC.png', 'mag_card.png'],
  'mx5-k9-jr': ['BlueTooth.png', '2DW.png']
};

const THUMBNAIL_OVERRIDES = {
  'core-products/products/k9jr-2dw.html': '../assets/images/products/K9Jr-BT-2DW.png',
  'core-products/products/k9jr-bt-2dw.html': '../assets/images/products/K9Jr-BT-2DW.png',
  'core-products/products/mx5pt-wedge.html': '../assets/images/products/orig-mx5c-cbp-sc-front.png',
  'core-products/products/mx5c-cbp-sc.html': '../assets/images/products/orig-mx5c-cbp-sc-front.png'
};

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

function bulletifyDescription(rawDescription) {
  const chunks = String(rawDescription || '')
    .split(/(?<=[.!?])\s+/)
    .map((chunk) => chunk.trim())
    .filter(Boolean);
  return chunks.length ? chunks : [String(rawDescription || '').trim()].filter(Boolean);
}

function buildDescriptionListHtml(rawDescription, terms) {
  return bulletifyDescription(rawDescription)
    .map((chunk) => `<li>${buildDescriptionHtml(chunk, terms)}</li>`)
    .join('');
}

function buildProductHref(detailHref) {
  const normalizedHref = String(detailHref || '').replace(/^\.\//, '').replace(/^\//, '');
  if (!normalizedHref) {
    return '';
  }

  return `../${normalizedHref}`;
}

function normalizeDetailHref(href) {
  return String(href || '').replace(/^\.\//, '').replace(/^\.\.\//, '').replace(/^\//, '');
}

function getCatalogCards() {
  const sharedCatalog = window.poshProductCatalog || {};
  const seenSequenceEntries = new Set();
  const sequenceItems = SEQUENCE_CATALOG.filter((item) => {
    const key = `${item.slug}::${item.href}`;
    if (seenSequenceEntries.has(key)) return false;
    seenSequenceEntries.add(key);
    return true;
  });
  const variantByPageSlug = new Map(VARIANT_CATALOG.map((variant) => [variant.pageSlug, variant]));
  const variantByHref = new Map(
    VARIANT_CATALOG
      .map((variant) => {
        const href = String(variant.detailHref || '').replace(/^\.\//, '').replace(/^\//, '');
        return [href.replace(/^core-products\/products\//, ''), variant];
      })
      .filter(([href]) => href)
  );

  return sequenceItems
    .slice()
    .sort((a, b) => {
      const aVariant = variantByPageSlug.get(a.slug) || variantByHref.get(a.href) || null;
      const bVariant = variantByPageSlug.get(b.slug) || variantByHref.get(b.href) || null;
      const aFamily = FAMILY_ORDER.indexOf(aVariant?.family || '');
      const bFamily = FAMILY_ORDER.indexOf(bVariant?.family || '');
      if (aFamily !== bFamily) return aFamily - bFamily;
      return String(a.title || a.slug).localeCompare(String(b.title || b.slug));
    })
    .map((sequenceItem) => {
      const variant = variantByPageSlug.get(sequenceItem.slug) || variantByHref.get(sequenceItem.href) || null;
      const shared = sharedCatalog[variant?.targetSlug || sequenceItem.slug] || {};
      const detailHref = `core-products/products/${sequenceItem.href}`;
      const thumbOverride = THUMBNAIL_OVERRIDES[detailHref] || '';
      const variableTokens = Array.isArray(variant?.variables) && variant.variables.length
        ? variant.variables
        : [String(sequenceItem.title || '').split('-').slice(1).join('-') || 'Base'].filter(Boolean);
      const iconFiles = Array.isArray(variant?.icons) && variant.icons.length
        ? variant.icons
        : (CORE_CAPABILITIES[sequenceItem.slug] || []);
      const tags = iconFiles
        .map((icon) => ({
          icon,
          key: ICON_META[icon]?.key,
          label: ICON_META[icon]?.label || icon
        }))
        .filter((item) => item.key);

      const features = tags.map((tag) => tag.key).join(' ');
      const title = variant?.title || sequenceItem.title || normalizeDisplayName(variant?.name || sequenceItem.slug);
      const subtitleParts = [];
      if (variant?.family) subtitleParts.push(`${variant.family} Family`);
      else if (sequenceItem.core) subtitleParts.push('Core Product');
      if (shared.subtitle) subtitleParts.push(shared.subtitle);
      const description = variant?.description || shared.description || 'Product configuration from the catalog.';
      const searchIndex = [
        variant?.name,
        title,
        variant?.family,
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
        image: thumbOverride || variant?.image || (shared.image ? `../${shared.image}` : '../assets/images/products/orig-mx5p3-sc-m2-fp-front.png'),
        href: buildProductHref(detailHref),
        pageHref: buildProductHref(detailHref),
        features,
        tags,
        variableTokens,
        targetSlug: sequenceItem.slug,
        family: variant?.family,
        searchIndex
      };
    });
}

async function hydrateCardImages() {
  const cardsWithHref = cards
    .map((card) => ({
      card,
      href: card.dataset.pageHref || ''
    }))
    .filter((item) => item.href);

  const uniqueHrefs = Array.from(new Set(cardsWithHref.map((item) => item.href)));
  if (!uniqueHrefs.length) return;

  const heroByHref = new Map();

  uniqueHrefs.forEach((href) => {
    const normalized = normalizeDetailHref(href);
    const override = THUMBNAIL_OVERRIDES[normalized];
    if (override) {
      heroByHref.set(href, new URL(override, window.location.href).href);
    }
  });

  await Promise.all(uniqueHrefs.map(async (href) => {
    if (heroByHref.has(href)) return;

    try {
      const response = await fetch(href, { credentials: 'same-origin' });
      if (!response.ok) return;

      const html = await response.text();
      const frameMatch = html.match(/<div\s+class="product-hero-frame"[\s\S]*?<img[^>]+src="([^"]+)"/i);
      const fallbackMatch = html.match(/<img[^>]+src="([^"]+)"/i);
      const src = frameMatch?.[1] || fallbackMatch?.[1];
      if (!src) return;

      if (/^https?:\/\//i.test(src)) {
        return;
      }

      heroByHref.set(href, new URL(src, new URL(href, window.location.href)).href);
    } catch (error) {
      // Keep fallback image when the page cannot be fetched.
    }
  }));

  cardsWithHref.forEach(({ card, href }) => {
    const resolved = heroByHref.get(href);
    if (!resolved) return;
    const image = card.querySelector('.product-media img');
    if (!image) return;
    image.src = resolved;
  });
}

function renderVariantCards() {
  if (!productGrid) return;

  const variants = getCatalogCards();
  productGrid.innerHTML = variants
    .map((item) => `
      <article class="product-card" data-product="${escapeHtml(item.targetSlug)}" data-features="${escapeHtml(item.features)}" data-search-index="${escapeHtml(item.searchIndex)}" data-page-href="${escapeHtml(item.pageHref)}">
        <a class="product-media product-media-link" href="${escapeHtml(item.href)}" aria-label="Open ${escapeHtml(item.title)} product page">
          <img src="${escapeHtml(item.image)}" alt="${escapeHtml(item.title)}">
        </a>
        <div class="product-copy">
          <h3>${escapeHtml(item.title)}</h3>
          <p class="product-sub">${escapeHtml(item.subtitle)}</p>
          <p class="variant-variables"><strong>Variables:</strong> ${escapeHtml(item.variableTokens.join(' + ') || 'Base')}</p>
          <ul class="product-desc" data-raw-description="${escapeHtml(item.description)}">${buildDescriptionListHtml(item.description, [item.title, item.family, ...item.tags.map((tag) => tag.label)])}</ul>
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

  hydrateCardImages();
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

    desc.innerHTML = buildDescriptionListHtml(raw, terms);
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
