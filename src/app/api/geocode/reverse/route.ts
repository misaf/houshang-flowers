import { NextRequest, NextResponse } from "next/server";
import {
  getMapProvider,
  getNeshanServiceKey,
} from "@/shared/lib/map-config";
import { getSiteUrl } from "@/shared/lib/config";

/**
 * Reverse-geocode a pinned coordinate into a postal address. Runs server-side
 * so the Neshan service key never reaches the browser. Falls back to Nominatim
 * when Neshan is not configured, and normalises both into a single shape:
 *
 *   { address, city, country }
 *
 * The checkout map picker calls this only for the "neshan" provider; the OSM
 * provider geocodes from the browser directly.
 */

interface NormalizedAddress {
  address: string;
  city: string;
  country: string;
}

async function reverseWithNeshan(
  lat: number,
  lng: number,
  locale: string,
  apiKey: string
): Promise<NormalizedAddress> {
  const url = `https://api.neshan.org/v5/reverse?lat=${lat}&lng=${lng}`;
  const res = await fetch(url, {
    headers: { "Api-Key": apiKey },
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`Neshan reverse failed: ${res.status}`);
  const data = await res.json();

  const sep = locale === "fa" ? "، " : ", ";
  const address: string =
    data.formatted_address ||
    [data.neighbourhood, data.route_name].filter(Boolean).join(sep) ||
    "";
  const city: string =
    data.city || data.county || data.state || data.village || "";
  // Neshan only covers Iran, so there is no country field to read.
  const country = locale === "fa" ? "ایران" : "Iran";

  return { address, city, country };
}

async function reverseWithNominatim(
  lat: number,
  lng: number,
  locale: string
): Promise<NormalizedAddress> {
  const url =
    `https://nominatim.openstreetmap.org/reverse?format=jsonv2` +
    `&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1&accept-language=${locale}`;
  const res = await fetch(url, {
    // Nominatim's usage policy requires an identifying User-Agent.
    headers: { "User-Agent": `HoushangFlowers/1.0 (+${getSiteUrl()})` },
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`Nominatim reverse failed: ${res.status}`);
  const data = await res.json();

  const a = data.address ?? {};
  const sep = locale === "fa" ? "، " : ", ";
  const streetLine = [a.road, a.house_number, a.neighbourhood ?? a.suburb ?? a.quarter]
    .filter(Boolean)
    .join(sep);
  return {
    address: streetLine || data.name || data.display_name || "",
    city: a.city ?? a.town ?? a.village ?? a.county ?? a.state ?? "",
    country: a.country ?? (data.display_name?.split(",").pop()?.trim() ?? ""),
  };
}

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const lat = Number(params.get("lat"));
  const lng = Number(params.get("lng"));
  const locale = params.get("locale") === "fa" ? "fa" : "en";

  if (!Number.isFinite(lat) || !Number.isFinite(lng)) {
    return NextResponse.json(
      { error: "Invalid or missing lat/lng" },
      { status: 400 }
    );
  }

  const serviceKey = getNeshanServiceKey();
  const useNeshan = getMapProvider() === "neshan" && Boolean(serviceKey);

  try {
    const result =
      useNeshan
        ? await reverseWithNeshan(lat, lng, locale, serviceKey).catch(() =>
            // A Neshan hiccup shouldn't strand the buyer — fall back to OSM.
            reverseWithNominatim(lat, lng, locale)
          )
        : await reverseWithNominatim(lat, lng, locale);

    return NextResponse.json(result, {
      headers: { "Cache-Control": "no-store" },
    });
  } catch (error) {
    console.error("[geocode/reverse] Error:", error);
    return NextResponse.json(
      { error: "Reverse geocoding failed" },
      { status: 502 }
    );
  }
}
