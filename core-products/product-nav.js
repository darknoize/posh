(function initCoreProductPager() {
  if (window.__coreProductPagerInitialized) return;
  window.__coreProductPagerInitialized = true;

  const buildYourOwnHref = '../../build-your-own/index.html';

  const navPrev = document.querySelector('.product-nav-arrow.prev');
  const navNext = document.querySelector('.product-nav-arrow.next');
  if (!navPrev || !navNext) return;

  const pageHeader = document.querySelector('.page-header');
  let searchLink = null;
  if (pageHeader) {
    searchLink = pageHeader.querySelector('.product-search-link');
    if (!searchLink) {
      searchLink = document.createElement('a');
      searchLink.className = 'product-search-link';
      pageHeader.appendChild(searchLink);
    }
    searchLink.textContent = 'Full List of Products';
    searchLink.setAttribute('aria-label', 'Full List of Products');
  }
  let positionCounter = null;
  if (pageHeader) {
    positionCounter = pageHeader.querySelector('.product-position-counter');
    if (!positionCounter) {
      positionCounter = document.createElement('span');
      positionCounter.className = 'product-position-counter';
      pageHeader.appendChild(positionCounter);
    }
  }

  const fallbackSequence = [
    {
      slug: 'mx5p3-sc-m2-fp',
      href: 'mx5p3-sc-m2-fp.html',
      title: 'MX5-P3-SC-M2-FP',
      subtitle: 'Core multi-format platform',
      image: '../../assets/images/products/orig-mx5p3-sc-m2-fp-front.png'
    },
    {
      slug: 'pos108',
      href: 'k9jr-bt-2dw-front.html',
      title: 'POS-108/708',
      subtitle: 'Cash drawer alarm',
      image: '../../assets/images/products/orig-pos108-left-side.png'
    },
    {
      slug: 'mx5-k9',
      href: 'k9jr-bt-2dw-top.html',
      title: 'MX5-K9',
      subtitle: '2D-MAG reader+',
      image: '../../assets/images/products/orig-k9-mag-2dw-front.png'
    },
    {
      slug: 'mx5pt',
      href: 'k9jr-bt-2dw-rear.html',
      title: 'MX5-PT',
      subtitle: 'Table Top Reader',
      image: '../../assets/images/products/orig-mx5pt-front.png'
    },
    {
      slug: 'mx5c-sc',
      href: 'mx5pt-wedge.html',
      title: 'MX5C-SC',
      subtitle: 'IC-Chip Reader',
      image: '../../assets/images/products/orig-mx5c-cbp-sc-front.png'
    },
    {
      slug: 'mx5p3-sc-m2',
      href: 'mx5pt-rfid-chip.html',
      title: 'MX5-P3-SC-M2',
      subtitle: 'Mag-IC chip-RFID reader',
      image: '../../assets/images/products/orig-mx5p3-sc-m2-front.png'
    },
    {
      slug: 'mx5c-m2',
      href: 'mx5pt-rfid-chip.html',
      title: 'MX5C-M2',
      subtitle: 'RFID reader',
      image: '../../assets/images/products/orig-mx5c-cbp-m2-front.png'
    },
    {
      slug: 'mx5c-m2-fp',
      href: 'mx5pt-rfid-low-profile.html',
      title: 'MX5C-M2-FP',
      subtitle: 'RFID-Bio Reader',
      image: '../../assets/images/products/orig-mx5c-cbp-m2-fp-front.png'
    },
    {
      slug: 'mx5p3',
      href: 'mx5pt-rfid-display.html',
      title: 'MX5-P3',
      subtitle: 'Magnetic strip reader',
      image: '../../assets/images/products/orig-mx5p3-sc-front.png'
    },
    {
      slug: 'mx5-k9-jr',
      href: 'mx5pt-classic.html',
      title: 'MX5-K9Jr',
      subtitle: '2D reader+',
      image: '../../assets/images/products/K9Jr-BT-2DW.png'
    }
  ];
  const librarySequence = Array.isArray(window.POSH_PRODUCT_LIBRARY?.sequence)
    ? window.POSH_PRODUCT_LIBRARY.sequence
    : [];
  const fallbackBySlug = new Map(fallbackSequence.map((item) => [item.slug, item]));
  const sequence = librarySequence.length
    ? librarySequence
        .map((item) => ({
          ...(fallbackBySlug.get(item.slug) || {}),
          ...item
        }))
        .filter((item) => item.slug && item.href)
    : fallbackSequence;

  const descriptions = {
    'mx5p3-sc-m2-fp': 'MX5-P3-SC-M2-FP is a compact, lightweight Design for Reading 13.56 MHz High Frequency Radio Frequency Identification (RFID) & NFC cards, IC-Chip & Smart Cards, 3 tracks Magstripe data and a built-in Fingerprint Biometric-reader. The MX5-P3-SC-M2-FP is a 4 in 1 reader which offers diversity and ease of use thru its innovative design which can be easily installed vertically or horizontally. Enhance your login security with the 4 in 1, two or three factor Authentication device.',
    'pos108': 'POS-108/708 is both a Dual Cash Drawer Alarm or a Printer Receipt Alarm all in one. Easy to install, No tools or software changes needed. Plug and Play. The POS-108/708 can connect to virtually any POS Printers with a RJ12 Cash Drawer Port. The built in Dual Cash Drawer splitter offers an easy option to connecting two cash drawers to one POS printer. The drawer open alarm feature is easily configured offering a variety of user settings.',
    'mx5-k9': 'K9 MAG-2DW is the Ideal Multi-Functional Barcode ID and Magstripe Reader all in one to help you Read 1 D and 2 D barcodes, Magnetic Stripe data from Drivers Licenses, Health ID Cards and Membership IDs. The K9 offers diversity and ease of use thru its innovative design. Two Barcode Auto trigger Sensors & a Manual trigger Button are built in as a standard feature of all the K9 versions. Optional RFID HF, RFID DF, IC Smart Card and Fingerprint readers are available as an add - on.',
    'mx5pt': 'MX5-PT is a slim, lightweight Table Top device for Reading 13.56 MHz High Frequency Radio Frequency Identification (RFID) & NFC cards and 125 KHz Low Frequency Radio Frequency Identification (RFID) cards. The MX5-PT offers diversity of having a 2 in 1 reader, enhancing your login security offerings with the versatility of RFID HF & LF all in one.',
    'mx5c-sc': 'MX5C-CBP-SC is a slim, lightweight Design for Reading IC-Chip & Smart Cards. The MX5C-CBP-SC offers diversity and ease of use thru its innovative design and can be easily installed vertically or horizontally.',
    'mx5p3-sc-m2': 'MX5-P3-SC-M2 is a compact, lightweight Design for Reading 13.56 MHz High Frequency Radio Frequency Identification (RFID) & NFC cards, IC-Chip & Smart Cards, and 3 tracks Magstripe. The MX5-P3-SC-M2 is a 3 in 1 reader which offers diversity and ease of use thru its innovative design which can be easily installed vertically or horizontally. Enhance your login security with the 3 in 1, two or three factor Authentication device.',
    'mx5c-m2': 'MX5C-CBP-M2 is a slim, lightweight Design for Reading 13.56 MHz High Frequency Radio Frequency Identification (RFID) & NFC cards. The MX5C-CBP-M2 offers diversity and ease of use thru its innovative design and can be easily installed vertically or horizontally.',
    'mx5c-m2-fp': 'MX5C-CBP-M2-FP is a slim, lightweight Design for Reading 13.56 MHz High Frequency Radio Frequency Identification (RFID) & NFC cards with a built-in Fingerprint Biometric-reader. The MX5C-CBP-M2-FP offers diversity and ease of use thru its innovative design and can be easily installed vertically or horizontally. Enhance your login security with the 2 in 1, two factor Authentication device.',
    'mx5p3': 'MX5-P3-SC is a compact, lightweight Design for Reading IC-Chip & Smart Cards and 3 tracks Magstripe data. The MX5-P3-SC is a 2 in 1 reader which offers diversity and ease of use thru its innovative design which can be easily installed vertically or horizontally.',
    'mx5-k9-jr': 'K9Jr-Bluetooth Keyboard, 2DW is the Ideal Multi-Functional Barcode ID Reader to help you Read 1D and 2D barcodes from Drivers Licenses, Health ID Cards and Membership IDs. The K9Jr-Bluetooth offers diversity and ease of use thru its innovative design as a Bluetooth Keyboard. If you currently use a Magnetic card reader to read your Health Card then the K9Jr-Bluetooth will convert your Health card 2D barcode to a magnetic stripe data output via Bluetooth Keyboard. No need to modify your application. Two Barcode Auto trigger Sensors & a Manual trigger Button are built in as a standard feature of the K9Jr-Bluetooth. Optional RFID HF reader is available as an add-on feature.'
  };

  const capabilities = {
    'mx5p3-sc-m2-fp': [
      { icon: 'HF-RFID.png', label: 'High Frequency RFID' },
      { icon: 'IC-SC.png', label: 'Smart Chip Reader' },
      { icon: 'mag_card.png', label: 'Magnetic Card Reader' },
      { icon: 'FingerPrint.png', label: 'Fingerprint Reader' }
    ],
    'pos108': [
      { icon: 'POS.png', label: 'Point of Sale' }
    ],
    'mx5-k9': [
      { icon: 'BlueTooth.png', label: 'Bluetooth' },
      { icon: '2DW.png', label: 'Barcode Reader' }
    ],
    'mx5pt': [
      { icon: 'HF-RFID.png', label: 'High Frequency RFID' },
      { icon: 'LF-RFID.png', label: 'Low Frequency RFID' }
    ],
    'mx5c-sc': [
      { icon: 'IC-SC.png', label: 'Smart Chip Reader' }
    ],
    'mx5p3-sc-m2': [
      { icon: 'HF-RFID.png', label: 'High Frequency RFID' },
      { icon: 'IC-SC.png', label: 'Smart Chip Reader' },
      { icon: 'mag_card.png', label: 'Magnetic Card Reader' }
    ],
    'mx5c-m2': [
      { icon: 'HF-RFID.png', label: 'High Frequency RFID' }
    ],
    'mx5c-m2-fp': [
      { icon: 'HF-RFID.png', label: 'High Frequency RFID' },
      { icon: 'FingerPrint.png', label: 'Fingerprint Reader' }
    ],
    'mx5p3': [
      { icon: 'IC-SC.png', label: 'Smart Chip Reader' },
      { icon: 'mag_card.png', label: 'Magnetic Card Reader' }
    ],
    'mx5-k9-jr': [
      { icon: 'BlueTooth.png', label: 'Bluetooth' },
      { icon: '2DW.png', label: 'Barcode Reader' }
    ]
  };

  const heroImage = document.querySelector('.product-hero-frame img');
  const productCopyPanel = document.querySelector('.product-copy');
  if (productCopyPanel && !productCopyPanel.querySelector('.product-core-badge-inline')) {
    const inlineBadge = document.createElement('span');
    inlineBadge.className = 'product-core-badge-inline';
    inlineBadge.textContent = 'Core Product';
    productCopyPanel.appendChild(inlineBadge);
  }
  const detailTitle = document.querySelector('.product-copy h2');
  const detailSubtitle = document.querySelector('.product-copy .detail-subtitle');
  let detailDescription = document.querySelector('.product-copy .detail-description');
  const featureIcons = document.querySelector('.product-copy .product-feature-icons');

  const escapeHtml = (value) => String(value || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

  const escapeRegExp = (value) => String(value || '').replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

  const uniqueStrings = (values) => {
    const seen = new Set();
    return values
      .map((value) => String(value || '').trim())
      .filter((value) => {
        if (!value) return false;
        const key = value.toLowerCase();
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      });
  };

  const extractModelTokens = (text) => {
    const matches = String(text || '').match(/\b[A-Za-z]{1,6}\d[A-Za-z0-9]*(?:-[A-Za-z0-9]+)+\b/g) || [];
    return uniqueStrings(matches);
  };

  const expandTermVariants = (text) => {
    const value = String(text || '').trim();
    if (!value) return [];

    return uniqueStrings([
      value,
      value.replace(/-/g, ' '),
      value.replace(/[-,]/g, ' ').replace(/\s+/g, ' ').trim(),
      value.replace(/[^A-Za-z0-9]+/g, ' ').replace(/\s+/g, ' ').trim()
    ]);
  };

  const searchableTerms = [
    'RFID', 'NFC', 'IC-Chip', 'Smart Card', 'Smart Cards', 'Magstripe', 'Magnetic Stripe',
    'Fingerprint', 'Biometric', 'Bluetooth Keyboard', 'Bluetooth', 'Barcode', 'Authentication',
    '1D', '2D', 'HF', 'LF', 'Drivers Licenses', 'Health ID Cards', 'Membership IDs',
    'Manual trigger Button', 'Auto trigger Sensors'
  ];

  const getBoldTerms = (item, descriptionText) => uniqueStrings([
    item.title,
    item.subtitle,
    ...expandTermVariants(item.title),
    ...expandTermVariants(item.subtitle),
    ...extractModelTokens(item.title),
    ...extractModelTokens(item.subtitle),
    ...extractModelTokens(descriptionText),
    ...searchableTerms
  ]).sort((a, b) => b.length - a.length);

  const boldTermsInText = (text, terms) => {
    let result = escapeHtml(text);
    terms.forEach((term) => {
      const pattern = new RegExp(`\\b${escapeRegExp(term)}\\b`, 'gi');
      result = result.replace(pattern, (match) => `<strong>${match}</strong>`);
    });
    return result;
  };

  const bulletify = (text) => {
    const chunks = String(text || '')
      .split(/(?<=[.!?])\s+/)
      .map((chunk) => chunk.trim())
      .filter(Boolean);
    return chunks.length ? chunks : [String(text || '').trim()];
  };

  const ensureDescriptionList = () => {
    if (!detailDescription) return null;
    if (detailDescription.tagName === 'UL') return detailDescription;

    const list = document.createElement('ul');
    list.className = detailDescription.className;
    if (detailDescription.id) list.id = detailDescription.id;

    const initialText = detailDescription.textContent || '';
    detailDescription.replaceWith(list);
    detailDescription = list;

    if (initialText.trim()) {
      list.innerHTML = bulletify(initialText)
        .map((item) => `<li>${escapeHtml(item)}</li>`)
        .join('');
    }

    return list;
  };

  ensureDescriptionList();

  const ensureMetaGridPlacement = () => {
    if (!productCopyPanel) return;

    const metaGrid = productCopyPanel.querySelector('.meta-grid');
    if (!metaGrid) return;

    const actions = productCopyPanel.querySelector('.detail-actions');
    if (actions) {
      productCopyPanel.insertBefore(metaGrid, actions);
      return;
    }

    const description = productCopyPanel.querySelector('.detail-description');
    if (description) {
      description.insertAdjacentElement('afterend', metaGrid);
      return;
    }

  };

  ensureMetaGridPlacement();

  const renderCapabilities = (slug) => {
    if (!featureIcons) return;

    const items = capabilities[slug] || [];
    featureIcons.innerHTML = items
      .map((item) => `
        <a class="product-feature-icon" href="${buildYourOwnHref}" title="${escapeHtml(item.label)}" aria-label="Build Your Own (${escapeHtml(item.label)})">
          <img src="../../assets/images/icons/${escapeHtml(item.icon)}" alt="${escapeHtml(item.label)}" />
        </a>`)
      .join('');
  };

  const ensureProductCopyScrollTrack = () => {
    if (!productCopyPanel) return null;

    let track = productCopyPanel.querySelector('.product-copy-scroll-track');
    if (!track) {
      track = document.createElement('span');
      track.className = 'product-copy-scroll-track';
      const thumb = document.createElement('span');
      thumb.className = 'product-copy-scroll-thumb';
      track.appendChild(thumb);
      productCopyPanel.appendChild(track);
    }

    return track;
  };

  const updateProductCopyScrollIndicator = () => {
    if (!productCopyPanel) return;

    const track = ensureProductCopyScrollTrack();
    if (!track) return;

    const thumb = track.firstElementChild;
    const hasOverflow = productCopyPanel.scrollHeight > productCopyPanel.clientHeight + 1;

    productCopyPanel.classList.toggle('has-overflow', hasOverflow);

    if (!hasOverflow || productCopyPanel.clientHeight <= 0) {
      thumb.style.height = '0px';
      thumb.style.transform = 'translateY(0)';
      return;
    }

    const trackHeight = track.clientHeight;
    const thumbHeight = Math.max(24, (productCopyPanel.clientHeight / productCopyPanel.scrollHeight) * trackHeight);
    const maxScrollTop = productCopyPanel.scrollHeight - productCopyPanel.clientHeight;
    const scrollRatio = maxScrollTop > 0 ? productCopyPanel.scrollTop / maxScrollTop : 0;
    const maxThumbTop = trackHeight - thumbHeight;
    const thumbTop = scrollRatio * maxThumbTop;

    thumb.style.height = `${thumbHeight}px`;
    thumb.style.transform = `translateY(${thumbTop}px)`;
  };

  const getIndexFromUrl = () => {
    const params = new URLSearchParams(window.location.search);
    const requestedSlug = params.get('product');
    const currentFile = window.location.pathname.split('/').pop() || '';

    if (requestedSlug) {
      const slugMatch = sequence.findIndex((item) => item.slug === requestedSlug);
      if (slugMatch >= 0) return slugMatch;
    }

    const fileMatch = sequence.findIndex((item) => item.href === currentFile);
    return fileMatch >= 0 ? fileMatch : 0;
  };

  let activeIndex = getIndexFromUrl();

  const setNavLinks = () => {
    const prevItem = sequence[(activeIndex - 1 + sequence.length) % sequence.length];
    const nextItem = sequence[(activeIndex + 1) % sequence.length];

    navPrev.href = prevItem.href;
    navNext.href = nextItem.href;

    navPrev.setAttribute('aria-label', `Previous product: ${prevItem.title}`);
    navNext.setAttribute('aria-label', `Next product: ${nextItem.title}`);
    navPrev.title = `Previous: ${prevItem.title}`;
    navNext.title = `Next: ${nextItem.title}`;
  };

  const renderProduct = (index, pushUrl) => {
    activeIndex = ((index % sequence.length) + sequence.length) % sequence.length;
    const currentItem = sequence[activeIndex];
    if (positionCounter) {
      positionCounter.textContent = `${activeIndex + 1}/${sequence.length}`;
    }

    if (heroImage) {
      heroImage.src = currentItem.image;
      heroImage.alt = currentItem.title;
    }
    if (detailTitle) detailTitle.textContent = currentItem.title;
    if (detailSubtitle) detailSubtitle.textContent = currentItem.subtitle;
    renderCapabilities(currentItem.slug);
    if (productCopyPanel) productCopyPanel.scrollTop = 0;
    if (detailDescription) {
      const descriptionText = descriptions[currentItem.slug] || detailDescription.textContent || '';
      const terms = getBoldTerms(currentItem, descriptionText);
      detailDescription.innerHTML = bulletify(descriptionText)
        .map((item) => `<li>${boldTermsInText(item, terms)}</li>`)
        .join('');
    }
    document.title = `${currentItem.title} | POSHMFG`;
    if (searchLink) {
      searchLink.href = `../../build-your-own/index.html?focus=${encodeURIComponent(currentItem.slug)}`;
    }
    setNavLinks();
    requestAnimationFrame(updateProductCopyScrollIndicator);

    if (pushUrl) {
      const nextUrl = currentItem.href;
      window.history.pushState({ product: currentItem.slug }, '', nextUrl);
    }
  };

  if (productCopyPanel) {
    productCopyPanel.addEventListener('scroll', updateProductCopyScrollIndicator, { passive: true });
    window.addEventListener('resize', updateProductCopyScrollIndicator);
  }

  renderProduct(activeIndex, false);
})();
