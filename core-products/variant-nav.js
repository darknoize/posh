(function initVariantProductPager() {
  if (window.__variantProductPagerInitialized) return;
  window.__variantProductPagerInitialized = true;

  const fallbackSequence = [
    { slug: 'mx5p3-sc-m2-fp', href: 'mx5p3-sc-m2-fp.html', title: 'MX5-P3-SC-M2-FP', core: true },
    { slug: 'pos108', href: 'k9jr-bt-2dw-front.html', title: 'POS-108/708', core: true },
    { slug: 'mx5-k9', href: 'k9jr-bt-2dw-top.html', title: 'MX5-K9', core: true },
    { slug: 'mx5pt', href: 'k9jr-bt-2dw-rear.html', title: 'MX5-PT', core: true },
    { slug: 'mx5c-sc', href: 'mx5pt-wedge.html', title: 'MX5C-SC', core: true },
    { slug: 'mx5p3-sc-m2', href: 'mx5pt-rfid-chip.html', title: 'MX5-P3-SC-M2', core: true },
    { slug: 'mx5c-m2-fp', href: 'mx5pt-rfid-low-profile.html', title: 'MX5C-M2-FP', core: true },
    { slug: 'mx5p3', href: 'mx5pt-rfid-display.html', title: 'MX5-P3', core: true },
    { slug: 'mx5-k9-jr', href: 'mx5pt-classic.html', title: 'MX5-K9Jr', core: true },

    { slug: 'k9-mag-2dw', href: 'k9-mag-2dw.html', title: 'K9-MAG-2DW', core: false },
    { slug: 'k9-mag-2dw-fp', href: 'k9-mag-2dw-fp.html', title: 'K9-MAG-2DW-FP', core: false },
    { slug: 'k9jr-2dw', href: 'k9jr-2dw.html', title: 'K9Jr-2DW', core: false },
    { slug: 'k9jr-bt-2dw', href: 'k9jr-bt-2dw.html', title: 'K9Jr-BT-2DW', core: false },
    { slug: 'pos-108', href: 'pos-108.html', title: 'POS-108', core: false },
    { slug: 'pos-708', href: 'pos-708.html', title: 'POS-708', core: false },
    { slug: 'mx5-pt', href: 'mx5-pt.html', title: 'MX5-PT', core: false },
    { slug: 'mx5c-cbp-em', href: 'mx5c-cbp-em.html', title: 'MX5C-CBP-EM', core: false },
    { slug: 'mx5c-cbp-em-fp', href: 'mx5c-cbp-em-fp.html', title: 'MX5C-CBP-EM-FP', core: false },
    { slug: 'mx5c-cbp-m2', href: 'mx5c-cbp-m2.html', title: 'MX5C-CBP-M2', core: false },
    { slug: 'mx5c-cbp-m2-fp', href: 'mx5c-cbp-m2-fp.html', title: 'MX5C-CBP-M2-FP', core: false },
    { slug: 'mx5c-cbp-sc', href: 'mx5c-cbp-sc.html', title: 'MX5C-CBP-SC', core: false },
    { slug: 'mx5c-cbp-sc-fp', href: 'mx5c-cbp-sc-fp.html', title: 'MX5C-CBP-SC-FP', core: false },
    { slug: 'mx5-p3-sc', href: 'mx5-p3-sc.html', title: 'MX5-P3-SC', core: false },
    { slug: 'mx5-p3-sc-fp', href: 'mx5-p3-sc-fp.html', title: 'MX5-P3-SC-FP', core: false },
    { slug: 'mx5-p3-sc-m2', href: 'mx5-p3-sc-m2.html', title: 'MX5-P3-SC-M2', core: false },
    { slug: 'mx5-p3-sc-m2-fp', href: 'mx5-p3-sc-m2-fp.html', title: 'MX5-P3-SC-M2-FP', core: false },
    { slug: 'mx5-pc-sc-m2', href: 'mx5-pc-sc-m2.html', title: 'MX5-PC-SC-M2', core: false },
    { slug: 'mx5-pc-sc-m2-fp', href: 'mx5-pc-sc-m2-fp.html', title: 'MX5-PC-SC-M2-FP', core: false },
    { slug: 'mx53-cbp-cls', href: 'mx53-cbp-cls.html', title: 'MX53-CBP-CLS', core: false },
    { slug: 'mx53-cbp-lit', href: 'mx53-cbp-lit.html', title: 'MX53-CBP-LIT', core: false },
    { slug: 'mx53-cbp-em', href: 'mx53-cbp-em.html', title: 'MX53-CBP-EM', core: false },
    { slug: 'mx53-cbp-em-fp', href: 'mx53-cbp-em-fp.html', title: 'MX53-CBP-EM-FP', core: false },
    { slug: 'mx53-cbp-m2', href: 'mx53-cbp-m2.html', title: 'MX53-CBP-M2', core: false },
    { slug: 'mx53-cbp-m2-fp', href: 'mx53-cbp-m2-fp.html', title: 'MX53-CBP-M2-FP', core: false }
  ];
  const sequence = Array.isArray(window.POSH_PRODUCT_LIBRARY?.sequence) && window.POSH_PRODUCT_LIBRARY.sequence.length
    ? window.POSH_PRODUCT_LIBRARY.sequence
    : fallbackSequence;

  const params = new URLSearchParams(window.location.search);
  const requestedSlug = params.get('product');
  const currentFile = window.location.pathname.split('/').pop() || '';

  let activeIndex = sequence.findIndex((item) => item.slug === requestedSlug);
  if (activeIndex < 0) {
    activeIndex = sequence.findIndex((item) => item.href === currentFile);
  }
  if (activeIndex < 0) return;

  const pageHeader = document.querySelector('.page-header');
  const productCopyPanel = document.querySelector('.product-copy');
  const currentItem = sequence[activeIndex];
  const searchLink = pageHeader ? pageHeader.querySelector('.product-search-link') : null;
  if (searchLink) {
    searchLink.textContent = 'Full List of Products';
    searchLink.setAttribute('aria-label', 'Full List of Products');
    searchLink.href = `../../build-your-own/index.html?focus=${encodeURIComponent(currentItem.slug)}`;
  }
  if (pageHeader) {
    let positionCounter = pageHeader.querySelector('.product-position-counter');
    if (!positionCounter) {
      positionCounter = document.createElement('span');
      positionCounter.className = 'product-position-counter';
      pageHeader.appendChild(positionCounter);
    }
    positionCounter.textContent = `${activeIndex + 1}/${sequence.length}`;
  }
  if (pageHeader && currentItem.core && !pageHeader.querySelector('.product-core-badge')) {
    const badge = document.createElement('span');
    badge.className = 'product-core-badge';
    badge.textContent = 'Core Product';
    pageHeader.appendChild(badge);
  }
  if (productCopyPanel) {
    const existingInlineBadge = productCopyPanel.querySelector('.product-core-badge-inline');
    if (currentItem.core && !existingInlineBadge) {
      const inlineBadge = document.createElement('span');
      inlineBadge.className = 'product-core-badge-inline';
      inlineBadge.textContent = 'Core Product';
      productCopyPanel.appendChild(inlineBadge);
    }
    if (!currentItem.core && existingInlineBadge) {
      existingInlineBadge.remove();
    }
  }

  const heroFrame = document.querySelector('.product-hero-frame');
  if (!heroFrame) return;

  let navPrev = heroFrame.querySelector('.product-nav-arrow.prev');
  let navNext = heroFrame.querySelector('.product-nav-arrow.next');

  if (!navPrev) {
    navPrev = document.createElement('a');
    navPrev.className = 'product-nav-arrow prev';
    navPrev.setAttribute('aria-label', 'Previous product');
    navPrev.innerHTML = '&#10094;';
    heroFrame.insertBefore(navPrev, heroFrame.firstChild);
  }

  if (!navNext) {
    navNext = document.createElement('a');
    navNext.className = 'product-nav-arrow next';
    navNext.setAttribute('aria-label', 'Next product');
    navNext.innerHTML = '&#10095;';
    heroFrame.appendChild(navNext);
  }

  const prevItem = sequence[(activeIndex - 1 + sequence.length) % sequence.length];
  const nextItem = sequence[(activeIndex + 1) % sequence.length];

  navPrev.href = `${prevItem.href}?product=${encodeURIComponent(prevItem.slug)}`;
  navNext.href = `${nextItem.href}?product=${encodeURIComponent(nextItem.slug)}`;

  navPrev.setAttribute('aria-label', `Previous product: ${prevItem.title}`);
  navNext.setAttribute('aria-label', `Next product: ${nextItem.title}`);
  navPrev.title = `Previous: ${prevItem.title}`;
  navNext.title = `Next: ${nextItem.title}`;
})();
