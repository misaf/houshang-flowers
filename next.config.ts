import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const getHostname = (url: string | undefined, fallback: string): string => {
  if (!url) return fallback;
  try {
    return new URL(url).hostname;
  } catch {
    return fallback;
  }
};

const apiHostname = getHostname(
  process.env.API_BASE_URL || process.env.NEXT_PUBLIC_API_BASE_URL,
  "vendra.test"
);
const storageHostname = getHostname(
  process.env.STORAGE_BASE_URL || process.env.NEXT_PUBLIC_STORAGE_BASE_URL,
  "vendra.test"
);
const imageHostnames = Array.from(new Set([apiHostname, storageHostname]));

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    remotePatterns: imageHostnames.flatMap((hostname) => [
      {
        protocol: "https" as const,
        hostname,
        pathname: "/storage/**",
      },
      {
        protocol: "http" as const,
        hostname,
        pathname: "/storage/**",
      },
    ]),
  },
};

const withNextIntl = createNextIntlPlugin("./src/shared/i18n/request.ts");

export default withNextIntl(nextConfig);
