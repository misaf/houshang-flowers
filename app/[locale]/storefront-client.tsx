"use client";

import { PageShell } from "@/components/layout/page-shell";
import { Hero } from "@/components/hero";
import { BlogSection } from "@/components/blog-section";
import { HomeProductsSection } from "@/components/home-products-section";
import { Newsletter } from "@/components/newsletter";
import { useTranslations } from "@/hooks/use-translations";
import { useCallback, useEffect } from "react";
import type { Post as BlogPost, PostCategory } from "@/lib/api/posts/types";
import type { Product } from "@/lib/api/products/types";
import { formatLocaleDate } from "@/lib/date";

export interface HomeProductCategoryData {
  slug: string;
  title: string;
  description: string | null;
  image?: string;
  products: Product[];
}

interface StorefrontClientProps {
  initialBlogPosts: BlogPost[];
  initialBlogCategory: PostCategory | null;
  initialBlogPage: number;
  initialHasMoreBlogPosts: boolean;
  initialHomeProductCategories: HomeProductCategoryData[];
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
        loading={false}
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
