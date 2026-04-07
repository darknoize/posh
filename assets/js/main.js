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

  // Extract product names for suggestions
  const productNames = cards.map((card) => {
    const title = card.querySelector('h2')?.textContent || '';
    const code = card.querySelector('.product-code')?.textContent || '';
    return { title: title.trim(), code: code.trim(), card };
  }).filter(p => p.title || p.code);

  const searchIndex = cards.map((card) => {
    const code = card.querySelector('.product-code')?.textContent || '';
    const title = card.querySelector('h2')?.textContent || '';
    const description = card.querySelector('p')?.textContent || '';
    const specs = Array.from(card.querySelectorAll('.spec-list span')).map((node) => node.textContent || '').join(' ');
    const linkText = card.querySelector('.text-link')?.textContent || '';
    const idText = card.id || '';
    return `${idText} ${code} ${title} ${description} ${specs} ${linkText}`.toLowerCase();
  });

  const applyFilter = (rawQuery, syncUrl = true) => {
    const query = rawQuery.trim().toLowerCase();
    const matchedCards = [];
    let visibleCount = 0;

    if (query) {
      cards.forEach((card, index) => {
        const matches = searchIndex[index].includes(query);
        if (matches) {
          matchedCards.push(card);
          visibleCount++;
        }
      });
    }

    if (query && visibleCount > 0) {
      resultsGrid.innerHTML = '';
      matchedCards.forEach((card) => {
        const clone = card.cloneNode(true);
        resultsGrid.appendChild(clone);
      });
      resultsSection.hidden = false;
      mainCardsSection.hidden = true;
      if (emptyState) {
        emptyState.hidden = true;
      }
    } else if (query && visibleCount === 0) {
      resultsSection.hidden = false;
      mainCardsSection.hidden = true;
      resultsGrid.innerHTML = '';
      if (emptyState) {
        emptyState.hidden = false;
      }
    } else {
      resultsSection.hidden = true;
      mainCardsSection.hidden = false;
      if (emptyState) {
        emptyState.hidden = true;
      }
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

    // Find matching cards for count
    let matchCount = 0;
    cards.forEach((card, index) => {
      if (searchIndex[index].includes(query)) {
        matchCount++;
      }
    });

    // Find matching product names for suggestions
    const matchingProducts = productNames.filter((product) => {
      const combined = `${product.code} ${product.title}`.toLowerCase();
      return combined.includes(query);
    });

    suggestionsList.innerHTML = '';
    
    if (matchingProducts.length > 0) {
      matchingProducts.slice(0, 5).forEach((product) => {
        const li = document.createElement('li');
        li.role = 'option';
        const titleSpan = document.createElement('strong');
        titleSpan.textContent = product.title || product.code;
        li.appendChild(titleSpan);
        
        if (product.code && product.code !== product.title) {
          const codeSpan = document.createElement('span');
          codeSpan.textContent = product.code;
          li.appendChild(codeSpan);
        }
        
        li.addEventListener('click', () => {
          input.value = product.title || product.code;
          applyFilter(product.title || product.code);
          dropdown.hidden = true;
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
    window.clearTimeout(debounceTimer);
    debounceTimer = window.setTimeout(() => {
      applyFilter(input.value);
    }, 120);
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
              <input type="url" name="website" required placeholder="https://" autocomplete="url" />
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
initQuickMessageModal();
