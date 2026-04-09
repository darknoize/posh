const toggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.site-nav');
if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const expanded = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!expanded));
    nav.classList.toggle('open');
  });
}

const themeButtons = document.querySelectorAll('[data-theme-value]');
const root = document.documentElement;
const updateThemeIconState = (button, isActive) => {
  const icon = button.querySelector('.theme-icon');
  if (!icon) return;

  const iconSource = icon.getAttribute('src');
  if (!iconSource) return;

  const normalizedSource = iconSource.replace('-active.svg', '.svg');
  const nextSource = isActive
    ? normalizedSource
    : normalizedSource.replace('.svg', '-active.svg');

  if (icon.getAttribute('src') !== nextSource) {
    icon.setAttribute('src', nextSource);
  }
};

const setTheme = (theme) => {
  root.setAttribute('data-theme', theme);
  try { localStorage.setItem('posch-theme', theme); } catch (e) {}
  themeButtons.forEach((button) => {
    const isActive = button.getAttribute('data-theme-value') === theme;
    button.classList.toggle('is-active', isActive);
    button.setAttribute('aria-pressed', String(isActive));
    updateThemeIconState(button, isActive);
  });
};
if (themeButtons.length) {
  let initialTheme = root.getAttribute('data-theme') || 'dark';
  try {
    const savedTheme = localStorage.getItem('posch-theme');
    if (savedTheme) {
      initialTheme = savedTheme;
    }
  } catch (e) {}
  setTheme(initialTheme);
  themeButtons.forEach((button) => {
    button.addEventListener('click', () => setTheme(button.getAttribute('data-theme-value')));
  });
}

document.querySelectorAll('form').forEach(form => {
  form.addEventListener('submit', (event) => {
    if (form.getAttribute('data-prototype-alert') === 'false') {
      return;
    }
    event.preventDefault();
    alert('Prototype form only. Connect this to your real contact workflow.');
  });
});

