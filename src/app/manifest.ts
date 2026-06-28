import type { MetadataRoute } from "next";
import { SITE_NAME } from "@/shared/seo";
import { routing } from "@/shared/i18n/routing";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_NAME[routing.defaultLocale],
    short_name: SITE_NAME[routing.defaultLocale],
    description:
      "گل‌های تازه، گیاهان ممتاز و چیدمان‌های مناسبتی از مجتمع گل و گیاه هوشنگ.",
    start_url: `/${routing.defaultLocale}`,
    display: "standalone",
    lang: routing.defaultLocale,
    dir: "rtl",
    background_color: "#ffffff",
    theme_color: "#ffffff",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
