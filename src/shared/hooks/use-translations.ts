"use client";

import {
  useLocale,
  useMessages,
  useTranslations as useNextIntlTranslations,
} from "next-intl";
import { useCallback } from "react";
import type { Locale } from "@/shared/i18n/routing";

export function useTranslations() {
  const locale = useLocale() as Locale;
  const messages = useMessages();
  const translate = useNextIntlTranslations();

  const t = useCallback(
    (key: string, values?: Record<string, string | number>): string => {
      try {
        return translate(key, values);
      } catch {
        return key;
      }
    },
    [translate]
  );

  return { t, locale, messages };
}
