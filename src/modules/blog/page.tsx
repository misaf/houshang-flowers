import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import BlogPostsClient from "./components/blog-client";
import { fetchBlogPostCategories, fetchBlogPostsWithDetails } from "./lib/queries";
import { buildBlogQueryKey } from "./lib/keys";
import type { FetchBlogPostsResult, Post as BlogPost, PostCategory } from "./types";
import { buildMetadata } from "@/shared/seo";
import { readFirst, normalizeSearch } from "@/shared/lib/search-params";

function normalizeCategory(value: string | undefined): string {
  const category = value?.trim();
  return category || "all";
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
  let categories: PostCategory[] = [];

  const [postsResult, categoriesResult] = await Promise.allSettled([
    fetchBlogPostsWithDetails({
      page: 1,
      perPage: 12,
      category: selectedCategory !== "all" ? selectedCategory : undefined,
      search: searchQuery || undefined,
    }),
    fetchBlogPostCategories(),
  ]);

  if (postsResult.status === "fulfilled") {
    initialPosts = postsResult.value.posts;
    initialPagination = postsResult.value.pagination;
  } else {
    initialError =
      postsResult.reason instanceof Error
        ? postsResult.reason.message
        : "Failed to load blog posts";
  }

  if (categoriesResult.status === "fulfilled") {
    categories = categoriesResult.value;
  }

  return (
    <Suspense fallback={null}>
      <BlogPostsClient
        initialPosts={initialPosts}
        initialPagination={initialPagination}
        initialError={initialError}
        initialQueryKey={initialQueryKey}
        categories={categories}
      />
    </Suspense>
  );
}
