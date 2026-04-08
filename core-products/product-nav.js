(function initCoreProductPager() {
  const navPrev = document.querySelector('.product-nav-arrow.prev');
  const navNext = document.querySelector('.product-nav-arrow.next');
  if (!navPrev || !navNext) return;

  const pageHeader = document.querySelector('.page-header');
  if (pageHeader && !pageHeader.querySelector('.product-search-link')) {
    const searchLink = document.createElement('a');
    searchLink.className = 'product-search-link';
    searchLink.href = '../../products.html#core';
    searchLink.textContent = 'Search Products';
    pageHeader.appendChild(searchLink);
  }

  const sequence = [
    {
      slug: 'mx5p3-sc-m2-fp',
      href: 'mx5p3-sc-m2-fp.html',
      title: 'MX5P3-SC-M2-FP',
      subtitle: 'Core multi-format platform',
      image: '../../assets/images/products/orig-mx5p3-sc-m2-fp-front.png'
    },
    {
      slug: 'pos108',
      href: 'k9jr-bt-2dw-front.html',
      title: 'POS108',
      subtitle: 'Cash drawer alarm',
      image: '../../assets/images/products/orig-pos108-left-side.png'
    },
    {
      slug: 'mx5-k9',
      href: 'k9jr-bt-2dw-top.html',
      title: 'MX5K9',
      subtitle: '2D-MAG reader+',
      image: '../../assets/images/products/orig-k9-mag-2dw-front.png'
    },
    {
      slug: 'mx5pt',
      href: 'k9jr-bt-2dw-rear.html',
      title: 'MX5PT',
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
      title: 'MX5P3-SC-M2',
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
      title: 'MX5P3',
      subtitle: 'Magnetic strip reader',
      image: '../../assets/images/products/orig-mx5p3-sc-front.png'
    },
    {
      slug: 'mx5-k9-jr',
      href: 'mx5pt-classic.html',
      title: 'MX5-K9-Jr',
      subtitle: '2D reader+',
      image: '../../assets/images/products/orig-k9jr-bt-2dw-top-front.png'
    }
  ];

  const descriptions = {
    'mx5p3-sc-m2-fp': 'MX5P3-SC-M2-FP is a compact, lightweight Design for Reading 13.56 MHz High Frequency Radio Frequency Identification (RFID) & NFC cards, IC-Chip & Smart Cards, 3 tracks Magstripe data and a built-in Fingerprint Biometric-reader. The MX5P3-SC-M2-FP is a 4 in 1 reader which offers diversity and ease of use thru its innovative design which can be easily installed vertically or horizontally. Enhance your login security with the 4 in 1, two or three factor Authentication device.',
    'pos108': 'POS108 is both a Dual Cash Drawer Alarm or a Printer Receipt Alarm all in one. Easy to install, No tools or software changes needed. Plug and Play. The POS108 can connect to virtually any POS Printers with a RJ12 Cash Drawer Port. The built in Dual Cash Drawer splitter offers an easy option to connecting two cash drawers to one POS printer. The drawer open alarm feature is easily configured offering a variety of user settings.',
    'mx5-k9': 'K9 MAG-2DW is the Ideal Multi-Functional Barcode ID and Magstripe Reader all in one to help you Read 1 D and 2 D barcodes, Magnetic Stripe data from Drivers Licenses, Health ID Cards and Membership IDs. The K9 offers diversity and ease of use thru its innovative design. Two Barcode Auto trigger Sensors & a Manual trigger Button are built in as a standard feature of all the K9 versions. Optional RFID HF, RFID DF, IC Smart Card and Fingerprint readers are available as an add - on.',
    'mx5pt': 'MX5PT is a slim, lightweight Table Top device for Reading 13.56 MHz High Frequency Radio Frequency Identification (RFID) & NFC cards and 125 KHz Low Frequency Radio Frequency Identification (RFID) cards. The MX5PT offers diversity of having a 2 in 1 reader, enhancing your login security offerings with the versatility of RFID HF & LF all in one.',
    'mx5c-sc': 'MX5C-CBP-SC is a slim, lightweight Design for Reading IC-Chip & Smart Cards. The MX5C-CBP-SC offers diversity and ease of use thru its innovative design and can be easily installed vertically or horizontally.',
    'mx5p3-sc-m2': 'MX5P3-SC-M2 is a compact, lightweight Design for Reading 13.56 MHz High Frequency Radio Frequency Identification (RFID) & NFC cards, IC-Chip & Smart Cards, and 3 tracks Magstripe. The MX5P3-SC-M2 is a 3 in 1 reader which offers diversity and ease of use thru its innovative design which can be easily installed vertically or horizontally. Enhance your login security with the 3 in 1, two or three factor Authentication device.',
    'mx5c-m2': 'MX5C-CBP-M2 is a slim, lightweight Design for Reading 13.56 MHz High Frequency Radio Frequency Identification (RFID) & NFC cards. The MX5C-CBP-M2 offers diversity and ease of use thru its innovative design and can be easily installed vertically or horizontally.',
    'mx5c-m2-fp': 'MX5C-CBP-M2-FP is a slim, lightweight Design for Reading 13.56 MHz High Frequency Radio Frequency Identification (RFID) & NFC cards with a built-in Fingerprint Biometric-reader. The MX5C-CBP-M2-FP offers diversity and ease of use thru its innovative design and can be easily installed vertically or horizontally. Enhance your login security with the 2 in 1, two factor Authentication device.',
    'mx5p3': 'MX5P3-SC is a compact, lightweight Design for Reading IC-Chip & Smart Cards and 3 tracks Magstripe data. The MX5P3-SC is a 2 in 1 reader which offers diversity and ease of use thru its innovative design which can be easily installed vertically or horizontally.',
    'mx5-k9-jr': 'K9Jr-Bluetooth Keyboard, 2DW is the Ideal Multi-Functional Barcode ID Reader to help you Read 1D and 2D barcodes from Drivers Licenses, Health ID Cards and Membership IDs. The K9Jr-Bluetooth offers diversity and ease of use thru its innovative design as a Bluetooth Keyboard. If you currently use a Magnetic card reader to read your Health Card then the K9Jr-Bluetooth will convert your Health card 2D barcode to a magnetic stripe data output via Bluetooth Keyboard. No need to modify your application. Two Barcode Auto trigger Sensors & a Manual trigger Button are built in as a standard feature of the K9Jr-Bluetooth. Optional RFID HF reader is available as an add-on feature.'
  };

  const params = new URLSearchParams(window.location.search);
  const requestedSlug = params.get('product');
  const currentFile = window.location.pathname.split('/').pop() || '';

  const currentIndex = sequence.findIndex((item) => {
    if (!requestedSlug) return false;
    return item.slug === requestedSlug && item.href === currentFile;
  });

  const fallbackIndex = sequence.findIndex((item) => item.href === currentFile);
  const resolvedIndex = currentIndex >= 0 ? currentIndex : fallbackIndex;
  if (resolvedIndex < 0) return;

  const prevItem = sequence[(resolvedIndex - 1 + sequence.length) % sequence.length];
  const nextItem = sequence[(resolvedIndex + 1) % sequence.length];
  const currentItem = sequence[resolvedIndex];

  const heroImage = document.querySelector('.product-hero-frame img');
  const detailTitle = document.querySelector('.product-copy h2');
  const detailSubtitle = document.querySelector('.product-copy .detail-subtitle');
  const detailDescription = document.querySelector('.product-copy .detail-description');

  if (heroImage) {
    heroImage.src = currentItem.image;
    heroImage.alt = currentItem.title;
  }
  if (detailTitle) detailTitle.textContent = currentItem.title;
  if (detailSubtitle) detailSubtitle.textContent = currentItem.subtitle;
  if (detailDescription) detailDescription.textContent = descriptions[currentItem.slug] || detailDescription.textContent;
  document.title = `${currentItem.title} | POSHMFG`;

  navPrev.href = `${prevItem.href}?product=${encodeURIComponent(prevItem.slug)}`;
  navNext.href = `${nextItem.href}?product=${encodeURIComponent(nextItem.slug)}`;

  navPrev.setAttribute('aria-label', `Previous product: ${prevItem.title}`);
  navNext.setAttribute('aria-label', `Next product: ${nextItem.title}`);
  navPrev.title = `Previous: ${prevItem.title}`;
  navNext.title = `Next: ${nextItem.title}`;
})();
