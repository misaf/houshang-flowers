import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import BlogPostsClient from "./blog-client";
import { fetchBlogPostsWithDetails, type FetchBlogPostsResult } from "@/lib/api";
import type { Post as BlogPost } from "@/lib/api/posts/types";
import { buildMetadata } from "@/lib/seo";

function readFirst(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

function normalizeCategory(value: string | undefined): string {
  const category = value?.trim();
  return category || "all";
}

function normalizeSearch(value: string | undefined): string {
  return value?.trim() || "";
}

function buildBlogQueryKey(category: string, searchQuery: string): string {
  return `${category}|${searchQuery}`;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "blog" });

  return buildMetadata({
    locale,
    path: "/blog",
    title: t("metadataTitle"),
    description: t("metadataDescription"),
  });
}

export default async function BlogPosts({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const query = await searchParams;
  const selectedCategory = normalizeCategory(readFirst(query.category));
  const searchQuery = normalizeSearch(readFirst(query.search));
  const initialQueryKey = buildBlogQueryKey(selectedCategory, searchQuery);

  let initialPosts: BlogPost[] = [];
  let initialPagination: FetchBlogPostsResult["pagination"] | null = null;
  let initialError: string | null = null;

  try {
    const result = await fetchBlogPostsWithDetails({
      page: 1,
      perPage: 12,
      category: selectedCategory !== "all" ? selectedCategory : undefined,
      search: searchQuery || undefined,
    });
    initialPosts = result.posts;
    initialPagination = result.pagination;
  } catch (error) {
    initialError =
      error instanceof Error ? error.message : "Failed to load blog posts";
  }

  return (
    <Suspense fallback={null}>
      <BlogPostsClient
        initialPosts={initialPosts}
        initialPagination={initialPagination}
        initialError={initialError}
        initialQueryKey={initialQueryKey}
      />
    </Suspense>
  );
}
