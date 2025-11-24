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
