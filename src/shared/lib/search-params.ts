/** Returns the first value of a Next.js search param (which may be an array). */
export function readFirst(
  value: string | string[] | undefined
): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

/** Trims a search param into a query string, normalizing empty input to "". */
export function normalizeSearch(value: string | undefined): string {
  return value?.trim() || "";
}
