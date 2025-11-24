import type { Metadata } from "next";
import { Geist, Geist_Mono, Vazirmatn, Bricolage_Grotesque } from "next/font/google";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import "../globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { Cart } from "@/components/cart";
import { JsonLd } from "@/components/seo/json-ld";
import { CartProvider } from "@/contexts/CartContext";
import { FavoritesProvider } from "@/contexts/FavoritesContext";
import { OrderProvider } from "@/contexts/OrderContext";
import { routing } from "@/i18n/routing";
import { ApiQueryProvider } from "@/lib/api/query-client";
import { getSiteUrl } from "@/lib/config";
import {
  SITE_NAME,
  buildMetadata,
  organizationSchema,
  websiteSchema,
} from "@/lib/seo";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const vazirmatn = Vazirmatn({
  variable: "--font-vazirmatn",
  subsets: ["arabic", "latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const name = SITE_NAME[locale as keyof typeof SITE_NAME] ?? SITE_NAME.fa;
  const t = await getTranslations({ locale, namespace: "home" });

  // Site-wide defaults: canonical/hreflang, OG and Twitter all come from
  // buildMetadata; the root layout only adds what's unique to it (base URL,
  // title template, app name, crawler directives).
  return {
    ...buildMetadata({ locale, path: "", description: t("metadataDescription") }),
    metadataBase: new URL(getSiteUrl()),
    title: {
      default: name,
      template: `%s | ${name}`,
    },
    applicationName: name,
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const direction = locale === "fa" ? "rtl" : "ltr";

  return (
    <html
      suppressHydrationWarning
      lang={locale}
      dir={direction}
      className={`${vazirmatn.variable} ${geistSans.variable} ${geistMono.variable} ${bricolage.variable}`}
    >
      <body className="font-sans antialiased">
        <JsonLd data={[organizationSchema(locale), websiteSchema(locale)]} />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ApiQueryProvider>
            <NextIntlClientProvider>
              <CartProvider>
                <FavoritesProvider>
                  <OrderProvider>
                    <div className={locale === "fa" ? "locale-fa" : "locale-en"}>
                      {children}
                    </div>
                    <Cart />
                    <Toaster />
                  </OrderProvider>
                </FavoritesProvider>
              </CartProvider>
            </NextIntlClientProvider>
          </ApiQueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
