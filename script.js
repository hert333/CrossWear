// WhatsApp destination supplied for CrossWear. Keep country code and digits only.
const WHATSAPP_NUMBER = "250726545064";
const PRICE = 15000;
const SIZES = ["M", "L", "XL", "2XL", "3XL"];
const COLOR_HEX = {
  Black: "#151515", White: "#fffdf8", "Navy Blue": "#172c50", Beige: "#d8c09c",
  "Olive Green": "#59653b", Gray: "#a8a8a6", "Sky Blue": "#78bfe9", "Light Blue": "#8ebce3",
  Pink: "#e88eae", Burgundy: "#791d2f", Purple: "#64247c", Charcoal: "#3c3e40",
  "Tiffany Blue": "#67d2cc", Maroon: "#712331", Sand: "#ddc7a1", "Forest Green": "#0d493b"
};

const PRODUCTS = [
  {
    id: "jesus-way-truth-life",
    title: "Jesus — The Way, the Truth & the Life",
    reference: "John 14:6",
    category: "Scripture",
    description: "A front-and-back design centered on the words of John 14:6.",
    layout: "contain",
    variants: [
      { name: "Black", hex: "#151515", image: "public/images/products/black/jesus-both.png", alt: "Black T-shirt shown from the front and back" },
      { name: "White", hex: "#fffdf8", image: "public/images/products/white/jesus-both.png", alt: "White T-shirt shown from the front and back" }
    ]
  },
  {
    id: "know-jesus-know-peace",
    title: "Know Jesus, Know Peace",
    reference: "A message of faith",
    category: "Faith",
    description: "A bold back print built around the message “Know Jesus, Know Peace.”",
    layout: "contain",
    variants: [{ name: "Black", hex: "#151515", image: "public/images/products/black/know-jesus.png", alt: "Black T-shirt with Know Jesus, Know Peace print on the back" }]
  },
  {
    id: "redeemed",
    title: "Redeemed",
    reference: "Ephesians 1:7",
    category: "Scripture",
    description: "A vertical graphic design featuring the word “Redeemed” and Ephesians 1:7.",
    layout: "contain",
    variants: [{ name: "Black", hex: "#151515", image: "public/images/products/black/redeemed.png", alt: "Black Redeemed T-shirt mockup" }]
  },
  {
    id: "not-ashamed-romans-1-16",
    title: "Not Ashamed",
    reference: "Romans 1:16",
    category: "Scripture",
    description: "A front-and-back design inspired by Romans 1:16.",
    layout: "contain",
    variants: [{ name: "Black", hex: "#151515", image: "public/images/products/black/romans-both.png", alt: "Black Romans 1:16 T-shirt shown from the front and back" }]
  },
  {
    id: "saved-by-grace-alone",
    title: "Saved by Grace Alone",
    reference: "Grace alone",
    category: "Faith",
    description: "A compact chest design with “Saved” framed beside “Grace Alone.”",
    layout: "cover",
    variants: [
      { name: "Black", hex: "#151515", image: "public/images/products/black/saved-by-grace-alone.png", alt: "Black Saved by Grace Alone T-shirt mockup" },
      { name: "Forest Green", hex: "#0d493b", image: "public/images/products/lifestyle/saved-by-grace-alone-forest-green.jpeg", alt: "Forest green Saved by Grace Alone T-shirt worn by a model" }
    ]
  },
  {
    id: "the-way",
    title: "The Way",
    reference: "John 14:6",
    category: "Scripture",
    description: "A lettering design based on John 14:6.",
    layout: "contain",
    artworkPending: true,
    variants: [{ name: "Black", hex: "#151515", image: "public/images/products/black/the-way.png", alt: "Black The Way T-shirt mockup; the current artwork has a word that will be corrected" }]
  },
  {
    id: "child-of-god",
    title: "Child of God",
    reference: "Identity in God",
    category: "Identity",
    description: "A clean typographic design with “Child” above “Of God.”",
    layout: "contain",
    variants: [
      { name: "White", hex: "#fffdf8", image: "public/images/products/white/child-of-god.png", alt: "White Child of God T-shirt mockup" },
      { name: "Pink", hex: "#e88eae", image: "public/images/products/lifestyle/child-of-god-pink.jpeg", alt: "Pink Child of God T-shirt worn by a model" }
    ]
  },
  {
    id: "faith-ephesians-2-8",
    title: "Faith",
    reference: "Ephesians 2:8",
    category: "Scripture",
    description: "A large-scale “Faith” design with the Ephesians 2:8 message alongside it.",
    layout: "contain",
    variants: [
      { name: "White", hex: "#fffdf8", image: "public/images/products/white/faith.png", alt: "White Faith Ephesians 2:8 T-shirt mockup" },
      { name: "Gray", hex: "#a8a8a6", image: "public/images/products/lifestyle/faith-ephesians-2-8-gray.jpeg", alt: "Gray Faith T-shirt worn by a model" }
    ]
  },
  {
    id: "god-gives-eternal-life",
    title: "God Gives Eternal Life",
    reference: "The gift of life",
    category: "Faith",
    description: "A small chest print reading “God gives eternal life.”",
    layout: "contain",
    variants: [{ name: "White", hex: "#fffdf8", image: "public/images/products/white/god-both.png", alt: "White God Gives Eternal Life T-shirt, front and back mockup" }]
  },
  {
    id: "follow-jesus",
    title: "Follow Jesus",
    reference: "The Way · The Truth · The Life",
    category: "Faith",
    description: "A front graphic built around “Follow Jesus” and the words “The Way, the Truth, the Life.”",
    layout: "contain",
    variants: [{ name: "White", hex: "#fffdf8", image: "public/images/products/white/jesus-truth-way-life.png", alt: "White Follow Jesus T-shirt mockup" }]
  },
  {
    id: "jesus-is-king",
    title: "Jesus Is King",
    reference: "Jesus is King",
    category: "Faith",
    description: "A straightforward chest design with a cross worked into the lettering.",
    layout: "cover",
    isNew: true,
    variants: [{ name: "Beige", hex: "#d8c09c", image: "public/images/products/lifestyle/jesus-is-king-beige.jpeg", alt: "Beige Jesus Is King T-shirt worn by a model" }]
  },
  {
    id: "unashamed-follower-of-jesus",
    title: "Unashamed — Follower of Jesus",
    reference: "A statement of faith",
    category: "Identity",
    description: "A pink T-shirt with “Unashamed — Follower of Jesus” across the chest and a cross scene near the hem.",
    layout: "cover",
    isNew: true,
    variants: [{ name: "Pink", hex: "#e88eae", image: "public/images/products/lifestyle/unashamed-follower-of-jesus-pink.jpeg", alt: "Pink Unashamed Follower of Jesus T-shirt worn by a model" }]
  },
  {
    id: "gospel-is-urgent",
    title: "The Gospel Is Urgent",
    reference: "John 3:18",
    category: "Scripture",
    description: "The supplied mockup shows a back print with the John 3:18 passage and “The Gospel Is Urgent.”",
    layout: "cover",
    isNew: true,
    variants: [{ name: "Beige", hex: "#d8c09c", image: "public/images/products/lifestyle/gospel-is-urgent-beige-back.jpeg", alt: "Back view of a beige Gospel Is Urgent T-shirt mockup" }]
  }
];

