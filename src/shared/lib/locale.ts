export const RTL_LOCALES = ["fa", "ar", "he"];

export function isRtlLocale(locale: string): boolean {
  return RTL_LOCALES.includes(locale);
}

export type Direction = "rtl" | "ltr";

/** The `dir` attribute value for a locale (set once on <html>). */
export function getDirection(locale: string): Direction {
  return isRtlLocale(locale) ? "rtl" : "ltr";
}
