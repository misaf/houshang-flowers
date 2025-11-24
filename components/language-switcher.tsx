"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Check, Globe } from "lucide-react";
import { routing, type Locale } from "@/i18n/routing";

const localeNames: Record<Locale, string> = {
  fa: "فارسی",
  en: "English",
};

export function LanguageSwitcher() {
  const pathname = usePathname();
  const router = useRouter();
  const currentLocale = useLocale() as Locale;

  const switchLocale = (locale: Locale) => {
    router.replace(pathname, { locale });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Globe className="h-5 w-5" />
          <span className="sr-only">{localeNames[currentLocale]}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {routing.locales.map((locale) => {
          const isActive = currentLocale === locale;
          return (
            <DropdownMenuItem
              key={locale}
              onClick={() => switchLocale(locale)}
              aria-current={isActive ? "true" : undefined}
              className={isActive ? "bg-accent font-medium" : ""}
            >
              <Check
                className={`h-4 w-4 ${isActive ? "opacity-100" : "opacity-0"}`}
              />
              {localeNames[locale]}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
