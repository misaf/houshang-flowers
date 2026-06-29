import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { normalizeImageUrl } from "./image";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function parseNumericId(id: string | number): number {
  const value = typeof id === "number" ? id : Number.parseInt(id, 10);
  return Number.isFinite(value) ? value : 0;
}

/** Build a dialable `tel:` href, stripping everything but digits and `+`. */
export function telHref(phone: string): string {
  return `tel:${phone.replace(/[^\d+]/g, "")}`;
}

export function formatPrice(price: number | string | null | undefined): string {
  const parsedPrice =
    typeof price === "number" ? price : Number.parseFloat(String(price ?? ""));
  return Number.isFinite(parsedPrice) ? parsedPrice.toFixed(2) : "0.00";
}

function parsePrice(price: number | string | null | undefined): number {
  return typeof price === "number"
    ? price
    : Number.parseFloat(String(price ?? "").replace(/,/g, ""));
}

// Hoisted so we don't construct a new Intl formatter on every price render.
const FA_PRICE_FORMAT_INTEGER = new Intl.NumberFormat("fa-IR", {
  maximumFractionDigits: 2,
  minimumFractionDigits: 0,
});
const FA_PRICE_FORMAT_DECIMAL = new Intl.NumberFormat("fa-IR", {
  maximumFractionDigits: 2,
  minimumFractionDigits: 2,
});

export function formatLocalizedPrice(
  price: number | string | null | undefined,
  locale: string,
  formattedPrice?: string | null
): string {
  const isPersian = locale === "fa";

  if (formattedPrice) {
    return isPersian
      ? formattedPrice.replace(/\bIRT\b/gi, "تومان")
      : formattedPrice;
  }

  const parsedPrice = parsePrice(price);

  if (!Number.isFinite(parsedPrice)) {
    return isPersian ? `۰ تومان` : "$0.00";
  }

  if (isPersian) {
    const formatter = Number.isInteger(parsedPrice)
      ? FA_PRICE_FORMAT_INTEGER
      : FA_PRICE_FORMAT_DECIMAL;

    return `${formatter.format(parsedPrice)} تومان`;
  }

  return `$${formatPrice(parsedPrice)}`;
}

export function sanitizeHtmlContent(html: string | null | undefined): string {
  if (!html) {
    return "";
  }

  if (typeof window === "undefined") {
    return html
      .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, "")
      .replace(/<style[\s\S]*?>[\s\S]*?<\/style>/gi, "");
  }

  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");
  const blockedTags = ["script", "style", "iframe", "object", "embed", "link"];
  for (const tag of blockedTags) {
    doc.querySelectorAll(tag).forEach((node) => node.remove());
  }

  const allElements = doc.body.querySelectorAll("*");
  for (const element of allElements) {
    for (const attr of [...element.attributes]) {
      const attrName = attr.name.toLowerCase();
      const attrValue = attr.value.trim().toLowerCase();
      if (attrName.startsWith("on")) {
        element.removeAttribute(attr.name);
        continue;
      }

      if (
        (attrName === "href" || attrName === "src" || attrName === "xlink:href") &&
        (attrValue.startsWith("javascript:") || attrValue.startsWith("data:text/html"))
      ) {
        element.removeAttribute(attr.name);
      }
    }
  }

  return doc.body.innerHTML;
}

export { normalizeImageUrl };
