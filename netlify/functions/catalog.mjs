import { getStore } from "@netlify/blobs";
import { getUser } from "@netlify/identity";
import defaultCatalog from "../../public/products.json" with { type: "json" };

const STORE_NAME = "crosswear-catalog";
const CATALOG_KEY = "catalog.json";
const ALLOWED_SIZES = new Set(["M", "L", "XL", "2XL", "3XL"]);
const IMAGE_KEY_PATTERN = /^product-images\/[a-z0-9-]+\.(png|jpg|jpeg|webp)$/;

const json = (body, status = 200) => Response.json(body, {
  status,
  headers: { "Cache-Control": "no-store" }
});

function cleanText(value, maxLength) {
  return String(value ?? "").replace(/[<>"]/g, "").trim().slice(0, maxLength);
}

function safeImagePath(value) {
  if (value === null || value === "") return null;
  if (typeof value !== "string") return undefined;
  if (/^public\/images\/[a-zA-Z0-9/_-]+\.(png|jpe?g|webp)$/i.test(value)) return value;
  try {
    const parsed = new URL(value, "https://crosswear.invalid");
    const key = parsed.searchParams.get("key");
    if (parsed.pathname === "/.netlify/functions/product-image" && key && IMAGE_KEY_PATTERN.test(key)) return value;
  } catch {}
  return undefined;
}

function cleanCatalog(input) {
  if (!input || !Array.isArray(input.products) || input.products.length > 100) {
    throw new Error("The product list is not valid.");
  }
  const ids = new Set();
  const products = input.products.map((product) => {
    const id = cleanText(product?.id, 80).toLowerCase();
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(id) || ids.has(id)) {
      throw new Error("Every design needs its own simple name.");
    }
    ids.add(id);
    if (!Array.isArray(product.variants) || product.variants.length < 1 || product.variants.length > 20) {
      throw new Error("Each design needs at least one color.");
    }
    const variants = product.variants.map((variant) => {
      const name = cleanText(variant?.name, 40);
      const hex = String(variant?.hex ?? "");
      const image = safeImagePath(variant?.image);
      if (!name || !/^#[0-9a-f]{6}$/i.test(hex) || image === undefined) {
        throw new Error("A color or photo could not be saved. Check the color names and photo.");
      }
      return {
        name,
        hex,
        image,
        alt: cleanText(variant.alt, 180)
      };
    });
    const sizes = Array.isArray(product.sizes)
      ? [...new Set(product.sizes.filter((size) => ALLOWED_SIZES.has(size)))]
      : defaultCatalog.defaultSizes;
    if (!sizes.length) throw new Error("Choose at least one size for every design.");
    const price = Number(product.price ?? input.defaultPrice ?? defaultCatalog.defaultPrice);
    if (!Number.isSafeInteger(price) || price < 1000 || price > 10000000) {
      throw new Error("Enter a valid price in RWF.");
    }
    return {
      id,
      title: cleanText(product.title, 100),
      reference: cleanText(product.reference, 100),
      category: cleanText(product.category, 40) || "Faith",
      description: cleanText(product.description, 500),
      layout: product.layout === "cover" ? "cover" : "contain",
      price,
      sizes,
      active: product.active !== false,
      isNew: Boolean(product.isNew),
      artworkPending: Boolean(product.artworkPending),
      variants
    };
  });
  if (products.some((product) => !product.title || !product.description)) {
    throw new Error("Add a name and short description for each design.");
  }
  const defaultPrice = Number(input.defaultPrice ?? defaultCatalog.defaultPrice);
  if (!Number.isSafeInteger(defaultPrice) || defaultPrice < 1000 || defaultPrice > 10000000) {
    throw new Error("Enter a valid default price in RWF.");
  }
  return {
    defaultPrice,
    defaultSizes: defaultCatalog.defaultSizes,
    products
  };
}

async function catalogFromStore() {
  const store = getStore(STORE_NAME);
  return await store.get(CATALOG_KEY, { type: "json", consistency: "strong" }) || defaultCatalog;
}

async function adminUser() {
  try {
    const user = await getUser();
    const roles = user?.roles?.length
      ? user.roles
      : user?.app_metadata?.roles || user?.appMetadata?.roles || [];
    return user && roles.includes("admin") ? user : null;
  } catch {
    return null;
  }
}

function isSameOrigin(request) {
  const origin = request.headers.get("origin");
  return Boolean(origin) && new URL(origin).origin === new URL(request.url).origin;
}

export default async (request) => {
  const url = new URL(request.url);
  const includeHidden = url.searchParams.get("admin") === "1";

  if (request.method === "GET") {
    if (includeHidden && !await adminUser()) return json({ error: "Please sign in with the store admin account." }, 401);
    const catalog = await catalogFromStore();
    return json({
      ...catalog,
      products: includeHidden ? catalog.products : catalog.products.filter((product) => product.active !== false)
    });
  }

  if (request.method !== "PUT") return json({ error: "This action is not available." }, 405);
  if (!isSameOrigin(request)) return json({ error: "Please refresh the page and try again." }, 403);
  if (!await adminUser()) return json({ error: "Your account does not have store admin access." }, 403);

  try {
    const body = await request.json();
    const catalog = cleanCatalog(body);
    await getStore(STORE_NAME).setJSON(CATALOG_KEY, catalog);
    return json(catalog);
  } catch (error) {
    return json({ error: error instanceof Error ? error.message : "The changes could not be saved." }, 400);
  }
};
