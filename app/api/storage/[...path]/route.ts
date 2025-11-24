import { NextResponse } from "next/server";
import { getStorageBaseUrl } from "@/lib/config";
import { getNetworkErrorStatus } from "@/lib/network";

const STORAGE_BASE_URL = getStorageBaseUrl();

function normalizeStoragePath(pathSegments: string[] | undefined): string | null {
  if (!pathSegments || pathSegments.length === 0) {
    return null;
  }

  const segments = [...pathSegments];
  if (segments[0] === "storage") {
    segments.shift();
  }

  const sanitizedSegments: string[] = [];
  for (const segment of segments) {
    if (!segment) continue;

    let decodedSegment = segment;
    try {
      decodedSegment = decodeURIComponent(segment);
    } catch {
      return null;
    }

    const normalizedSegment = decodedSegment.trim();
    if (
      normalizedSegment === "" ||
      normalizedSegment === "." ||
      normalizedSegment === ".." ||
      normalizedSegment.includes("\\")
    ) {
      return null;
    }

    sanitizedSegments.push(normalizedSegment);
  }

  if (sanitizedSegments.length === 0) {
    return null;
  }

  return sanitizedSegments.map((segment) => encodeURIComponent(segment)).join("/");
}

export async function GET(
  request: Request,
  context: { params: Promise<{ path: string[] }> }
) {
  try {
    const params = await context.params;
    const normalizedPath = normalizeStoragePath(params?.path);
    if (!normalizedPath) {
      return NextResponse.json({ error: "Invalid storage path" }, { status: 400 });
    }

    const requestUrl = new URL(request.url);
    const queryString = requestUrl.searchParams.toString();
    const url = `${STORAGE_BASE_URL}/storage/${normalizedPath}${
      queryString ? `?${queryString}` : ""
    }`;

    const response = await fetch(url, {
      headers: {
        Accept: "image/*",
      },
      cache: "default",
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: `Storage error: ${response.status} ${response.statusText}` },
        { status: response.status }
      );
    }

    const contentType = response.headers.get("content-type") || "image/jpeg";
    const imageBuffer = await response.arrayBuffer();

    return new NextResponse(imageBuffer, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=31536000, immutable",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET",
      },
    });
  } catch (error) {
    console.error("[Storage Proxy] Error:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    const status = error instanceof Error ? getNetworkErrorStatus(error) : 500;

    return NextResponse.json(
      { error: "Failed to proxy storage request", details: errorMessage },
      { status }
    );
  }
}