function initProductSearch() {
  const input = document.getElementById('productSearchInput');
  const clearButton = document.getElementById('productSearchClear');
  const mainGrid = document.querySelector('.product-cards-section .product-grid');
  const resultsSection = document.getElementById('productSearchResultsSection');
  const resultsGrid = document.getElementById('productSearchResults');
  const emptyState = document.getElementById('productSearchEmpty');
  const mainCardsSection = document.querySelector('.product-cards-section');
  const dropdown = document.getElementById('productSearchDropdown');
  const resultCountDisplay = document.getElementById('searchResultsCount');
  const suggestionsList = document.getElementById('productSearchSuggestions');
  
  if (!input || !mainGrid || !resultsSection || !resultsGrid) {
    return;
  }

  const cards = Array.from(mainGrid.querySelectorAll('.product-card'));
  
  if (!cards.length) {
    return;
  }

  // Collect core product data from the interactive network hotspots
  const hotspotItems = Array.from(document.querySelectorAll('.core-network-hotspot[data-core-product]')).map((hotspot) => ({
    slug: hotspot.dataset.coreProduct,
    title: hotspot.querySelector('.core-network-hotspot-title')?.textContent?.trim() || '',
    sub: hotspot.querySelector('.core-network-hotspot-sub')?.textContent?.trim() || '',
    href: hotspot.getAttribute('href') || '',
    img: hotspot.querySelector('img')?.getAttribute('src') || ''
  }));

  // Extract product names for suggestions (cards + core products)
  const productNames = [
    ...cards.map((card) => {
      const title = card.querySelector('h2')?.textContent || '';
      const code = card.querySelector('.product-code')?.textContent || '';
      return { title: title.trim(), code: code.trim(), card, type: 'card' };
    }).filter(p => p.title || p.code),
    ...hotspotItems.map(h => ({ title: h.title, code: h.title, sub: h.sub, href: h.href, type: 'core' }))
  ];

  const cardSearchIndex = cards.map((card) => {
    const code = card.querySelector('.product-code')?.textContent || '';
    const title = card.querySelector('h2')?.textContent || '';
    const description = card.querySelector('p')?.textContent || '';
    const specs = Array.from(card.querySelectorAll('.spec-list span')).map((node) => node.textContent || '').join(' ');
    const linkText = card.querySelector('.text-link')?.textContent || '';
    const idText = card.id || '';
    return `${idText} ${code} ${title} ${description} ${specs} ${linkText}`.toLowerCase();
  });

  const hotspotSearchIndex = hotspotItems.map(h =>
    `${h.slug} ${h.title} ${h.sub}`.toLowerCase()
  );

  const buildHotspotCard = (item) => {
    const a = document.createElement('a');
    a.className = 'product-card glass product-card-core';
    a.href = item.href;
    const visual = document.createElement('div');
    visual.className = 'product-visual';
    if (item.img) {
      const img = document.createElement('img');
      img.src = item.img;
      img.alt = item.title;
      img.style.cssText = 'width:100%;height:100%;object-fit:contain;padding:12px;';
      visual.appendChild(img);
    }
    const body = document.createElement('div');
    body.className = 'product-body';
    body.innerHTML = `<span class="product-code">${item.title}</span><h2>${item.sub}</h2><span class="text-link">View product →</span>`;
    a.appendChild(visual);
    a.appendChild(body);
    return a;
  };

  const applyFilter = (rawQuery, syncUrl = true) => {
    const query = rawQuery.trim().toLowerCase();
    const matchedCards = [];
    const matchedHotspots = [];
    let visibleCount = 0;

    if (query) {
      cards.forEach((card, index) => {
        if (cardSearchIndex[index].includes(query)) {
          matchedCards.push(card);
          visibleCount++;
        }
      });
      hotspotItems.forEach((item, index) => {
        if (hotspotSearchIndex[index].includes(query)) {
          matchedHotspots.push(item);
          visibleCount++;
        }
      });
    }

    if (query && visibleCount > 0) {
      resultsGrid.innerHTML = '';
      matchedHotspots.forEach((item) => {
        resultsGrid.appendChild(buildHotspotCard(item));
      });
      matchedCards.forEach((card) => {
        const clone = card.cloneNode(true);
        resultsGrid.appendChild(clone);
      });
      resultsSection.hidden = false;
      mainCardsSection.hidden = true;
      if (emptyState) emptyState.hidden = true;
    } else if (query && visibleCount === 0) {
      resultsSection.hidden = false;
      mainCardsSection.hidden = true;
      resultsGrid.innerHTML = '';
      if (emptyState) emptyState.hidden = false;
    } else {
      resultsSection.hidden = true;
      mainCardsSection.hidden = false;
      if (emptyState) emptyState.hidden = true;
    }

    if (clearButton) {
      clearButton.hidden = query.length === 0;
    }

    if (!syncUrl) return;

    const url = new URL(window.location.href);
    if (query) {
      url.searchParams.set('q', query);
    } else {
      url.searchParams.delete('q');
    }
    window.history.replaceState({}, '', url);
  };

  const updateDropdown = (rawQuery) => {
    const query = rawQuery.trim().toLowerCase();
    
    if (!query) {
      dropdown.hidden = true;
      suggestionsList.innerHTML = '';
      return;
    }

    // Find matching items (cards + core products) for count
    let matchCount = 0;
    cards.forEach((card, index) => {
      if (cardSearchIndex[index].includes(query)) matchCount++;
    });
    hotspotItems.forEach((item, index) => {
      if (hotspotSearchIndex[index].includes(query)) matchCount++;
    });

    // Find matching product names for suggestions - IMPROVED MATCHING
    // Group results by type: exact code matches first, then title matches, then partial matches
    const exactMatches = [];
    const titleMatches = [];
    const partialMatches = [];
    
    productNames.forEach((product) => {
      const code = (product.code || '').toLowerCase();
      const title = (product.title || '').toLowerCase();
      const combined = `${code} ${title}`.toLowerCase();
      
      // Exact code match (highest priority)
      if (code === query) {
        exactMatches.push(product);
      }
      // Code starts with query (for family matching like "MX" matches "MX5-P3")
      else if (code.startsWith(query)) {
        exactMatches.push(product);
      }
      // Full title word match
      else if (title === query || title.includes(` ${query}`)) {
        titleMatches.push(product);
      }
      // Partial anywhere in combined
      else if (combined.includes(query)) {
        partialMatches.push(product);
      }
    });

    // Combine in order of relevance, deduplicate
    const seen = new Set();
    const matchingProducts = [...exactMatches, ...titleMatches, ...partialMatches].filter((product) => {
      const key = `${product.code}-${product.title}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });

    suggestionsList.innerHTML = '';
    
    if (matchingProducts.length > 0) {
      matchingProducts.slice(0, 8).forEach((product) => {
        const li = document.createElement('li');
        li.role = 'option';
        const titleSpan = document.createElement('strong');
        titleSpan.textContent = product.title || product.code;
        li.appendChild(titleSpan);
        
        if (product.code && product.code !== product.title) {
          const codeSpan = document.createElement('span');
          codeSpan.textContent = product.code;
          li.appendChild(codeSpan);
        } else if (product.sub) {
          const subSpan = document.createElement('span');
          subSpan.textContent = product.sub;
          li.appendChild(subSpan);
        }
        
        li.addEventListener('click', () => {
          dropdown.hidden = true;
          if (product.type === 'core' && product.href) {
            window.location.href = product.href;
            return;
          }
          input.value = product.title || product.code;
          applyFilter(product.title || product.code);
        });
        
        suggestionsList.appendChild(li);
      });
    }

    // Update result count
    if (resultCountDisplay) {
      if (matchCount === 0) {
        resultCountDisplay.textContent = 'No results';
      } else if (matchCount === 1) {
        resultCountDisplay.textContent = '1 result found';
      } else {
        resultCountDisplay.textContent = `${matchCount} results found`;
      }
    }

    dropdown.hidden = false;
  };

  let debounceTimer;
  input.addEventListener('input', () => {
    updateDropdown(input.value);
    if (clearButton) {
      clearButton.hidden = input.value.trim().length === 0;
    }
    window.clearTimeout(debounceTimer);
  });

  input.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      input.value = '';
      applyFilter('');
      dropdown.hidden = true;
    } else if (event.key === 'Enter') {
      event.preventDefault();
      window.clearTimeout(debounceTimer);
      applyFilter(input.value);
      dropdown.hidden = true;
    }
  });

  input.addEventListener('focus', () => {
    if (input.value.trim().length > 0) {
      updateDropdown(input.value);
    }
  });

  document.addEventListener('click', (event) => {
    if (!input.contains(event.target) && !dropdown.contains(event.target)) {
      dropdown.hidden = true;
    }
  });

  if (clearButton) {
    clearButton.addEventListener('click', () => {
      input.value = '';
      input.focus();
      applyFilter('');
      dropdown.hidden = true;
    });
  }

  const searchIcon = document.querySelector('.search-icon');
  if (searchIcon) {
    searchIcon.style.cursor = 'pointer';
    searchIcon.addEventListener('click', () => {
      const query = input.value.trim();
      if (query.length > 0) {
        window.clearTimeout(debounceTimer);
        applyFilter(query);
        dropdown.hidden = true;
      }
      input.focus();
    });
  }

  const initialQuery = new URLSearchParams(window.location.search).get('q') || '';
  input.value = initialQuery;
  applyFilter(initialQuery, false);
}

function initCoreProductNetwork() {
  const networkSection = document.querySelector('.core-network-section');
  const detailImage = document.getElementById('coreNetworkDetailImage');
  const detailTitle = document.getElementById('coreNetworkDetailTitle');
  const detailSubtitle = document.getElementById('coreNetworkDetailSubtitle');
  const detailDescription = document.getElementById('coreNetworkDetailDescription');
  const detailLink = document.getElementById('coreNetworkDetailLink');
  const thumbScroller = networkSection ? networkSection.querySelector('.core-network-thumb-scroller') : null;
  const thumbPrev = document.getElementById('coreNetworkThumbPrev');
  const thumbNext = document.getElementById('coreNetworkThumbNext');
  const hasDetailView = !!(detailImage && detailTitle && detailSubtitle && detailDescription && detailLink);

  if (!networkSection) {
    return;
  }

  const bulletify = (text) => {
    const chunks = text.split(/(?<=[.!?])\s+/).map((c) => c.trim()).filter(Boolean);
    return (chunks.length ? chunks : [text.trim()]).map((item) => `<li>${item}</li>`).join('');
  };

  const MX5_PT_DESC = 'MX5-PT is a slim, lightweight Table Top device for reading 13.56 MHz High Frequency RFID & NFC cards and 125 KHz Low Frequency RFID cards. The MX5-PT is a 2 in 1 reader offering the versatility of RFID HF & LF all in one, enhancing your login security offerings.';
  const K9JR_DESC = 'K9Jr-BT-2DW is the ideal multi-functional Barcode ID Reader for reading 1D and 2D barcodes from Drivers Licenses, Health ID Cards, and Membership IDs via Bluetooth Keyboard. Converts Health card 2D barcode to magnetic stripe output — no application modification needed. Two Barcode Auto trigger Sensors & a Manual trigger Button are built-in standard features. Optional RFID HF reader available as an add-on.';
  const POS108_DESC = 'POS-108/708 is a cash drawer alarm peripheral used to monitor cash drawer status and enhance front-counter security workflows.';
  const MX5K9_DESC = 'MX5-K9 combines 2D barcode and magnetic read support in a compact desktop form factor for retail and service desks.';
  const MX5C_SC_DESC = 'MX5C-SC is an IC-Chip reader designed for smart-card credential workflows requiring secure chip-based card reads.';
  const MX5_P3_SC_M2_DESC = 'MX5-P3-SC-M2 is a MAG-IC CHIP-RFID reader supporting mixed credential environments with a single endpoint.';
  const MX5C_M2_DESC = 'MX5C-M2 is a compact RFID reader for fast credential tap workflows and reliable low-profile deployment.';
  const MX5C_M2_FP_DESC = 'MX5C-M2-FP adds biometric support to RFID workflows for stronger multi-factor authentication scenarios.';
  const MX5_P3_DESC = 'MX5-P3 is a magnetic stripe reader optimized for existing magstripe card workflows and legacy system compatibility.';

  const products = {
    'mx5p3-sc-m2-fp': {
      title: 'MX5-P3-SC-M2-FP',
      subtitle: 'Core multi-format platform',
      description: 'MX5-P3-SC-M2-FP is a compact, lightweight design for reading 13.56 MHz HF RFID & NFC cards, IC-Chip & Smart Cards, 3 tracks Magstripe data, and a built-in Fingerprint Biometric reader. The MX5-P3-SC-M2-FP is a 4 in 1 reader offering diversity and ease of use with an innovative design that installs vertically or horizontally. Enhance your login security with the 4 in 1, two or three factor authentication device.',
      image: 'assets/images/products/posh-products-04.png',
      href: 'core-products/products/mx5p3-sc-m2-fp.html'
    },
    'pos108': {
      title: 'POS-108/708',
      subtitle: 'Cash drawer alarm',
      description: POS108_DESC,
      image: 'assets/images/products/posh-products-05.png',
      href: 'core-products/products/k9jr-bt-2dw-front.html'
    },
    'mx5-k9': {
      title: 'MX5-K9',
      subtitle: '2D-MAG reader+',
      description: MX5K9_DESC,
      image: 'assets/images/products/posh-products-06.png',
      href: 'core-products/products/k9jr-bt-2dw-top.html'
    },
    'mx5pt': {
      title: 'MX5-PT',
      subtitle: 'Table Top Reader',
      description: MX5_PT_DESC,
      image: 'assets/images/products/posh-products-07.png',
      href: 'core-products/products/k9jr-bt-2dw-rear.html'
    },
    'mx5c-sc': {
      title: 'MX5C-SC',
      subtitle: 'IC-Chip Reader',
      description: MX5C_SC_DESC,
      image: 'assets/images/products/posh-products-08.png',
      href: 'core-products/products/mx5pt-wedge.html'
    },
    'mx5p3-sc-m2': {
      title: 'MX5-P3-SC-M2',
      subtitle: 'Mag-IC chip-RFID reader',
      description: MX5_P3_SC_M2_DESC,
      image: 'assets/images/products/posh-products-09.png',
      href: 'core-products/products/mx5pt-rfid-chip.html'
    },
    'mx5c-m2': {
      title: 'MX5C-M2',
      subtitle: 'RFID reader',
      description: MX5C_M2_DESC,
      image: 'assets/images/products/posh-products-10.png',
      href: 'core-products/products/mx5pt-rfid-chip.html'
    },
    'mx5c-m2-fp': {
      title: 'MX5C-M2-FP',
      subtitle: 'RFID-Bio Reader',
      description: MX5C_M2_FP_DESC,
      image: 'assets/images/products/posh-products-11.png',
      href: 'core-products/products/mx5pt-rfid-low-profile.html'
    },
    'mx5p3': {
      title: 'MX5-P3',
      subtitle: 'Magnetic strip reader',
      description: MX5_P3_DESC,
      image: 'assets/images/products/posh-products-12.png',
      href: 'core-products/products/mx5pt-rfid-display.html'
    },
    'mx5-k9-jr': {
      title: 'MX5-K9Jr',
      subtitle: '2D reader+',
      description: K9JR_DESC,
      image: 'assets/images/products/posh-products-13.png',
      href: 'core-products/products/mx5pt-classic.html'
    }
  };

  window.poshProductCatalog = products;

  const productTriggers = Array.from(networkSection.querySelectorAll('[data-core-product]'));

  const setActiveProduct = (slug) => {
    const product = products[slug];
    if (!product) {
      return;
    }

    if (hasDetailView) {
      detailImage.src = product.image;
      detailImage.alt = product.title;
      detailTitle.textContent = product.title;
      detailSubtitle.textContent = product.subtitle;
      detailDescription.innerHTML = bulletify(product.description);
      detailLink.href = `${product.href}?product=${encodeURIComponent(slug)}`;
    }

    productTriggers.forEach((element) => {
      element.classList.toggle('active', element.dataset.coreProduct === slug);
    });
  };

  productTriggers.forEach((element) => {
    const slug = element.dataset.coreProduct;
    const mapped = products[slug];
    if (mapped && element.tagName === 'A') {
      element.href = `${mapped.href}?product=${encodeURIComponent(slug)}`;
    }

    const activate = () => setActiveProduct(element.dataset.coreProduct);
    element.addEventListener('mouseenter', activate);
    element.addEventListener('focus', activate);
    element.addEventListener('click', activate);
  });

  if (thumbScroller && thumbPrev && thumbNext) {
    const scrollStep = () => Math.max(180, Math.floor(thumbScroller.clientWidth * 0.65));

    thumbPrev.addEventListener('click', () => {
      thumbScroller.scrollBy({ left: -scrollStep(), behavior: 'smooth' });
    });

    thumbNext.addEventListener('click', () => {
      thumbScroller.scrollBy({ left: scrollStep(), behavior: 'smooth' });
    });
  }

  if (hasDetailView) {
    setActiveProduct('mx5p3-sc-m2-fp');
  }
}

function initQuickMessageModal() {
  if (!document.body || document.querySelector('[data-quick-message-root]')) return;

  const baseContactPath = window.location.pathname.includes('/posh-gallery/')
    ? '../contact.html'
    : 'contact.html';

  const modalHost = document.createElement('div');
  modalHost.setAttribute('data-quick-message-root', 'true');
  modalHost.innerHTML = `
    <button class="quick-message-fab" type="button" aria-label="Open quick message form" data-quick-open>
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
        <path d="M4 6.5C4 5.12 5.12 4 6.5 4h11C18.88 4 20 5.12 20 6.5v7c0 1.38-1.12 2.5-2.5 2.5H9l-4.5 3v-3.4A2.5 2.5 0 0 1 4 13.5v-7Z" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </button>

    <section class="quick-message-modal" aria-hidden="true" data-quick-modal>
      <button class="quick-message-backdrop" type="button" aria-label="Close quick message form" data-quick-close></button>
      <div class="quick-message-sheet" role="dialog" aria-modal="true" aria-label="Quick message form">
        <div class="quick-message-head">
          <div>
            <h3>Leave a quick message</h3>
            <p>Share your details and we will follow up.</p>
          </div>
          <button class="quick-message-close" type="button" aria-label="Close quick message form" data-quick-close>&times;</button>
        </div>

        <form class="quick-message-form" data-quick-form data-prototype-alert="false" novalidate>
          <label class="quick-message-trap" aria-hidden="true">
            Company
            <input type="text" name="company" tabindex="-1" autocomplete="off" />
          </label>
          <div class="quick-message-grid">
            <label>
              Name
              <input type="text" name="name" required autocomplete="name" />
            </label>
            <label>
              Number
              <input type="tel" name="phone" required autocomplete="tel" />
            </label>
            <label>
              Email
              <input type="email" name="email" required autocomplete="email" />
            </label>
            <label>
              Website
              <input type="url" name="website" required placeholder="your-site.example" autocomplete="url" />
            </label>
          </div>

          <label>
            Comment
            <textarea name="comment" required></textarea>
          </label>

          <label class="quick-message-legal">
            <input type="checkbox" name="agree" required />
            <span>I agree to the <a href="${baseContactPath}#privacy">Privacy Policy</a> and <a href="${baseContactPath}#terms">Terms of Service</a>.</span>
          </label>

          <button class="quick-message-submit" type="submit" data-quick-submit disabled>Submit</button>
          <p class="quick-message-success" data-quick-success>Thanks. Your message has been captured.</p>
        </form>
      </div>
    </section>
  `;

  document.body.appendChild(modalHost);

  const openButton = modalHost.querySelector('[data-quick-open]');
  const modal = modalHost.querySelector('[data-quick-modal]');
  const closeButtons = modalHost.querySelectorAll('[data-quick-close]');
  const form = modalHost.querySelector('[data-quick-form]');
  const submitButton = modalHost.querySelector('[data-quick-submit]');
  const successMessage = modalHost.querySelector('[data-quick-success]');
  const firstInput = form.querySelector('input[name="name"]');

  const updateSubmitState = () => {
    submitButton.disabled = !form.checkValidity();
  };

  let formToken = null;

  const fetchToken = async () => {
    try {
      const res = await fetch('/api/token');
      const data = await res.json().catch(() => ({}));
      formToken = data.ok ? data.token : null;
    } catch (_) {
      formToken = null;
    }
  };

  const openModal = () => {
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('quick-message-open');
    fetchToken();
    window.setTimeout(() => firstInput.focus(), 10);
  };

  const closeModal = () => {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('quick-message-open');
  };

  openButton.addEventListener('click', openModal);
  closeButtons.forEach((button) => button.addEventListener('click', closeModal));

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && modal.classList.contains('is-open')) {
      closeModal();
    }
  });

  form.addEventListener('input', updateSubmitState);
  form.addEventListener('change', updateSubmitState);

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    successMessage.classList.remove('is-visible', 'is-error');

    if (!form.checkValidity()) {
      form.reportValidity();
      updateSubmitState();
      return;
    }

    const defaultButtonText = submitButton.textContent;
    submitButton.disabled = true;
    submitButton.textContent = 'Sending...';

    const payload = {
      name: (form.elements.name.value || '').trim(),
      phone: (form.elements.phone.value || '').trim(),
      email: (form.elements.email.value || '').trim(),
      website: (form.elements.website.value || '').trim(),
      comment: (form.elements.comment.value || '').trim(),
      agree: !!form.elements.agree.checked,
      company: (form.elements.company.value || '').trim()
    };

    try {
      const response = await fetch('/api/quick-message', {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          ...(formToken ? { 'X-Form-Token': formToken } : {})
        }
      });

      const result = await response.json().catch(() => ({}));
      if (!response.ok || !result.ok) {
        throw new Error('Message delivery failed');
      }

      successMessage.classList.remove('is-error');
      successMessage.textContent = 'Thanks. Your message has been sent to info@poshmfg.com.';
      successMessage.classList.add('is-visible');
      form.reset();
      updateSubmitState();

      window.setTimeout(() => {
        successMessage.classList.remove('is-visible');
        closeModal();
      }, 1400);
    } catch (error) {
      successMessage.classList.add('is-error');
      successMessage.textContent = 'We could not send right now. Please try again in a moment.';
      successMessage.classList.add('is-visible');
      submitButton.disabled = false;
      submitButton.textContent = defaultButtonText;
      return;
    }

    submitButton.textContent = defaultButtonText;
  });

  updateSubmitState();
}

initProductSearch();
initCoreProductNetwork();
initQuickMessageModal();

// Prevent multiple initializations
if (!window.__poschInitialized) {
  window.__poschInitialized = true;
}
