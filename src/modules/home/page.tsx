import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import {
  fetchBlogPostCategories,
  fetchBlogPostsWithDetails,
} from "@/modules/blog";
import type { Post as BlogPost, PostCategory } from "@/modules/blog";
import {
  fetchProductCategories,
  fetchProductsWithDetails,
  type HomeProductCategory,
} from "@/modules/products";
import { buildMetadata } from "@/shared/seo";
import StorefrontClient from "./components/storefront-client";

const BLOG_PAGE_SIZE = 9;
const HOME_PRODUCTS_PER_CATEGORY = 20;
const HOME_CATEGORY_LIMIT = 3;

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "home" });

  return buildMetadata({
    locale,
    path: "",
    title: t("metadataTitle"),
    description: t("metadataDescription"),
  });
}

interface InitialBlogData {
  initialBlogPosts: BlogPost[];
  initialBlogCategory: PostCategory | null;
}

async function loadInitialBlog(locale: string): Promise<InitialBlogData> {
  let blogCategories: PostCategory[] = [];

  try {
    blogCategories = await fetchBlogPostCategories(locale);
  } catch (error) {
    console.error("Error loading blog post categories:", error);
  }

  try {
    // Try each category, then the unfiltered feed; use the first with posts.
    for (const category of [...blogCategories, null]) {
      const { posts } = await fetchBlogPostsWithDetails({
        perPage: BLOG_PAGE_SIZE,
        page: 1,
        category: category?.slug,
        locale,
      });

      if (posts.length > 0) {
        return { initialBlogPosts: posts, initialBlogCategory: category };
      }
    }
  } catch (error) {
    console.error("Error loading initial blog posts:", error);
  }

  return { initialBlogPosts: [], initialBlogCategory: null };
}

async function loadInitialHomeProductCategories(
  locale: string
): Promise<HomeProductCategory[]> {
  try {
    const apiCategories = await fetchProductCategories(locale);
    const homeCategories = apiCategories.slice(0, HOME_CATEGORY_LIMIT);
    const results = await Promise.allSettled(
      homeCategories.map((category) =>
        fetchProductsWithDetails({
          category: category.slug,
          page: 1,
          perPage: HOME_PRODUCTS_PER_CATEGORY,
          locale,
        })
      )
    );

    return homeCategories.map((category, index) => {
      const result = results[index];

      if (result.status === "rejected") {
        console.error(
          `Error loading initial home products for category "${category.slug}":`,
          result.reason
        );
      }

      return {
        slug: category.slug,
        title: category.name,
        description: category.description,
        image: category.image,
        products: result.status === "fulfilled" ? result.value.products : [],
      };
    });
  } catch (error) {
    console.error("Error loading initial home categories:", error);
    return [];
  }
}

export default async function StorefrontPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Blog and product data are independent — load them concurrently.
  const [blog, initialHomeProductCategories] = await Promise.all([
    loadInitialBlog(locale),
    loadInitialHomeProductCategories(locale),
  ]);

  return (
    <StorefrontClient
      initialBlogPosts={blog.initialBlogPosts}
      initialBlogCategory={blog.initialBlogCategory}
      initialHomeProductCategories={initialHomeProductCategories}
    />
  );
}
