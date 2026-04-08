const products = [
  {
    title: 'MX Platform Overview',
    subtitle: 'Full product family',
    short: 'Complete MX and K9 product family.',
    description: 'POSH designs and manufactures modular access and identity hardware that combines RFID, NFC, smart card, magstripe, barcode, and biometric options across the MX and K9 families. Use this overview to compare form factors and then drill into each product variant below.',
    image: 'assets/hero-overview.png',
    imageLight: 'assets/hero-overview-light.png'
  },
  {
    title: 'MX5-P3-SC-M2-FP',
    subtitle: 'Core multi-format platform',
    short: 'RFID, NFC, chip, magstripe, and fingerprint — 4 in 1.',
    description: 'MX5-P3-SC-M2-FP is a compact, lightweight Design for Reading 13.56 MHz High Frequency Radio Frequency Identification (RFID) & NFC cards, IC-Chip & Smart Cards, 3 tracks Magstripe data and a built-in Fingerprint Biometric-reader. The MX5-P3-SC-M2-FP is a 4 in 1 reader which offers diversity and ease of use thru its innovative design which can be easily installed vertically or horizontally. Enhance your login security with the 4 in 1, two or three factor Authentication device.',
    image: 'assets/core-top-front.png'
  },
  {
    title: 'MX5 RFID',
    subtitle: 'RFID & NFC multi-format reader',
    short: 'RFID, NFC, chip, and magstripe — 3 in 1.',
    description: 'MX5-P3-SC-M2 is a compact, lightweight Design for Reading 13.56 MHz High Frequency Radio Frequency Identification (RFID) & NFC cards, IC-Chip & Smart Cards, and 3 tracks Magstripe. The MX5-P3-SC-M2 is a 3 in 1 reader which offers diversity and ease of use thru its innovative design which can be easily installed vertically or horizontally. Enhance your login security with the 3 in 1, two or three factor Authentication device.',
    image: 'assets/front-1.png'
  },
  {
    title: 'MX5 Smart Chip',
    subtitle: 'Chip & magstripe reader',
    short: 'Smart-chip and magstripe — 2 in 1.',
    description: 'MX5-P3-SC is a compact, lightweight Design for Reading IC-Chip & Smart Cards and 3 tracks Magstripe data. The MX5-P3-SC is a 2 in 1 reader which offers diversity and ease of use thru its innovative design which can be easily installed vertically or horizontally.',
    image: 'assets/front-2.png'
  },
  {
    title: 'MX5 Classic',
    subtitle: 'Low profile reader',
    short: 'Slim low-profile RFID and chip reader.',
    description: 'MX5PC-SC-M2 is a slim, lightweight Design for Reading 13.56 MHz High Frequency Radio Frequency Identification (RFID) & NFC cards, IC-Chip & Smart Cards. The MX5PC-SC-M2 is a 2 in 1 reader which offers diversity and ease of use thru its innovative design which can be easily installed vertically or horizontally. Enhance your login security with the 2 in 1, two factor Authentication device.',
    image: 'assets/front-4.png'
  },
  {
    title: 'K9Jr-BT-2DW',
    subtitle: 'Bluetooth barcode peripheral',
    short: 'Bluetooth keyboard barcode reader for 1D and 2D.',
    description: 'K9Jr-Bluetooth Keyboard, 2DW is the Ideal Multi-Functional Barcode ID Reader to help you Read 1D and 2D barcodes from Drivers Licenses, Health ID Cards and Membership IDs. The K9Jr-Bluetooth offers diversity and ease of use thru its innovative design as a Bluetooth Keyboard. If you currently use a Magnetic card reader to read your Health Card then the K9Jr-Bluetooth will convert your Health card 2D barcode to a magnetic stripe data output via Bluetooth Keyboard. No need to modify your application. Two Barcode Auto trigger Sensors & a Manual trigger Button are built in as a standard feature of the K9Jr-Bluetooth. Optional RFID HF reader is available as an add-on feature.',
    image: 'assets/front-5.png'
  },
  {
    title: 'K9Jr-BT-2DW Detail',
    subtitle: 'Hardware profile',
    short: 'Hardware proportions and port detail.',
    description: 'K9Jr-Bluetooth Keyboard, 2DW is the Ideal Multi-Functional Barcode ID Reader to help you Read 1D and 2D barcodes from Drivers Licenses, Health ID Cards and Membership IDs. The K9Jr-Bluetooth offers diversity and ease of use thru its innovative design as a Bluetooth Keyboard. If you currently use a Magnetic card reader to read your Health Card then the K9Jr-Bluetooth will convert your Health card 2D barcode to a magnetic stripe data output via Bluetooth Keyboard. No need to modify your application. Two Barcode Auto trigger Sensors & a Manual trigger Button are built in as a standard feature of the K9Jr-Bluetooth. Optional RFID HF reader is available as an add-on feature.',
    image: 'assets/front-6.png'
  },
  {
    title: 'MX5-PT Table Top',
    subtitle: 'Wedge format reader',
    short: 'Dual-frequency RFID HF & LF tabletop reader.',
    description: 'MX5-PT is a slim, lightweight Table Top device for Reading 13.56 MHz High Frequency Radio Frequency Identification (RFID) & NFC cards and 125 KHz Low Frequency Radio Frequency Identification (RFID) cards. The MX5-PT offers diversity of having a 2 in 1 reader, enhancing your login security offerings with the versatility of RFID HF & LF all in one.',
    image: 'assets/right-side.png'
  },
  {
    title: 'MX5PC-SC-M2-FP',
    subtitle: 'Slim multi-format reader',
    short: 'Low-profile RFID, chip, and fingerprint — 3 in 1.',
    description: 'MX5PC-SC-M2-FP is a slim, lightweight Design for Reading 13.56 MHz High Frequency Radio Frequency Identification (RFID) & NFC cards, IC-Chip & Smart Cards, and a built-in Fingerprint Biometric-reader. The MX5PC-SC-M2-FP is a 3 in 1 reader which offers diversity and ease of use thru its innovative design which can be easily installed vertically or horizontally. Enhance your login security with the 3 in 1, two or three factor Authentication device',
    image: 'assets/right-side-1.png'
  },
  {
    title: 'MX5-P3-SC-M2',
    subtitle: 'RFID & smart-chip combo',
    short: 'RFID, NFC, chip, and magstripe — 3 in 1.',
    description: 'MX5-P3-SC-M2 is a compact, lightweight Design for Reading 13.56 MHz High Frequency Radio Frequency Identification (RFID) & NFC cards, IC-Chip & Smart Cards, and 3 tracks Magstripe. The MX5-P3-SC-M2 is a 3 in 1 reader which offers diversity and ease of use thru its innovative design which can be easily installed vertically or horizontally. Enhance your login security with the 3 in 1, two or three factor Authentication device.',
    image: 'assets/top-front-11.png'
  },
  {
    title: 'MX5-P3-SC-FP',
    subtitle: 'Chip, magstripe & fingerprint',
    short: 'Smart-chip, magstripe, and fingerprint biometric — 3 in 1.',
    description: 'MX5-P3-SC-FP is a compact, lightweight Design for Reading IC-Chip & Smart Cards, 3 tracks Magstripe data and a built-in Fingerprint Biometric-reader. The MX5-P3-SC-FP is a 3 in 1 reader which offers diversity and ease of use thru its innovative design which can be easily installed vertically or horizontally. Enhance your login security with the 3 in 1, two or three factor Authentication device.',
    image: 'assets/top-front-5.png'
  },
  {
    title: 'MX5 RFID Low Profile',
    subtitle: 'Compact RFID & chip reader',
    short: 'Slim low-profile RFID and NFC — 2 in 1.',
    description: 'MX5PC-SC-M2 is a slim, lightweight Design for Reading 13.56 MHz High Frequency Radio Frequency Identification (RFID) & NFC cards, IC-Chip & Smart Cards. The MX5PC-SC-M2 is a 2 in 1 reader which offers diversity and ease of use thru its innovative design which can be easily installed vertically or horizontally. Enhance your login security with the 2 in 1, two factor Authentication device.',
    image: 'assets/top-front-6.png'
  },
  {
    title: 'MX5-P3-SC',
    subtitle: 'Smart-chip & magstripe reader',
    short: 'Chip and magstripe — 2 in 1.',
    description: 'MX5-P3-SC is a compact, lightweight Design for Reading IC-Chip & Smart Cards and 3 tracks Magstripe data. The MX5-P3-SC is a 2 in 1 reader which offers diversity and ease of use thru its innovative design which can be easily installed vertically or horizontally.',
    image: 'assets/top-front-8.png'
  },
  {
    title: 'MX5-P3-SC Compact',
    subtitle: 'Streamlined smart-chip variant',
    short: 'Compact chip and magstripe — 2 in 1.',
    description: 'MX5-P3-SC is a compact, lightweight Design for Reading IC-Chip & Smart Cards and 3 tracks Magstripe data. The MX5-P3-SC is a 2 in 1 reader which offers diversity and ease of use thru its innovative design which can be easily installed vertically or horizontally.',
    image: 'assets/top-front-9.png'
  }
];

