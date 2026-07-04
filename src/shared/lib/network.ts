import { routing } from "@/shared/i18n/routing";

export const JSON_API_HEADERS = {
  "Content-Type": "application/vnd.api+json",
  Accept: "application/vnd.api+json",
} as const;

const LOCALE_ACCEPT_LANGUAGE: Partial<Record<string, string>> = {
  fa: "fa-IR,fa;q=0.9,en;q=0.8",
  en: "en-US,en;q=0.9,fa;q=0.8",
};

export function getAcceptLanguageHeader(
  locale: string | null | undefined
): string | undefined {
  if (!locale || !(routing.locales as readonly string[]).includes(locale)) {
    return undefined;
  }

  if (LOCALE_ACCEPT_LANGUAGE[locale]) {
    return LOCALE_ACCEPT_LANGUAGE[locale];
  }

  return locale === routing.defaultLocale
    ? locale
    : `${locale},${routing.defaultLocale};q=0.8`;
}

export function getNetworkErrorStatus(error: Error): number {
  const message = error.message.toLowerCase();

  if (
    message.includes("certificate") ||
    message.includes("ssl") ||
    message.includes("tls") ||
    message.includes("enotfound") ||
    message.includes("getaddrinfo") ||
    message.includes("econnrefused") ||
    message.includes("connection refused")
  ) {
    return 502;
  }

  return 500;
}
