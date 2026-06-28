"use client";

import { useTranslations } from "@/shared/hooks/use-translations";

/**
 * Keyboard/screen-reader "skip to main content" link. Visually hidden until
 * focused, it must be the first focusable element so AT users can bypass the
 * header on every page.
 */
export function SkipLink() {
  const { t } = useTranslations();

  return (
    <a
      href="#main-content"
      className="sr-only focus-visible:not-sr-only focus-visible:fixed focus-visible:start-4 focus-visible:top-4 focus-visible:z-[100] focus-visible:rounded-md focus-visible:bg-primary focus-visible:px-4 focus-visible:py-2 focus-visible:text-sm focus-visible:font-semibold focus-visible:text-primary-foreground focus-visible:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      {t("common.skipToContent")}
    </a>
  );
}