// Every color shown in the supplied charts is orderable. Individual mockups can be added later;
// until then the current design image remains a clearly labeled reference preview.
const CHART_COLORS = {
  "jesus-way-truth-life": ["White", "Black", "Beige", "Navy Blue", "Sky Blue", "Olive Green", "Gray", "Pink", "Charcoal"],
  "know-jesus-know-peace": ["Black", "White", "Navy Blue", "Beige", "Olive Green", "Gray", "Sky Blue", "Pink", "Burgundy", "Purple", "Charcoal", "Tiffany Blue"],
  redeemed: ["Black", "White", "Navy Blue", "Beige", "Light Blue", "Olive Green", "Gray", "Charcoal", "Maroon", "Sand", "Purple", "Forest Green"],
  "saved-by-grace-alone": ["Black", "White", "Navy Blue", "Beige", "Olive Green", "Gray", "Sky Blue", "Pink", "Burgundy", "Purple", "Charcoal", "Tiffany Blue"],
  "child-of-god": ["White", "Black", "Beige", "Light Blue", "Olive Green"],
  "faith-ephesians-2-8": ["White", "Black", "Beige", "Light Blue", "Olive Green"]
};
const EXTRA_COLORS = {
  "not-ashamed-romans-1-16": ["White"],
  "god-gives-eternal-life": ["Black"]
};
for (const product of PRODUCTS) {
  const pictured = new Map(product.variants.map((variant) => [variant.name.toLowerCase(), variant]));
  const names = [...(CHART_COLORS[product.id] || []), ...(EXTRA_COLORS[product.id] || [])];
  product.variants = [...new Set([...product.variants.map((variant) => variant.name), ...names])].map((name) =>
    pictured.get(name.toLowerCase()) || { name, hex: COLOR_HEX[name] || "#ccc", image: null, alt: "" }
  );
}

