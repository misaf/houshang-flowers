export function createReadableResourcePath(
  id: string | number,
  slug?: string | null
): string {
  return slug ? `${id}-${slug}` : String(id);
}

export function getLeadingResourceId(value: string): string | null {
  const normalizedValue = decodeURIComponent(value).trim();
  const match = normalizedValue.match(/^(\d+)(?:-|$)/);

  return match?.[1] ?? null;
}
