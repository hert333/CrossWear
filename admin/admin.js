const COLOR_HEX = {
  Black: "#151515", White: "#fffdf8", "Navy Blue": "#172c50", Beige: "#d8c09c",
  "Olive Green": "#59653b", Gray: "#a8a8a6", "Sky Blue": "#78bfe9", "Light Blue": "#8ebce3",
  Pink: "#e88eae", Burgundy: "#791d2f", Purple: "#64247c", Charcoal: "#3c3e40",
  "Tiffany Blue": "#67d2cc", Maroon: "#712331", Sand: "#ddc7a1", "Forest Green": "#0d493b"
};

const loginCard = document.querySelector("#login-card");
const dashboard = document.querySelector("#admin-dashboard");
const loginMessage = document.querySelector("#login-message");
const statusLine = document.querySelector("#admin-status");
const productList = document.querySelector("#admin-product-list");
const form = document.querySelector("#product-form");
const photoPreview = document.querySelector("#current-photo");
const photoPreviewImage = document.querySelector("#current-photo-image");
let catalog = null;
let currentUser = null;

function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>\"']/g, function (character) {
    return { "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;", "'": "&#39;" }[character];
  });
}

function setStatus(message, kind) {
  statusLine.textContent = message || "";
  statusLine.dataset.kind = kind || "";
}

function getRoleList(user) {
  return user?.roles?.length ? user.roles : user?.app_metadata?.roles || [];
}

function authHeaders() {
  const token = currentUser?.token?.access_token;
  return token ? { Authorization: "Bearer " + token } : {};
}

function showSignedOut(message) {
  currentUser = null;
  loginCard.hidden = false;
  dashboard.hidden = true;
  loginMessage.textContent = message || "Use the private admin invitation for your Netlify site.";
}

async function showAdmin(user) {
  currentUser = user || null;
  if (!currentUser) {
    showSignedOut();
    return;
  }
  if (!getRoleList(currentUser).includes("admin")) {
    showSignedOut("This account is not enabled as a store admin yet. Ask the Netlify site owner to assign the admin role.");
    return;
  }
  loginCard.hidden = true;
  dashboard.hidden = false;
  setStatus("Loading your designs…");
  try {
    const response = await fetch("/.netlify/functions/catalog?admin=1", {
      headers: authHeaders(),
      cache: "no-store"
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.error || "The catalog could not be opened.");
    catalog = result;
    renderProductList();
    setStatus("Changes are saved to your live store when you press Save design.");
  } catch (error) {
    setStatus(error.message || "The admin service is not ready on this deployment.", "error");
  }
}

function mainImage(product) {
  return product.variants.find(function (variant) { return variant.image; })?.image || "../public/images/brand/logo-red.png";
}

function renderProductList() {
  if (!catalog || !catalog.products.length) {
    productList.innerHTML = '<p class="admin-empty">No designs yet. Use “Add a design” to create your first listing.</p>';
    return;
  }
  productList.innerHTML = catalog.products.map(function (product) {
    const visibility = product.active === false ? "Hidden" : "Shown in shop";
    const toggleText = product.active === false ? "Show" : "Hide";
    return '<article class="admin-product-row" data-product-row="' + escapeHtml(product.id) + '">' +
      '<img src="' + escapeHtml(mainImage(product)) + '" alt="">' +
      '<div class="admin-product-row-copy"><h4>' + escapeHtml(product.title) + '</h4>' +
      '<p>' + visibility + ' · ' + escapeHtml(product.variants.map(function (variant) { return variant.name; }).join(", ")) + '</p>' +
      '<div class="admin-product-row-actions"><button type="button" data-edit="' + escapeHtml(product.id) + '">Edit</button>' +
      '<button type="button" data-toggle="' + escapeHtml(product.id) + '">' + toggleText + '</button></div></div></article>';
  }).join("");
}

function clearForm() {
  form.reset();
  form.elements.namedItem("productId").value = "";
  form.elements.namedItem("category").value = "Faith";
  form.elements.namedItem("layout").value = "contain";
  form.elements.namedItem("active").checked = true;
  photoPreview.hidden = true;
  photoPreviewImage.removeAttribute("src");
  document.querySelector("#editor-title").textContent = "Add a T-shirt";
  document.querySelector("#save-product-button").textContent = "Save design";
  setStatus("");
}

function editProduct(product) {
  clearForm();
  form.elements.namedItem("productId").value = product.id;
  form.elements.namedItem("title").value = product.title;
  form.elements.namedItem("reference").value = product.reference;
  form.elements.namedItem("category").value = product.category;
  form.elements.namedItem("description").value = product.description;
  form.elements.namedItem("colors").value = product.variants.map(function (variant) { return variant.name; }).join(", ");
  form.elements.namedItem("layout").value = product.layout || "contain";
  form.elements.namedItem("isNew").checked = Boolean(product.isNew);
  form.elements.namedItem("artworkPending").checked = Boolean(product.artworkPending);
  form.elements.namedItem("active").checked = product.active !== false;
  const image = mainImage(product);
  if (image) {
    photoPreviewImage.src = image;
    photoPreview.hidden = false;
  }
  document.querySelector("#editor-title").textContent = "Edit this design";
  document.querySelector("#save-product-button").textContent = "Save changes";
  document.querySelector("#product-form").scrollIntoView({ behavior: "smooth", block: "start" });
}

function slugify(value) {
  return value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 72) || "new-design";
}