const grid = document.querySelector("#product-grid");
const search = document.querySelector("#product-search");
const resultsLabel = document.querySelector("#results-label");
const emptyState = document.querySelector("#empty-state");
const productDialog = document.querySelector("#product-dialog");
const dialogContent = document.querySelector("#dialog-content");
const bagDialog = document.querySelector("#bag-dialog");
const themeToggle = document.querySelector("#theme-toggle");
const bag = [];
let activeFilter = "all";
let selectedProduct = null;
let selectedVariantIndex = 0;
let selectedSize = "M";
let selectedQuantity = 1;
let toastTimer;

function applyTheme(theme, persist = true) {
  const isDark = theme === "dark";
  document.documentElement.dataset.theme = isDark ? "dark" : "light";
  themeToggle.setAttribute("aria-pressed", String(isDark));
  themeToggle.setAttribute("aria-label", `Switch to ${isDark ? "light" : "dark"} theme`);
  themeToggle.querySelector("span").textContent = isDark ? "Light" : "Dark";
  themeToggle.querySelector("svg").innerHTML = isDark
    ? '<circle cx="12" cy="12" r="4"></circle><path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42"></path>'
    : '<path d="M20.2 15.3A8.6 8.6 0 0 1 8.7 3.8 8.8 8.8 0 1 0 20.2 15.3Z"></path>';
  document.querySelector('meta[name="theme-color"]').content = isDark ? "#111213" : "#f6f2eb";
  if (persist) {
    try { localStorage.setItem("crosswear-theme", isDark ? "dark" : "light"); } catch {}
  }
}

themeToggle.addEventListener("click", () => {
  applyTheme(document.documentElement.dataset.theme === "dark" ? "light" : "dark");
});
applyTheme(document.documentElement.dataset.theme === "dark" ? "dark" : "light", false);

