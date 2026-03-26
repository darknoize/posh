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
const setTheme = (theme) => {
  root.setAttribute('data-theme', theme);
  try { localStorage.setItem('posch-theme', theme); } catch (e) {}
  themeButtons.forEach((button) => {
    const isActive = button.getAttribute('data-theme-value') === theme;
    button.classList.toggle('is-active', isActive);
    button.setAttribute('aria-pressed', String(isActive));
  });
};
if (themeButtons.length) {
  const initialTheme = root.getAttribute('data-theme') || 'dark';
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