function colorHex(name, fallback) {
  const match = Object.keys(COLOR_HEX).find(function (color) {
    return color.toLowerCase() === name.toLowerCase();
  });
  return match ? COLOR_HEX[match] : fallback || "#8a8a8a";
}

async function uploadPhoto(file) {
  const body = new FormData();
  body.append("photo", file);
  const response = await fetch("/.netlify/functions/product-image", {
    method: "POST",
    headers: authHeaders(),
    body: body
  });
  const result = await response.json();
  if (!response.ok) throw new Error(result.error || "The photo could not be uploaded.");
  return result.url;
}

async function saveCatalog() {
  const response = await fetch("/.netlify/functions/catalog", {
    method: "PUT",
    headers: Object.assign({ "Content-Type": "application/json" }, authHeaders()),
    body: JSON.stringify(catalog)
  });
  const result = await response.json();
  if (!response.ok) throw new Error(result.error || "The design could not be saved.");
  catalog = result;
  renderProductList();
}

document.querySelector("#login-button").addEventListener("click", function () {
  if (window.netlifyIdentity) window.netlifyIdentity.open("login");
  else loginMessage.textContent = "The secure sign-in service is not enabled on this site yet.";
});

document.querySelector("#signout-button").addEventListener("click", function () {
  if (window.netlifyIdentity) window.netlifyIdentity.logout();
});

document.querySelector("#new-product-button").addEventListener("click", function () {
  clearForm();
  document.querySelector("#editor-title").scrollIntoView({ behavior: "smooth", block: "start" });
});

document.querySelector("#cancel-edit-button").addEventListener("click", clearForm);

productList.addEventListener("click", async function (event) {
  const editButton = event.target.closest("[data-edit]");
  const toggleButton = event.target.closest("[data-toggle]");
  if (editButton) {
    const product = catalog.products.find(function (item) { return item.id === editButton.dataset.edit; });
    if (product) editProduct(product);
  }
  if (toggleButton) {
    const product = catalog.products.find(function (item) { return item.id === toggleButton.dataset.toggle; });
    if (!product) return;
    product.active = product.active === false;
    setStatus("Saving visibility…");
    try {
      await saveCatalog();
      setStatus(product.active ? "Design is now shown in the shop." : "Design is now hidden from the shop.", "success");
    } catch (error) {
      product.active = !product.active;
      renderProductList();
      setStatus(error.message, "error");
    }
  }
});