const mainSlideImage = document.getElementById('mainSlideImage');
const mainSlideImageLight = document.getElementById('mainSlideImageLight');
const slideTitle = document.getElementById('slideTitle');
const slideSubtitle = document.getElementById('slideSubtitle');
const slideIndex = document.getElementById('slideIndex');
const slideTotal = document.getElementById('slideTotal');
const thumbTrack = document.getElementById('thumbTrack');
const detailTitle = document.getElementById('detailTitle');
const detailSubtitle = document.getElementById('detailSubtitle');
const detailDescription = document.getElementById('detailDescription');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const gallerySearchInput = document.getElementById('gallerySearchInput');
const gallerySearchClear = document.getElementById('gallerySearchClear');
const gallerySearchMeta = document.getElementById('gallerySearchMeta');

let currentIndex = 0;
let isAnimating = false;

slideTotal.textContent = products.length;

function getImageSource(product) {
  const isLightTheme = document.documentElement.getAttribute('data-theme') === 'light';
  if (isLightTheme && product.imageLight) {
    return product.imageLight;
  }
  return product.image;
}

function escapeHtml(value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function uniqueStrings(values) {
  return Array.from(new Set(values.filter(Boolean).map((value) => value.trim()).filter(Boolean)));
}

function extractModelTokens(text) {
  const modelLike = text.match(/\b[A-Za-z]{1,6}\d[A-Za-z0-9]*(?:-[A-Za-z0-9]+)+\b/g) || [];
  return uniqueStrings(modelLike);
}

function extractMetricTerms(text) {
  const metricPatterns = [
    /\b\d+(?:\.\d+)?\s*MHz\b/gi,
    /\b\d+(?:\.\d+)?\s*KHz\b/gi,
    /\b\d\s*in\s*\d\b/gi,
    /\b\dD\b/gi,
    /\b\d\s*tracks?\b/gi,
    /\btwo\s+or\s+three\s+factor\b/gi,
    /\btwo\s+factor\b/gi,
    /\bthree\s+factor\b/gi
  ];

  const matches = metricPatterns.flatMap((pattern) => text.match(pattern) || []);
  return uniqueStrings(matches);
}

function getDeviceTerms(product) {
  return uniqueStrings([
    product.title,
    ...extractModelTokens(product.title),
    ...extractModelTokens(product.subtitle || ''),
    ...extractModelTokens(product.short || ''),
    ...extractModelTokens(product.description || '')
  ]);
}

function getSpecTerms(product) {
  const source = `${product.short || ''} ${product.description || ''}`;
  const specPatterns = [
    /\bRFID\b/gi,
    /\bNFC\b/gi,
    /\bSmart Cards?\b/gi,
    /\bIC-?Chip\b/gi,
    /\bMagstripe\b/gi,
    /\bFingerprint\b/gi,
    /\bBiometric(?:-reader)?\b/gi,
    /\bBluetooth Keyboard\b/gi,
    /\b1D\b/gi,
    /\b2D\b/gi,
    /\bHF\b/gi,
    /\bLF\b/gi,
    /\bBarcode\b/gi,
    /\bAuthentication\b/gi
  ];

  const matches = specPatterns.flatMap((pattern) => source.match(pattern) || []);
  return uniqueStrings(matches);
}

function getBoldTerms(product) {
  return uniqueStrings([
    ...getDeviceTerms(product),
    ...getSpecTerms(product),
    ...extractMetricTerms(`${product.short || ''} ${product.description || ''}`)
  ]);
}

function boldTermsInText(text, terms) {
  const escaped = escapeHtml(text);
  const sortedTerms = uniqueStrings(terms).sort((a, b) => b.length - a.length);

  return sortedTerms.reduce((result, term) => {
    const pattern = new RegExp(`\\b${escapeRegExp(term)}\\b`, 'gi');
    return result.replace(pattern, (match) => `<strong>${match}</strong>`);
  }, escaped);
}

function buildSearchIndex(product) {
  const boldTerms = getBoldTerms(product);
  const searchableText = [
    product.title,
    product.subtitle,
    product.short,
    product.description,
    ...boldTerms
  ].join(' ');

  return {
    boldTerms,
    blob: searchableText.toLowerCase()
  };
}

function renderDetailBullets(product) {
  const description = product.description || '';
  const chunks = description
    .split(/(?<=[.!?])\s+/)
    .map((chunk) => chunk.trim())
    .filter(Boolean);

  const bulletItems = chunks.length ? chunks : [description.trim()];
  const boldTerms = getBoldTerms(product);

  detailDescription.innerHTML = bulletItems
    .map((item) => `<li>${boldTermsInText(item, boldTerms)}</li>`)
    .join('');
}

const gallerySearchIndex = products.map((product) => buildSearchIndex(product));

function scoreMatch(entry, query, tokens) {
  let score = entry.blob.includes(query) ? 12 : 0;
  score += tokens.reduce((count, token) => count + (entry.blob.includes(token) ? 2 : 0), 0);
  return score;
}

function findBestMatchIndex(rawQuery, allowedIndexes = null) {
  const query = String(rawQuery || '').trim().toLowerCase();
  if (!query) {
    return allowedIndexes && allowedIndexes.length ? allowedIndexes[0] : 0;
  }

  const tokens = query.split(/\s+/).filter(Boolean);
  const allowed = allowedIndexes ? new Set(allowedIndexes) : null;
  let bestIndex = -1;
  let bestScore = -1;

  gallerySearchIndex.forEach((entry, index) => {
    if (allowed && !allowed.has(index)) return;

    const score = scoreMatch(entry, query, tokens);
    if (score > bestScore) {
      bestScore = score;
      bestIndex = index;
    }
  });

  if (bestScore > 0) return bestIndex;
  if (allowedIndexes && allowedIndexes.length) return allowedIndexes[0];
  return 0;
}

function applyGallerySearch(rawQuery, syncUrl = true) {
  const query = String(rawQuery || '').trim().toLowerCase();
  const tokens = query.split(/\s+/).filter(Boolean);
  const matchedIndexes = [];

  document.querySelectorAll('.thumb').forEach((thumb, index) => {
    const blob = gallerySearchIndex[index]?.blob || '';
    const hasQuery = blob.includes(query);
    const hasAllTokens = tokens.length ? tokens.every((token) => blob.includes(token)) : true;
    const matches = !query || hasQuery || hasAllTokens;

    thumb.hidden = !matches;
    if (matches) matchedIndexes.push(index);
  });

  if (gallerySearchMeta) {
    if (!query) {
      gallerySearchMeta.textContent = '';
    } else {
      const count = matchedIndexes.length;
      gallerySearchMeta.textContent = count === 0 ? 'No matches found.' : `${count} match${count === 1 ? '' : 'es'} found.`;
    }
  }

  if (gallerySearchClear) {
    gallerySearchClear.hidden = query.length === 0;
  }

  if (query && matchedIndexes.length) {
    const bestMatch = findBestMatchIndex(query, matchedIndexes);
    if (bestMatch >= 0 && bestMatch !== currentIndex) {
      updateSlide(bestMatch, bestMatch > currentIndex ? 'next' : 'prev');
    }
  }

  if (syncUrl) {
    const url = new URL(window.location.href);
    if (query) {
      url.searchParams.set('q', query);
    } else {
      url.searchParams.delete('q');
    }
    window.history.replaceState({}, '', url);
  }
}

function renderThumbs() {
  thumbTrack.innerHTML = '';

  products.forEach((product, index) => {
    const thumbSource = getImageSource(product);
    const boldTerms = gallerySearchIndex[index]?.boldTerms || [];
    const button = document.createElement('button');
    button.className = 'thumb';
    button.type = 'button';
    button.dataset.index = index;
    button.dataset.search = [product.title, product.subtitle, ...boldTerms].join(' ').toLowerCase();
    button.setAttribute('aria-label', `Open ${product.title}`);
    button.innerHTML = `
      <div class="thumb-image">
        <img src="${thumbSource}" alt="${product.title}" />
      </div>
      <p class="thumb-title">${product.title}</p>
      <p class="thumb-sub">${product.subtitle}</p>
    `;

    const thumbImage = button.querySelector('.thumb-image img');
    if (thumbImage) {
      thumbImage.dataset.fallback = product.image;
      thumbImage.addEventListener('error', () => {
        const fallback = thumbImage.dataset.fallback;
        if (!fallback) return;

        const fallbackUrl = new URL(fallback, window.location.href).href;
        if (thumbImage.src !== fallbackUrl) {
          thumbImage.src = fallback;
        }
      });
    }

    button.addEventListener('click', () => {
      const direction = index === currentIndex ? 'next' : (index > currentIndex ? 'next' : 'prev');
      updateSlide(index, direction);
    });
    thumbTrack.appendChild(button);
  });
}

function syncThumbsToTheme() {
  document.querySelectorAll('.thumb').forEach((thumb, index) => {
    const product = products[index];
    if (!product) return;

    const thumbImage = thumb.querySelector('.thumb-image img');
    if (!thumbImage) return;

    thumbImage.dataset.fallback = product.image;
    thumbImage.src = getImageSource(product);
  });
}

function animateMainImage(product, directionClass) {
  mainSlideImage.classList.remove('is-changing-left', 'is-changing-right');
  mainSlideImageLight.classList.remove('is-changing-left', 'is-changing-right');
  
  if (directionClass) {
    mainSlideImage.classList.add(directionClass);
    mainSlideImageLight.classList.add(directionClass);
  }

  setTimeout(() => {
    const resolvedLightImage = product.imageLight || product.image;

    mainSlideImage.src = product.image;
    mainSlideImage.alt = product.title;
    mainSlideImage.dataset.fallback = product.image;

    mainSlideImageLight.src = resolvedLightImage;
    mainSlideImageLight.alt = product.title;
    mainSlideImageLight.dataset.fallback = product.image;
    
    mainSlideImage.classList.remove('is-changing-left', 'is-changing-right');
    mainSlideImageLight.classList.remove('is-changing-left', 'is-changing-right');
  }, 160);
}

function syncCurrentSlideImageToTheme() {
  const product = products[currentIndex];
  if (!product) return;

  const resolvedLightImage = product.imageLight || product.image;

  mainSlideImage.src = product.image;
  mainSlideImage.alt = product.title;
  mainSlideImage.dataset.fallback = product.image;

  mainSlideImageLight.src = resolvedLightImage;
  mainSlideImageLight.alt = product.title;
  mainSlideImageLight.dataset.fallback = product.image;
}

function centerActiveThumb(activeThumb) {
  if (!activeThumb || !thumbTrack) return;

  const left = activeThumb.offsetLeft - (thumbTrack.clientWidth / 2) + (activeThumb.clientWidth / 2);
  const targetLeft = Math.max(0, left);

  if (typeof thumbTrack.scrollTo === 'function') {
    thumbTrack.scrollTo({
      left: targetLeft,
      behavior: 'smooth'
    });
    return;
  }

  thumbTrack.scrollLeft = targetLeft;
}

function updateSlide(index, direction = 'next') {
  if (isAnimating) return;
  isAnimating = true;

  currentIndex = (index + products.length) % products.length;
  const product = products[currentIndex];
  const imageDirectionClass = direction === 'prev' ? 'is-changing-right' : 'is-changing-left';
  const imageSource = getImageSource(product);

  slideTitle.textContent = product.title;
  slideSubtitle.textContent = product.short;
  slideIndex.textContent = currentIndex + 1;

  detailTitle.textContent = product.title;
  detailSubtitle.textContent = product.subtitle;
  renderDetailBullets(product);

  mainSlideImage.classList.toggle('is-first-slide', currentIndex === 0);
  mainSlideImageLight.classList.toggle('is-first-slide', currentIndex === 0);
  mainSlideImage.dataset.fallback = product.image;

  animateMainImage(product, imageDirectionClass);

  document.querySelectorAll('.thumb').forEach((thumb, idx) => {
    thumb.classList.toggle('active', idx === currentIndex);
  });

  centerActiveThumb(document.querySelector(`.thumb[data-index="${currentIndex}"]`));

  window.setTimeout(() => {
    isAnimating = false;
  }, 300);
}

prevBtn.addEventListener('click', () => updateSlide(currentIndex - 1, 'prev'));
nextBtn.addEventListener('click', () => updateSlide(currentIndex + 1, 'next'));

document.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowLeft') updateSlide(currentIndex - 1, 'prev');
  if (event.key === 'ArrowRight') updateSlide(currentIndex + 1, 'next');
});

