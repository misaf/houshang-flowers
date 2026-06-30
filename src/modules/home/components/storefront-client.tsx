"use client";

import { PageShell } from "@/shared/components/layout/page-shell";
import { Hero } from "./hero";
import { BlogSection } from "@/modules/blog";
import { HomeProductsSection } from "@/modules/products";
import { Newsletter } from "@/modules/newsletter";
import { useTranslations } from "@/shared/hooks/use-translations";
import { useCallback, useEffect } from "react";
import type { Post as BlogPost, PostCategory } from "@/modules/blog";
import type { HomeProductCategory } from "@/modules/products";
import { formatLocaleDate } from "@/shared/lib/date";

interface StorefrontClientProps {
  initialBlogPosts: BlogPost[];
  initialBlogCategory: PostCategory | null;
  initialHomeProductCategories: HomeProductCategory[];
}

export default function StorefrontClient({
  initialBlogPosts,
  initialBlogCategory,
  initialHomeProductCategories,
}: StorefrontClientProps) {
  const { t, locale } = useTranslations();

  useEffect(() => {
    document.documentElement.classList.add("storefront-snap");

    return () => {
      document.documentElement.classList.remove("storefront-snap");
    };
  }, []);

  const formatDate = useCallback(
    (dateString: string) => formatLocaleDate(dateString, locale),
    [locale]
  );

  return (
    <PageShell showFooterNewsletter={false}>
      <Hero title={t("home.title")} subtitle={t("home.subtitle")} showButtons />

      <HomeProductsSection
        locale={locale}
        t={t}
        categories={initialHomeProductCategories}
      />

      <BlogSection
        allPosts={initialBlogPosts}
        category={initialBlogCategory}
        locale={locale}
        formatDate={formatDate}
        t={t}
      />

      <Newsletter />
    </PageShell>
  );
}