form.addEventListener("submit", async function (event) {
  event.preventDefault();
  if (!catalog) return setStatus("The admin service is not ready yet.", "error");
  const productId = form.elements.namedItem("productId").value;
  const existing = catalog.products.find(function (product) { return product.id === productId; });
  const title = form.elements.namedItem("title").value.trim();
  const colorNames = [...new Set(form.elements.namedItem("colors").value.split(",").map(function (name) { return name.trim(); }).filter(Boolean))];
  const photoFile = form.elements.namedItem("photo").files[0];
  if (!colorNames.length) return setStatus("Enter at least one available color.", "error");
  if (!existing && !photoFile) return setStatus("Choose a main T-shirt photo for this new design.", "error");

  const saveButton = document.querySelector("#save-product-button");
  saveButton.disabled = true;
  setStatus(photoFile ? "Uploading photo and saving your design…" : "Saving your design…");
  try {
    let uploadedImage = "";
    if (photoFile) uploadedImage = await uploadPhoto(photoFile);
    const id = existing ? existing.id : slugify(title);
    if (!existing && catalog.products.some(function (product) { return product.id === id; })) {
      throw new Error("A design with a similar name already exists. Add another word to its name.");
    }
    const oldVariants = new Map((existing?.variants || []).map(function (variant) { return [variant.name.toLowerCase(), variant]; }));
    const variants = colorNames.map(function (name, index) {
      const old = oldVariants.get(name.toLowerCase());
      return {
        name: name,
        hex: colorHex(name, old?.hex),
        image: index === 0 && uploadedImage ? uploadedImage : old?.image || null,
        alt: old?.alt || (index === 0 ? name + " " + title + " T-shirt mockup" : "")
      };
    });
    if (!variants.some(function (variant) { return variant.image; })) {
      throw new Error("Add a main T-shirt photo before saving.");
    }
    const product = {
      id: id,
      title: title,
      reference: form.elements.namedItem("reference").value.trim(),
      category: form.elements.namedItem("category").value.trim() || "Faith",
      description: form.elements.namedItem("description").value.trim(),
      layout: form.elements.namedItem("layout").value,
      active: form.elements.namedItem("active").checked,
      isNew: form.elements.namedItem("isNew").checked,
      artworkPending: form.elements.namedItem("artworkPending").checked,
      price: existing?.price || catalog.defaultPrice || 15000,
      sizes: existing?.sizes || catalog.defaultSizes || ["M", "L", "XL", "2XL", "3XL"],
      variants: variants
    };
    if (existing) {
      catalog.products = catalog.products.map(function (item) { return item.id === existing.id ? product : item; });
    } else {
      catalog.products.unshift(product);
    }
    await saveCatalog();
    clearForm();
    setStatus("Saved. The live shop will show this update shortly.", "success");
  } catch (error) {
    setStatus(error.message || "The design could not be saved.", "error");
  } finally {
    saveButton.disabled = false;
  }
});

const photoInput = form.elements.namedItem("photo");
photoInput.addEventListener("change", function () {
  const file = photoInput.files[0];
  if (!file) return;
  if (file.size > 8 * 1024 * 1024) {
    photoInput.value = "";
    setStatus("Choose a photo smaller than 8 MB.", "error");
    return;
  }
  photoPreviewImage.src = URL.createObjectURL(file);
  photoPreview.hidden = false;
});

if (window.netlifyIdentity) {
  window.netlifyIdentity.on("init", showAdmin);
  window.netlifyIdentity.on("login", function (user) {
    window.netlifyIdentity.close();
    showAdmin(user);
  });
  window.netlifyIdentity.on("logout", function () { showSignedOut(); });
  window.netlifyIdentity.init();
} else {
  showSignedOut("The secure sign-in service is not enabled on this site yet.");
}
