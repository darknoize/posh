const products = [
  {
    title: 'MX Platform Overview',
    subtitle: 'Primary family graphic',
    short: 'Full product family composition for the opening gallery slide.',
    description: 'Use this as the lead project slide. It gives the customer a quick visual understanding of the core platform and its surrounding variants before they drill into an individual product.',
    image: 'assets/hero-overview.png',
    imageLight: 'assets/hero-overview-light.png'
  },
  {
    title: 'MX5P3-SC-M2-FP',
    subtitle: 'Core multi-format platform',
    short: 'Primary core product used as the system anchor.',
    description: 'This is the central platform view. It works well as the hero product in the detail area because it visually reads as the main architecture that the surrounding variants extend from.',
    image: 'assets/core-top-front.png'
  },
  {
    title: 'MX5 RFID Front',
    subtitle: 'RFID faceplate variant',
    short: 'Clean front elevation with blue status LED.',
    description: 'A simple front-facing variant for product storytelling, spec sections, or interactive hotspots. The image is clean and easy to pair with technical copy on the right.',
    image: 'assets/front-1.png'
  },
  {
    title: 'MX5 Smart Chip',
    subtitle: 'Chip-enabled faceplate',
    short: 'Front view with integrated smart-chip indicator.',
    description: 'Use this slide when describing smart-chip compatibility, controlled credential workflows, or modular input configurations built on the same base device.',
    image: 'assets/front-2.png'
  },
  {
    title: 'MX5 Classic',
    subtitle: 'Low profile reader format',
    short: 'Slim horizontal product body with status LED.',
    description: 'This format gives you a lower profile product presentation for tabletop or flush-mount style storytelling. It balances nicely against the taller core product.',
    image: 'assets/front-4.png'
  },
  {
    title: 'K9Jr-BT-2DW',
    subtitle: 'Compact peripheral variant',
    short: 'Specialized peripheral form factor.',
    description: 'A supporting variant that helps communicate the breadth of the platform family. It works especially well in a grouped gallery where customers can compare shapes and use cases quickly.',
    image: 'assets/front-5.png'
  },
  {
    title: 'K9Jr-BT-2DW Rear',
    subtitle: 'Side and rear hardware perspective',
    short: 'Utility view showing hardware proportions.',
    description: 'This angle gives useful context for housing depth, connector placement, and mounting style. It is also helpful when you want the gallery to feel more complete and product-real.',
    image: 'assets/front-6.png'
  },
  {
    title: 'Table Top Reader',
    subtitle: 'Wedge format reader',
    short: 'Angular tabletop variant with clean top plane.',
    description: 'A broad tabletop configuration that expands the system beyond the front-reader formats. This is a strong slide for presenting workspace or desktop use cases.',
    image: 'assets/right-side.png'
  },
  {
    title: 'RF Signal Housing',
    subtitle: 'Compact side-profile device',
    short: 'Minimal side profile with top RFID mark.',
    description: 'This compact signal-driven format helps reinforce that the platform is modular and can be implemented in multiple envelopes without losing its visual family resemblance.',
    image: 'assets/right-side-1.png'
  },
  {
    title: 'MX5 Top Front RFID',
    subtitle: 'Top mark and chip front configuration',
    short: 'RFID symbol on top with smart-chip front panel.',
    description: 'A refined hero candidate for sections focused on credential versatility. The top mark and front panel read clearly even at reduced thumbnail size.',
    image: 'assets/top-front-11.png'
  },
  {
    title: 'MX5 Top Front Display',
    subtitle: 'Display-equipped front format',
    short: 'Front view with top display window.',
    description: 'This version introduces a display element while preserving the family silhouette. It is ideal for a slide that explains layered workflows or local user feedback.',
    image: 'assets/top-front-5.png'
  },
  {
    title: 'MX5 RFID Low Profile',
    subtitle: 'Front low-profile RFID variant',
    short: 'Compact front format with clear brand panel.',
    description: 'This is a strong supporting view for a feature row or comparison strip. It keeps the design language minimal and readable while still showing the LED and RFID identity.',
    image: 'assets/top-front-6.png'
  },
  {
    title: 'MX5 Top Front Smart Chip',
    subtitle: 'Smart-chip top/front combination',
    short: 'Chip-enabled front with top display window.',
    description: 'A useful detail slide for smart-chip or dual-mode stories. It helps the gallery feel richer without requiring new layout logic.',
    image: 'assets/top-front-8.png'
  },
  {
    title: 'MX5 Front Smart Chip',
    subtitle: 'Front only smart-chip variant',
    short: 'Streamlined smart-chip front panel version.',
    description: 'This front-only configuration works well when you want a cleaner aesthetic in the detail pane or a tighter comparison against the RFID-focused variants.',
    image: 'assets/top-front-9.png'
  }
];

const mainSlideImage = document.getElementById('mainSlideImage');
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

function renderThumbs() {
  thumbTrack.innerHTML = '';

  products.forEach((product, index) => {
    const thumbSource = getImageSource(product);
    const button = document.createElement('button');
    button.className = 'thumb';
    button.type = 'button';
    button.dataset.index = index;
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

function animateMainImage(newSrc, newAlt, directionClass) {
  mainSlideImage.classList.remove('is-changing-left', 'is-changing-right');
  if (directionClass) {
    mainSlideImage.classList.add(directionClass);
  }

  setTimeout(() => {
    mainSlideImage.src = newSrc;
    mainSlideImage.alt = newAlt;
    mainSlideImage.classList.remove('is-changing-left', 'is-changing-right');
  }, 160);
}

function syncCurrentSlideImageToTheme() {
  const product = products[currentIndex];
  if (!product) return;

  const nextSource = getImageSource(product);
  mainSlideImage.dataset.fallback = product.image;
  mainSlideImage.src = nextSource;
  mainSlideImage.alt = product.title;
}

function centerActiveThumb(activeThumb) {
  if (!activeThumb) return;

  const left = activeThumb.offsetLeft - (thumbTrack.clientWidth / 2) + (activeThumb.clientWidth / 2);
  thumbTrack.scrollTo({
    left: Math.max(0, left),
    behavior: 'smooth'
  });
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
  detailDescription.textContent = product.description;

  mainSlideImage.classList.toggle('is-first-slide', currentIndex === 0);
  mainSlideImage.dataset.fallback = product.image;

  animateMainImage(imageSource, product.title, imageDirectionClass);

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
