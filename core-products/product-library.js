(function initPoshProductLibrary(global) {
  if (global.POSH_PRODUCT_LIBRARY) return;

  const iconMeta = {
    "HF-RFID.png": { key: "HF-RFID", label: "High Frequency RFID" },
    "LF-RFID.png": { key: "LF-RFID", label: "Low Frequency RFID" },
    "DF-RFID.png": { key: "DF-RFID", label: "Dual Frequency RFID" },
    "FingerPrint.png": { key: "FingerPrint", label: "Fingerprint Reader" },
    "IC-SC.png": { key: "IC-SC", label: "Smart Chip Reader" },
    "mag_card.png": { key: "mag_card", label: "Magnetic Card Reader" },
    "2DW.png": { key: "2DW", label: "Barcode Reader" },
    "POS.png": { key: "POS", label: "Point of Sale" },
    "BlueTooth.png": { key: "BlueTooth", label: "Bluetooth" }
  };

  const familyOrder = ["K9", "K9Jr", "POS", "MX5-PT", "MX5C", "MX5-P3", "MX5-PC", "MX53"];

  const variants = [
    { name: "K9-MAG-2DW", family: "K9", targetSlug: "mx5-k9", pageSlug: "k9-mag-2dw", detailHref: "core-products/products/k9-mag-2dw.html", icons: ["2DW.png", "mag_card.png", "DF-RFID.png"], variables: ["MAG", "2DW"] },
    { name: "K9-MAG-2DW-FP", family: "K9", targetSlug: "mx5-k9", pageSlug: "k9-mag-2dw-fp", detailHref: "core-products/products/k9-mag-2dw-fp.html", icons: ["2DW.png", "mag_card.png", "FingerPrint.png", "DF-RFID.png"], variables: ["MAG", "2DW", "FP"] },
    { name: "K9Jr-2DW", family: "K9Jr", targetSlug: "mx5-k9-jr", pageSlug: "k9jr-2dw", detailHref: "core-products/products/k9jr-2dw.html", icons: ["2DW.png"], variables: ["2DW"] },
    { name: "K9Jr-BT-2DW", family: "K9Jr", targetSlug: "mx5-k9-jr", pageSlug: "k9jr-bt-2dw", detailHref: "core-products/products/k9jr-bt-2dw.html", icons: ["BlueTooth.png", "2DW.png"], variables: ["BT", "2DW"] },
    { name: "POS108", title: "POS-108", family: "POS", targetSlug: "pos108", pageSlug: "pos-108", detailHref: "core-products/products/pos-108.html", icons: ["POS.png"], image: "../assets/images/products/orig-pos108-top.png", description: "POS108 is both a Dual Cash Drawer Alarm or a Printer Receipt Alarm all in one. Easy to install, no tools or software changes needed. Plug and Play. The POS108 can connect to virtually any POS printers with an RJ12 cash drawer port.", variables: ["108"] },
    { name: "POS708", title: "POS-708", family: "POS", targetSlug: "pos108", pageSlug: "pos-708", detailHref: "core-products/products/pos-708.html", icons: ["POS.png"], image: "../assets/images/products/orig-pos708-front.png", description: "POS708-USB is a dual cash drawer trigger and alarm, and can also serve as a single or dual paper receipt alarm with the POS-PSen-708. Easy to install and plug-and-play as a virtual serial port or standalone device.", variables: ["708", "USB"] },
    { name: "MX5PT", family: "MX5-PT", targetSlug: "mx5pt", pageSlug: "mx5-pt", detailHref: "core-products/products/mx5-pt.html", icons: ["HF-RFID.png", "LF-RFID.png"], variables: ["PT"] },
    { name: "MX5C-CBP-EM", family: "MX5C", targetSlug: "mx5c-m2", pageSlug: "mx5c-cbp-em", detailHref: "core-products/products/mx5c-cbp-em.html", icons: ["LF-RFID.png"], variables: ["CBP", "EM"] },
    { name: "MX5C-CBP-EM-FP", family: "MX5C", targetSlug: "mx5c-m2-fp", pageSlug: "mx5c-cbp-em-fp", detailHref: "core-products/products/mx5c-cbp-em-fp.html", icons: ["LF-RFID.png", "FingerPrint.png"], variables: ["CBP", "EM", "FP"] },
    { name: "MX5C-CBP-M2", family: "MX5C", targetSlug: "mx5c-m2", pageSlug: "mx5c-cbp-m2", detailHref: "core-products/products/mx5c-cbp-m2.html", icons: ["HF-RFID.png"], variables: ["CBP", "M2"] },
    { name: "MX5C-CBP-M2-FP", family: "MX5C", targetSlug: "mx5c-m2-fp", pageSlug: "mx5c-cbp-m2-fp", detailHref: "core-products/products/mx5c-cbp-m2-fp.html", icons: ["HF-RFID.png", "FingerPrint.png"], variables: ["CBP", "M2", "FP"] },
    { name: "MX5C-CBP-SC", family: "MX5C", targetSlug: "mx5c-sc", pageSlug: "mx5c-cbp-sc", detailHref: "core-products/products/mx5c-cbp-sc.html", icons: ["IC-SC.png"], variables: ["CBP", "SC"] },
    { name: "MX5C-CBP-SC-FP", family: "MX5C", targetSlug: "mx5c-sc", pageSlug: "mx5c-cbp-sc-fp", detailHref: "core-products/products/mx5c-cbp-sc-fp.html", icons: ["IC-SC.png", "FingerPrint.png"], variables: ["CBP", "SC", "FP"] },
    { name: "MX5P3-SC", family: "MX5-P3", targetSlug: "mx5p3", pageSlug: "mx5-p3-sc", detailHref: "core-products/products/mx5-p3-sc.html", icons: ["IC-SC.png", "mag_card.png"], variables: ["SC"] },
    { name: "MX5P3-SC-FP", family: "MX5-P3", targetSlug: "mx5p3-sc-m2-fp", pageSlug: "mx5-p3-sc-fp", detailHref: "core-products/products/mx5-p3-sc-fp.html", icons: ["IC-SC.png", "mag_card.png", "FingerPrint.png"], variables: ["SC", "FP"] },
    { name: "MX5P3-SC-M2", family: "MX5-P3", targetSlug: "mx5p3-sc-m2", pageSlug: "mx5-p3-sc-m2", detailHref: "core-products/products/mx5-p3-sc-m2.html", icons: ["HF-RFID.png", "IC-SC.png", "mag_card.png"], variables: ["SC", "M2"] },
    { name: "MX5P3-SC-M2-FP", family: "MX5-P3", targetSlug: "mx5p3-sc-m2-fp", pageSlug: "mx5-p3-sc-m2-fp", detailHref: "core-products/products/mx5-p3-sc-m2-fp.html", icons: ["HF-RFID.png", "IC-SC.png", "mag_card.png", "FingerPrint.png"], variables: ["SC", "M2", "FP"] },
    { name: "MX5PC-SC-M2", family: "MX5-PC", targetSlug: "mx5p3-sc-m2", pageSlug: "mx5-pc-sc-m2", detailHref: "core-products/products/mx5-pc-sc-m2.html", icons: ["HF-RFID.png", "IC-SC.png"], variables: ["PC", "SC", "M2"] },
    { name: "MX5PC-SC-M2-FP", family: "MX5-PC", targetSlug: "mx5p3-sc-m2-fp", pageSlug: "mx5-pc-sc-m2-fp", detailHref: "core-products/products/mx5-pc-sc-m2-fp.html", icons: ["HF-RFID.png", "IC-SC.png", "FingerPrint.png"], variables: ["PC", "SC", "M2", "FP"] },
    { name: "MX53-CBP-CLS", family: "MX53", targetSlug: "mx5p3", pageSlug: "mx53-cbp-cls", detailHref: "core-products/products/mx53-cbp-cls.html", icons: ["mag_card.png"], variables: ["CBP", "CLS"] },
    { name: "MX53-CBP-LIT", family: "MX53", targetSlug: "mx5p3", pageSlug: "mx53-cbp-lit", detailHref: "core-products/products/mx53-cbp-lit.html", icons: ["mag_card.png"], variables: ["CBP", "LIT"] },
    { name: "MX53-CBP-EM", family: "MX53", targetSlug: "mx5pt", pageSlug: "mx53-cbp-em", detailHref: "core-products/products/mx53-cbp-em.html", icons: ["LF-RFID.png", "mag_card.png"], variables: ["CBP", "EM"] },
    { name: "MX53-CBP-EM-FP", family: "MX53", targetSlug: "mx5c-m2-fp", pageSlug: "mx53-cbp-em-fp", detailHref: "core-products/products/mx53-cbp-em-fp.html", icons: ["LF-RFID.png", "mag_card.png", "FingerPrint.png"], variables: ["CBP", "EM", "FP"] },
    { name: "MX53-CBP-M2", family: "MX53", targetSlug: "mx5p3-sc-m2", pageSlug: "mx53-cbp-m2", detailHref: "core-products/products/mx53-cbp-m2.html", icons: ["HF-RFID.png", "mag_card.png"], variables: ["CBP", "M2"] },
    { name: "MX53-CBP-M2-FP", family: "MX53", targetSlug: "mx5p3-sc-m2-fp", pageSlug: "mx53-cbp-m2-fp", detailHref: "core-products/products/mx53-cbp-m2-fp.html", icons: ["HF-RFID.png", "mag_card.png", "FingerPrint.png"], variables: ["CBP", "M2", "FP"] }
  ];

  const sequence = [
    { slug: "mx5p3-sc-m2-fp", href: "mx5p3-sc-m2-fp.html", title: "MX5-P3-SC-M2-FP", core: true },
    { slug: "pos108", href: "k9jr-bt-2dw-front.html", title: "POS-108/708", core: true },
    { slug: "mx5-k9", href: "k9jr-bt-2dw-top.html", title: "MX5-K9", core: true },
    { slug: "mx5pt", href: "k9jr-bt-2dw-rear.html", title: "MX5-PT", core: true },
    { slug: "mx5c-sc", href: "mx5pt-wedge.html", title: "MX5C-SC", core: true },
    { slug: "mx5p3-sc-m2", href: "mx5pt-rfid-chip.html", title: "MX5-P3-SC-M2", core: true },
    { slug: "mx5c-m2", href: "mx5pt-rfid-chip.html", title: "MX5C-M2", core: true },
    { slug: "mx5c-m2-fp", href: "mx5pt-rfid-low-profile.html", title: "MX5C-M2-FP", core: true },
    { slug: "mx5p3", href: "mx5pt-rfid-display.html", title: "MX5-P3", core: true },
    { slug: "mx5-k9-jr", href: "mx5pt-classic.html", title: "MX5-K9Jr", core: true },

    { slug: "k9-mag-2dw", href: "k9-mag-2dw.html", title: "K9-MAG-2DW", core: false },
    { slug: "k9-mag-2dw-fp", href: "k9-mag-2dw-fp.html", title: "K9-MAG-2DW-FP", core: false },
    { slug: "k9jr-2dw", href: "k9jr-2dw.html", title: "K9Jr-2DW", core: false },
    { slug: "k9jr-bt-2dw", href: "k9jr-bt-2dw.html", title: "K9Jr-BT-2DW", core: false },
    { slug: "pos-108", href: "pos-108.html", title: "POS-108", core: false },
    { slug: "pos-708", href: "pos-708.html", title: "POS-708", core: false },
    { slug: "mx5-pt", href: "mx5-pt.html", title: "MX5-PT", core: false },
    { slug: "mx5c-cbp-em", href: "mx5c-cbp-em.html", title: "MX5C-CBP-EM", core: false },
    { slug: "mx5c-cbp-em-fp", href: "mx5c-cbp-em-fp.html", title: "MX5C-CBP-EM-FP", core: false },
    { slug: "mx5c-cbp-m2", href: "mx5c-cbp-m2.html", title: "MX5C-CBP-M2", core: false },
    { slug: "mx5c-cbp-m2-fp", href: "mx5c-cbp-m2-fp.html", title: "MX5C-CBP-M2-FP", core: false },
    { slug: "mx5c-cbp-sc", href: "mx5c-cbp-sc.html", title: "MX5C-CBP-SC", core: false },
    { slug: "mx5c-cbp-sc-fp", href: "mx5c-cbp-sc-fp.html", title: "MX5C-CBP-SC-FP", core: false },
    { slug: "mx5-p3-sc", href: "mx5-p3-sc.html", title: "MX5-P3-SC", core: false },
    { slug: "mx5-p3-sc-fp", href: "mx5-p3-sc-fp.html", title: "MX5-P3-SC-FP", core: false },
    { slug: "mx5-p3-sc-m2", href: "mx5-p3-sc-m2.html", title: "MX5-P3-SC-M2", core: false },
    { slug: "mx5-p3-sc-m2-fp", href: "mx5-p3-sc-m2-fp.html", title: "MX5-P3-SC-M2-FP", core: false },
    { slug: "mx5-pc-sc-m2", href: "mx5-pc-sc-m2.html", title: "MX5-PC-SC-M2", core: false },
    { slug: "mx5-pc-sc-m2-fp", href: "mx5-pc-sc-m2-fp.html", title: "MX5-PC-SC-M2-FP", core: false },
    { slug: "mx53-cbp-cls", href: "mx53-cbp-cls.html", title: "MX53-CBP-CLS", core: false },
    { slug: "mx53-cbp-lit", href: "mx53-cbp-lit.html", title: "MX53-CBP-LIT", core: false },
    { slug: "mx53-cbp-em", href: "mx53-cbp-em.html", title: "MX53-CBP-EM", core: false },
    { slug: "mx53-cbp-em-fp", href: "mx53-cbp-em-fp.html", title: "MX53-CBP-EM-FP", core: false },
    { slug: "mx53-cbp-m2", href: "mx53-cbp-m2.html", title: "MX53-CBP-M2", core: false },
    { slug: "mx53-cbp-m2-fp", href: "mx53-cbp-m2-fp.html", title: "MX53-CBP-M2-FP", core: false }
  ];

  global.POSH_PRODUCT_LIBRARY = {
    iconMeta,
    familyOrder,
    variants,
    sequence
  };
})(window);