const formatPrice = (amount) => `${amount.toLocaleString("en-US")} RWF`;
const firstVariant = (product) => product.variants[0];
const whatsAppLink = (message) => `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

function renderProducts() {
  const term = search.value.trim().toLowerCase();
  const visible = PRODUCTS.filter((product) => {
    const matchesFilter = activeFilter === "all" || product.category === activeFilter;
    const searchable = `${product.title} ${product.reference} ${product.category} ${product.description}`.toLowerCase();
    return matchesFilter && (!term || searchable.includes(term));
  });

  resultsLabel.textContent = `${visible.length} ${visible.length === 1 ? "design" : "designs"}`;
  emptyState.hidden = visible.length !== 0;
  grid.innerHTML = visible.map((product) => {
    const variant = firstVariant(product);
    const previewImage = variant.image || product.variants.find((item) => item.image)?.image;
    const tag = product.artworkPending ? "Artwork update" : product.isNew ? "New design" : "";
    const swatches = product.variants.map((item, index) => `
      <button class="variant-swatch" type="button" data-card-variant="${index}" title="${item.name}" aria-label="Show ${item.name}" aria-pressed="${index === 0}" style="background:${item.hex}"></button>
    `).join("");
    return `
      <article class="product-card" data-id="${product.id}" data-layout="${product.layout}">
        <button class="product-image-wrap" type="button" data-open-product="${product.id}" aria-label="View ${product.title}">
          ${tag ? `<span class="product-tag">${tag}</span>` : ""}
          <img class="product-image" src="${previewImage}" alt="${variant.alt || `Current ${product.title} mockup; color previews are being added`}" loading="lazy">
          <span class="quick-view" aria-hidden="true">↗</span>
        </button>
        <div class="product-meta">
          <div><h3 class="product-title">${product.title}</h3><p class="product-reference">${product.reference}</p></div>
          <p class="product-price">${formatPrice(PRICE)}</p>
        </div>
        <div class="variant-row" aria-label="Available colors">${swatches}<span class="variant-label">${product.variants.length === 1 ? variant.name : `${product.variants.length} colors available`}</span></div>
      </article>
    `;
  }).join("");
}

function openProduct(id, variantIndex = 0) {
  const product = PRODUCTS.find((item) => item.id === id);
  if (!product) return;
  selectedProduct = product;
  selectedVariantIndex = Math.min(variantIndex, product.variants.length - 1);
  selectedSize = "M";
  selectedQuantity = 1;
  renderProductDialog();
  productDialog.showModal();
}

function renderProductDialog() {
  const product = selectedProduct;
  const variant = product.variants[selectedVariantIndex];
  const photoVariant = variant.image ? variant : product.variants.find((item) => item.image) || firstVariant(product);
  const colorOptions = product.variants.map((item, index) => `
    <button class="dialog-color ${index === selectedVariantIndex ? "is-selected" : ""}" type="button" data-dialog-variant="${index}" aria-pressed="${index === selectedVariantIndex}">${item.name}</button>
  `).join("");
  const sizeOptions = SIZES.map((size) => `<option value="${size}" ${size === selectedSize ? "selected" : ""}>${size}</option>`).join("");
  const artworkNotice = product.artworkPending
    ? `<p class="artwork-note">This design is being corrected from “Light” to “Life.” It will be available after the updated artwork is added.</p>`
    : "";
  const previewNotice = variant.image ? "" : `<p class="preview-note">${variant.name} is available. A matching product photo will be added later; the current image is a design reference.</p>`;
  const addLabel = product.artworkPending ? "Artwork update pending" : "Add to my bag";
  const sizingMessage = `Hello CrossWear, I need help choosing a size for ${product.title} (${variant.name}).`;

  dialogContent.innerHTML = `
    <div class="dialog-image-panel" data-layout="${product.layout}"><img src="${photoVariant.image}" alt="${variant.alt || `Current ${photoVariant.name} mockup; selected color is ${variant.name}`}"></div>
    <div class="dialog-copy">
      <p class="eyebrow">CROSSWEAR / ${product.category.toUpperCase()}</p>
      <h2 id="dialog-title">${product.title}</h2>
      <p class="dialog-reference">${product.reference}</p>
      <p class="dialog-price">${formatPrice(PRICE)}</p>
      <p class="dialog-description">${product.description}</p>
      ${artworkNotice}${previewNotice}
      <span class="form-label">Color · <span id="selected-color-name">${variant.name}</span></span>
      <div class="dialog-swatches">${colorOptions}</div>
      <div class="dialog-options">
        <label><span class="form-label">Size</span><select id="size-select" aria-label="Choose a size">${sizeOptions}</select></label>
        <label><span class="form-label">Qty</span><select id="quantity-select" aria-label="Choose quantity">${[1, 2, 3, 4, 5].map((qty) => `<option value="${qty}" ${qty === selectedQuantity ? "selected" : ""}>${qty}</option>`).join("")}</select></label>
      </div>
      <details class="size-help"><summary>Need help choosing a size?</summary><p>Sizes M–3XL are available. Exact garment measurements can be added later. Message us if you’d like fit help.</p><a class="size-question-link" href="${whatsAppLink(sizingMessage)}" target="_blank" rel="noopener noreferrer">Ask about this design in WhatsApp <span aria-hidden="true">↗</span></a></details>
      <button class="button button-dark dialog-add" type="button" id="add-to-bag" ${product.artworkPending ? "disabled" : ""}>${addLabel}<span aria-hidden="true">↗</span></button>
      <p class="dialog-footnote">Sizes M–3XL. Kigali delivery costs extra; we’ll confirm the fee before ordering.</p>
    </div>
  `;
}

function updateBagCount() {
  const count = bag.reduce((total, item) => total + item.quantity, 0);
  document.querySelector("#bag-count").textContent = count;
  document.querySelector("#bag-count").setAttribute("aria-label", `${count} ${count === 1 ? "item" : "items"}`);
  document.querySelector("#bag-title-count").textContent = count ? `(${count})` : "";
}

function renderBag() {
  const bagItems = document.querySelector("#bag-items");
  const empty = document.querySelector("#bag-empty");
  const summary = document.querySelector("#bag-summary");
  empty.hidden = bag.length > 0;
  summary.hidden = bag.length === 0;
  bagItems.innerHTML = bag.map((item, index) => `
    <article class="bag-line">
      <img src="${item.variant.image || item.product.variants.find((variant) => variant.image)?.image || firstVariant(item.product).image}" alt="${item.variant.alt || `Current mockup; selected color is ${item.variant.name}`}">
      <div><h3 class="bag-line-title">${item.product.title}</h3><p class="bag-line-detail">${item.variant.name} · Size ${item.size} · Qty ${item.quantity}</p><button class="remove-item" type="button" data-remove-item="${index}">Remove</button></div>
      <p class="bag-line-price">${formatPrice(PRICE * item.quantity)}</p>
    </article>
  `).join("");
  const subtotal = bag.reduce((total, item) => total + PRICE * item.quantity, 0);
  document.querySelector("#bag-subtotal").textContent = formatPrice(subtotal);
  updateBagCount();
}

function showToast(message) {
  const toast = document.querySelector("#toast");
  toast.textContent = message;
  toast.classList.add("is-visible");
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toast.classList.remove("is-visible"), 2200);
}

grid.addEventListener("click", (event) => {
  const swatch = event.target.closest("[data-card-variant]");
  if (swatch) {
    const card = swatch.closest(".product-card");
    const product = PRODUCTS.find((item) => item.id === card.dataset.id);
    const index = Number(swatch.dataset.cardVariant);
    const variant = product.variants[index];
    const preview = variant.image ? variant : product.variants.find((item) => item.image) || firstVariant(product);
    const image = card.querySelector(".product-image");
    image.src = preview.image;
    image.alt = variant.alt || `Current ${preview.name} mockup; selected color is ${variant.name}`;
    card.dataset.selectedVariant = index;
    card.querySelectorAll(".variant-swatch").forEach((button) => button.setAttribute("aria-pressed", String(button === swatch)));
    card.querySelector(".variant-label").textContent = product.variants.length === 1 ? variant.name : `${variant.name} · ${product.variants.length} colors`;
    return;
  }
  const opener = event.target.closest("[data-open-product]");
  if (opener) {
    const card = opener.closest(".product-card");
    openProduct(opener.dataset.openProduct, Number(card.dataset.selectedVariant || 0));
  }
});

dialogContent.addEventListener("click", (event) => {
  const colorButton = event.target.closest("[data-dialog-variant]");
  if (colorButton) {
    selectedSize = document.querySelector("#size-select").value;
    selectedQuantity = Number(document.querySelector("#quantity-select").value);
    selectedVariantIndex = Number(colorButton.dataset.dialogVariant);
    renderProductDialog();
    return;
  }
  if (event.target.closest("#add-to-bag") && selectedProduct && !selectedProduct.artworkPending) {
    selectedSize = document.querySelector("#size-select").value;
    selectedQuantity = Number(document.querySelector("#quantity-select").value);
    const size = selectedSize;
    const quantity = selectedQuantity;
    bag.push({ product: selectedProduct, variant: selectedProduct.variants[selectedVariantIndex], size, quantity });
    renderBag();
    productDialog.close();
    showToast(`${selectedProduct.title} added to your bag`);
  }
});

document.querySelector("#open-bag").addEventListener("click", () => {
  renderBag();
  bagDialog.showModal();
});

document.querySelectorAll("[data-close-dialog]").forEach((button) => {
  button.addEventListener("click", () => button.closest("dialog").close());
});

document.querySelectorAll("dialog").forEach((dialog) => {
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });
});

document.querySelector("#bag-items").addEventListener("click", (event) => {
  const removeButton = event.target.closest("[data-remove-item]");
  if (!removeButton) return;
  bag.splice(Number(removeButton.dataset.removeItem), 1);
  renderBag();
});

document.querySelectorAll(".filter-chip").forEach((button) => {
  button.addEventListener("click", () => {
    activeFilter = button.dataset.filter;
    document.querySelectorAll(".filter-chip").forEach((chip) => {
      const isActive = chip === button;
      chip.classList.toggle("is-active", isActive);
      chip.setAttribute("aria-pressed", String(isActive));
    });
    renderProducts();
  });
});

search.addEventListener("input", renderProducts);
document.querySelector("#clear-search").addEventListener("click", () => {
  search.value = "";
  activeFilter = "all";
  document.querySelectorAll(".filter-chip").forEach((chip) => {
    const isActive = chip.dataset.filter === "all";
    chip.classList.toggle("is-active", isActive);
    chip.setAttribute("aria-pressed", String(isActive));
  });
  renderProducts();
});

document.querySelector("#checkout-button").addEventListener("click", () => {
  if (!WHATSAPP_NUMBER || bag.length === 0) return;
  const lines = bag.map((item) => `• ${item.product.title} — ${item.variant.name}, size ${item.size}, qty ${item.quantity}: ${formatPrice(PRICE * item.quantity)}`);
  const subtotal = bag.reduce((total, item) => total + PRICE * item.quantity, 0);
  const message = `Hello CrossWear! I would like to order:\n${lines.join("\n")}\nSubtotal: ${formatPrice(subtotal)}\n\nName:\nPhone:\nKigali area/address:\n\nPlease confirm the delivery fee.`;
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
});

document.querySelector("#year").textContent = new Date().getFullYear();
document.querySelectorAll(".size-question-link").forEach((link) => {
  if (link.closest(".dialog-copy")) return;
  link.href = whatsAppLink("Hello CrossWear, I need help choosing a T-shirt size.");
});
renderProducts();
updateBagCount();
