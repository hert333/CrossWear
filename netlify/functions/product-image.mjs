import { getStore } from "@netlify/blobs";
import { getUser } from "@netlify/identity";

const STORE_NAME = "crosswear-catalog";
const IMAGE_KEY_PATTERN = /^product-images\/[a-z0-9-]+\.(png|jpg|jpeg|webp)$/;
const MAX_IMAGE_BYTES = 8 * 1024 * 1024;
const TYPES = new Map([
  ["image/png", "png"],
  ["image/jpeg", "jpg"],
  ["image/webp", "webp"]
]);

const json = (body, status = 200) => Response.json(body, {
  status,
  headers: { "Cache-Control": "no-store" }
});

async function adminUser() {
  try {
    const user = await getUser();
    const roles = user?.roles?.length
      ? user.roles
      : user?.app_metadata?.roles || user?.appMetadata?.roles || [];
    return Boolean(user && roles.includes("admin"));
  } catch {
    return false;
  }
}

function isSameOrigin(request) {
  const origin = request.headers.get("origin");
  return Boolean(origin) && new URL(origin).origin === new URL(request.url).origin;
}

export default async (request) => {
  const url = new URL(request.url);

  if (request.method === "GET") {
    const key = url.searchParams.get("key") || "";
    if (!IMAGE_KEY_PATTERN.test(key)) return json({ error: "Photo not found." }, 404);
    const image = await getStore(STORE_NAME).getWithMetadata(key, { type: "blob", consistency: "strong" });
    if (!image) return json({ error: "Photo not found." }, 404);
    return new Response(image.data, {
      headers: {
        "Content-Type": image.metadata?.contentType || "application/octet-stream",
        "Cache-Control": "public, max-age=31536000, immutable",
        "X-Content-Type-Options": "nosniff"
      }
    });
  }

  if (request.method !== "POST") return json({ error: "This action is not available." }, 405);
  if (!isSameOrigin(request)) return json({ error: "Please refresh the page and try again." }, 403);
  if (!await adminUser()) return json({ error: "Your account does not have store admin access." }, 403);

  try {
    const form = await request.formData();
    const file = form.get("photo");
    const extension = TYPES.get(file?.type);
    if (!extension || file.size < 1 || file.size > MAX_IMAGE_BYTES) {
      return json({ error: "Choose a PNG, JPG, or WebP photo under 8 MB." }, 400);
    }
    const key = "product-images/" + crypto.randomUUID() + "." + extension;
    await getStore(STORE_NAME).set(key, file, {
      metadata: { contentType: file.type }
    });
    return json({
      url: "/.netlify/functions/product-image?key=" + encodeURIComponent(key)
    });
  } catch (error) {
    return json({ error: error instanceof Error ? error.message : "The photo could not be uploaded." }, 400);
  }
};
