/**
 * Flattens an arbitrary rich-text value (string, number, array, or a
 * `{ text }` / `{ content }` node tree) into a plain string.
 */
export function stringifyRichText(value: unknown): string {
  if (typeof value === "string") {
    const trimmed = value.trim();

    if (trimmed.startsWith("{")) {
      try {
        const parsed: unknown = JSON.parse(trimmed);
        return stringifyRichText(parsed);
      } catch {
        return value;
      }
    }

    return value;
  }
  if (typeof value === "number" || typeof value === "boolean") return String(value);
  if (Array.isArray(value)) {
    return value.map(stringifyRichText).filter(Boolean).join(" ");
  }

  if (value && typeof value === "object") {
    const record = value as Record<string, unknown>;

    if (typeof record.text === "string") return record.text;
    if (Array.isArray(record.content)) return stringifyRichText(record.content);
  }

  return "";
}

/** Flattens rich text, strips HTML tags, and truncates to `maxLength`. */
export function stripHtml(text: unknown, maxLength: number): string {
  const value = stringifyRichText(text);
  return value ? value.replace(/<[^>]*>/g, "").substring(0, maxLength) : "";
}