mainSlideImage.addEventListener('error', () => {
  const fallback = mainSlideImage.dataset.fallback;
  if (!fallback) return;

  const fallbackUrl = new URL(fallback, window.location.href).href;
  if (mainSlideImage.src !== fallbackUrl) {
    mainSlideImage.src = fallback;
  }
});

mainSlideImageLight.addEventListener('error', () => {
  const fallback = mainSlideImageLight.dataset.fallback;
  if (!fallback) return;

  const fallbackUrl = new URL(fallback, window.location.href).href;
  if (mainSlideImageLight.src !== fallbackUrl) {
    mainSlideImageLight.src = fallback;
  }
});

const themeObserver = new MutationObserver((mutations) => {
  const changedTheme = mutations.some((mutation) => mutation.attributeName === 'data-theme');
  if (!changedTheme) return;

  syncThumbsToTheme();

  if (currentIndex === 0) {
    syncCurrentSlideImageToTheme();
  }
});

themeObserver.observe(document.documentElement, {
  attributes: true,
  attributeFilter: ['data-theme']
});

renderThumbs();
updateSlide(0, 'next');

if (gallerySearchInput) {
  const initialQuery = new URLSearchParams(window.location.search).get('q') || '';
  gallerySearchInput.value = initialQuery;
  applyGallerySearch(initialQuery, false);

  let searchDebounce;
  gallerySearchInput.addEventListener('input', () => {
    window.clearTimeout(searchDebounce);
    searchDebounce = window.setTimeout(() => {
      applyGallerySearch(gallerySearchInput.value);
    }, 90);
  });

  gallerySearchInput.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      gallerySearchInput.value = '';
      applyGallerySearch('');
    }
  });

  if (gallerySearchClear) {
    gallerySearchClear.addEventListener('click', () => {
      gallerySearchInput.value = '';
      gallerySearchInput.focus();
      applyGallerySearch('');
    });
  }
}
