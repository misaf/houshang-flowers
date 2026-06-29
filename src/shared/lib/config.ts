const DEFAULT_API_BASE_URL = "https://vendra.test/v1";
const DEFAULT_STORAGE_BASE_URL = "https://vendra.test";
const DEFAULT_SITE_URL = "https://houshang-flowers.com";

function normalizeBaseUrl(value: string): string {
  return value.replace(/\/+$/, "");
}

/**
 * Public, canonical origin of the storefront (no trailing slash), e.g.
 * "https://houshang-flowers.com". Used for canonical URLs, hreflang
 * alternates, sitemap/robots, Open Graph and JSON-LD. Override per
 * environment via NEXT_PUBLIC_SITE_URL (must be the real production domain).
 */
export function getSiteUrl(): string {
  return normalizeBaseUrl(
    process.env.NEXT_PUBLIC_SITE_URL ||
      process.env.SITE_URL ||
      DEFAULT_SITE_URL
  );
}

export function getApiBaseUrl(): string {
  return normalizeBaseUrl(
    process.env.API_BASE_URL ||
      process.env.NEXT_PUBLIC_API_BASE_URL ||
      DEFAULT_API_BASE_URL
  );
}

export function getStorageBaseUrl(): string {
  return normalizeBaseUrl(
    process.env.STORAGE_BASE_URL ||
      process.env.NEXT_PUBLIC_STORAGE_BASE_URL ||
      DEFAULT_STORAGE_BASE_URL
  );
}

const DEFAULT_CONTACT_MOBILE_PHONE = "0912-9333034";
const DEFAULT_CONTACT_OFFICE_PHONE = "021-22011507";
const DEFAULT_CONTACT_HOURS_OPEN = "08:00";
const DEFAULT_CONTACT_HOURS_CLOSE = "21:00";
// Store location for the map, as "lat,lng" so the pin lands on the
// storefront. Override via CONTACT_MAP_QUERY (accepts coords or a place query).
const DEFAULT_CONTACT_MAP_QUERY = "35.772123240655716,51.420586774090964";

export interface ContactInfo {
  mobilePhone: string;
  officePhone: string;
  hoursOpen: string;
  hoursClose: string;
  mapQuery: string;
}

export function getContactInfo(): ContactInfo {
  return {
    mobilePhone: process.env.CONTACT_MOBILE_PHONE || DEFAULT_CONTACT_MOBILE_PHONE,
    officePhone: process.env.CONTACT_OFFICE_PHONE || DEFAULT_CONTACT_OFFICE_PHONE,
    hoursOpen: process.env.CONTACT_HOURS_OPEN || DEFAULT_CONTACT_HOURS_OPEN,
    hoursClose: process.env.CONTACT_HOURS_CLOSE || DEFAULT_CONTACT_HOURS_CLOSE,
    mapQuery: process.env.CONTACT_MAP_QUERY || DEFAULT_CONTACT_MAP_QUERY,
  };
}
