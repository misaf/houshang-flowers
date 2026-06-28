import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import {
  fetchBlogPostCategories,
  fetchBlogPostsWithDetails,
} from "@/modules/blog";
import type { Post as BlogPost, PostCategory } from "@/modules/blog";
import { fetchProductCategories, fetchProductsWithDetails } from "@/modules/products";
import { buildMetadata } from "@/shared/seo";
import StorefrontClient, { type HomeProductCategoryData } from "./components/storefront-client";

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
  initialBlogPage: number;
  initialHasMoreBlogPosts: boolean;
}

async function loadInitialBlog(): Promise<InitialBlogData> {
  const data: InitialBlogData = {
    initialBlogPosts: [],
    initialBlogCategory: null,
    initialBlogPage: 1,
    initialHasMoreBlogPosts: false,
  };

  try {
    let blogCategories: PostCategory[] = [];

    try {
      blogCategories = await fetchBlogPostCategories();
    } catch (error) {
      console.error("Error loading blog post categories:", error);
    }

    const categoriesToTry = [...blogCategories, null];

    for (const category of categoriesToTry) {
      const blogResult = await fetchBlogPostsWithDetails({
        perPage: BLOG_PAGE_SIZE,
        page: 1,
        category: category?.slug,
      });

      if (blogResult.posts.length === 0) {
        continue;
      }

      data.initialBlogCategory = category;
      data.initialBlogPosts = blogResult.posts;
      data.initialBlogPage = blogResult.pagination.currentPage;
      data.initialHasMoreBlogPosts =
        blogResult.pagination.currentPage < blogResult.pagination.lastPage;
      break;
    }
  } catch (error) {
    console.error("Error loading initial blog posts:", error);
  }

  return data;
}

async function loadInitialHomeProductCategories(): Promise<HomeProductCategoryData[]> {
  try {
    const apiCategories = await fetchProductCategories();
    const homeCategories = apiCategories.slice(0, HOME_CATEGORY_LIMIT);
    const results = await Promise.allSettled(
      homeCategories.map((category) =>
        fetchProductsWithDetails({
          category: category.slug,
          page: 1,
          perPage: HOME_PRODUCTS_PER_CATEGORY,
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

export default async function StorefrontPage() {
  // Blog and product data are independent — load them concurrently.
  const [blog, initialHomeProductCategories] = await Promise.all([
    loadInitialBlog(),
    loadInitialHomeProductCategories(),
  ]);

  return (
    <StorefrontClient
      initialBlogPosts={blog.initialBlogPosts}
      initialBlogCategory={blog.initialBlogCategory}
      initialBlogPage={blog.initialBlogPage}
      initialHasMoreBlogPosts={blog.initialHasMoreBlogPosts}
      initialHomeProductCategories={initialHomeProductCategories}
    />
  );
}
