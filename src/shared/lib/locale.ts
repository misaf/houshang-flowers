export const RTL_LOCALES = ["fa", "ar", "he"];

export function isRtlLocale(locale: string): boolean {
  return RTL_LOCALES.includes(locale);
}
