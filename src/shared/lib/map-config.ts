/**
 * Map provider configuration for the checkout delivery picker.
 *
 * Two interchangeable map backends are supported, selected at build time via
 * `NEXT_PUBLIC_MAP_PROVIDER`:
 *
 *   - "osm"    — Leaflet + OpenStreetMap tiles, reverse-geocoded by Nominatim.
 *                Free, key-less, the default. Geocoding runs from the browser.
 *   - "neshan" — Neshan's Leaflet build (better Iran/Persian coverage), reverse
 *                -geocoded by Neshan's REST API through our own server route so
 *                the service key never reaches the client.
 *
 * Neshan uses TWO separate keys:
 *   - a *map* key (browser-safe) that renders the tiles, and
 *   - a *service* key (server-only) for the reverse-geocoding REST endpoint.
 */

export type MapProvider = "osm" | "neshan";

/** Selected provider. Anything other than "neshan" falls back to OSM. */
export function getMapProvider(): MapProvider {
  return (process.env.NEXT_PUBLIC_MAP_PROVIDER || "").toLowerCase() === "neshan"
    ? "neshan"
    : "osm";
}

/**
 * Neshan web/map key — rendered in the browser to draw the tiles, so it is
 * intentionally a `NEXT_PUBLIC_` value. Empty when unset.
 */
export function getNeshanMapKey(): string {
  return process.env.NEXT_PUBLIC_NESHAN_MAP_KEY || "";
}

/**
 * Neshan service/API key — used only by the server route for reverse
 * geocoding. NEVER exposed to the browser (no `NEXT_PUBLIC_` prefix).
 */
export function getNeshanServiceKey(): string {
  return process.env.NESHAN_SERVICE_KEY || "";
}

/**
 * Neshan base-map style. Leave unset to let the picker pick by theme
 * ("standard-day" in light, "standard-night" in dark). Override with any
 * Neshan maptype, e.g. "dreamy", "neshan", "standard-day", "standard-night".
 */
export function getNeshanMapType(): string {
  return process.env.NEXT_PUBLIC_NESHAN_MAP_TYPE || "";
}

/**
 * Which provider draws the *tiles*. Neshan tiles need the browser map key, so
 * without it we keep OSM tiles rather than render a blank map — even when the
 * provider is "neshan" (in which case geocoding can still be Neshan's).
 */
export function getEffectiveTileProvider(): MapProvider {
  return getMapProvider() === "neshan" && getNeshanMapKey() ? "neshan" : "osm";
}
