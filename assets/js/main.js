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
    ? normalizedSource.replace('.svg', '-active.svg')
    : normalizedSource;

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
    event.preventDefault();
    alert('Prototype form only. Connect this to your real contact workflow.');
  });
});

const topRail = document.querySelector('.top-rail-highlight');
const topRailClose = document.querySelector('[data-top-rail-close]');
if (topRail && topRailClose) {
  const hiddenClass = 'home-rail-hidden';
  const storageKey = 'posh-home-rail-hidden';

  let isHidden = false;
  try {
    isHidden = localStorage.getItem(storageKey) === '1';
  } catch (e) {}

  if (isHidden) {
    document.body.classList.add(hiddenClass);
  }

  topRailClose.addEventListener('click', () => {
    document.body.classList.add(hiddenClass);
    try {
      localStorage.setItem(storageKey, '1');
    } catch (e) {}
  });
}

function initProductSearch() {
  const input = document.getElementById('productSearchInput');
  const clearButton = document.getElementById('productSearchClear');
  const grid = document.querySelector('.product-grid');
  const emptyState = document.getElementById('productSearchEmpty');
  if (!input || !grid) return;

  const cards = Array.from(grid.querySelectorAll('.product-card'));
  if (!cards.length) return;

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
    let visibleCount = 0;

    cards.forEach((card, index) => {
      const matches = !query || searchIndex[index].includes(query);
      card.hidden = !matches;
      if (matches) visibleCount += 1;
    });

    if (emptyState) {
      emptyState.hidden = visibleCount !== 0;
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

  let debounceTimer;
  input.addEventListener('input', () => {
    window.clearTimeout(debounceTimer);
    debounceTimer = window.setTimeout(() => {
      applyFilter(input.value);
    }, 120);
  });

  input.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      input.value = '';
      applyFilter('');
    }
  });

  if (clearButton) {
    clearButton.addEventListener('click', () => {
      input.value = '';
      input.focus();
      applyFilter('');
    });
  }

  const initialQuery = new URLSearchParams(window.location.search).get('q') || '';
  input.value = initialQuery;
  applyFilter(initialQuery, false);
}

initProductSearch();
