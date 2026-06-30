export const PLACEHOLDER_IMAGE = "/placeholder-product.svg";
export const DARK_PLACEHOLDER_IMAGE = "/placeholder-product-dark.svg";

export function isPlaceholderImage(
  imageUrl: string | null | undefined
): boolean {
  return imageUrl === PLACEHOLDER_IMAGE || imageUrl === DARK_PLACEHOLDER_IMAGE;
}

function getStorageRelativePath(pathname: string): string | null {
  const normalized = pathname.replace(/^\/+/, "");
  if (!normalized.startsWith("storage/")) {
    return null;
  }

  const relativePath = normalized.slice("storage/".length);
  return relativePath || null;
}

function toStorageProxyUrl(relativePath: string, search = ""): string {
  return `/api/storage/${relativePath}${search}`;
}

export function toAbsoluteStorageUrl(path: string): string {
  if (path.startsWith("http://") || path.startsWith("https://")) {
    try {
      const url = new URL(path);
      const relativePath = getStorageRelativePath(url.pathname);
      if (!relativePath) {
        return path;
      }

      return toStorageProxyUrl(relativePath, url.search);
    } catch {
      return path;
    }
  }

  if (path.startsWith("/storage/")) {
    const relativePath = getStorageRelativePath(path);
    return relativePath ? toStorageProxyUrl(relativePath) : path;
  }

  if (path.startsWith("storage/")) {
    const relativePath = getStorageRelativePath(path);
    return relativePath ? toStorageProxyUrl(relativePath) : path;
  }

  return path;
}

export function normalizeImageUrl(imageUrl: string | null | undefined): string {
  if (!imageUrl) {
    return PLACEHOLDER_IMAGE;
  }

  return toAbsoluteStorageUrl(imageUrl);
}

// The Spatie media-library conversion priority — prefer the largest rendition
// the backend generated, falling back to whatever conversion exists.
const MEDIA_CONVERSION_PRIORITY = ["extra-large", "large", "medium", "small"];

function pickConversionName(conversions: Record<string, unknown>): string | null {
  for (const name of MEDIA_CONVERSION_PRIORITY) {
    if (conversions[name]) return name;
  }

  return Object.keys(conversions)[0] || null;
}

/** Normalized fields a Spatie media resource exposes for URL building. */
export interface MediaUrlFields {
  url?: string | null;
  uuid?: string | null;
  fileName?: string | null;
  name?: string | null;
  conversions?: Record<string, unknown> | null;
}

/**
 * Build a storage URL from a Spatie media-library resource. Prefers an explicit
 * `url`, otherwise reconstructs the conversion path
 * (`storage/{uuid}/conversions/{base}-{size}.webp`) or the original file
 * (`storage/{uuid}/{file_name}`). Returns null when there's nothing to build.
 */
export function buildMediaUrl(
  fields: MediaUrlFields | null | undefined
): string | null {
  if (!fields) return null;
  const { url, uuid, fileName, name, conversions } = fields;

  if (url) return toAbsoluteStorageUrl(url);
  if (!uuid) return null;

  const conversionName = pickConversionName(conversions ?? {});
  if (conversionName) {
    const baseName =
      fileName?.replace(/\.[^/.]+$/, "") || name?.replace(/-v\d+$/, "");
    if (!baseName) return null;
    return toAbsoluteStorageUrl(
      `storage/${uuid}/conversions/${baseName}-${conversionName}.webp`
    );
  }

  return fileName ? toAbsoluteStorageUrl(`storage/${uuid}/${fileName}`) : null;
}
