import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import ProductsClient from "./components/products-client";
import { fetchProductsWithDetails } from "./lib/queries";
import {
  buildProductsQueryKey,
  getProductsApiSort,
  type ProductSortValue,
} from "./lib/keys";
import type { FetchProductsResult, Product } from "./types";
import { buildMetadata } from "@/shared/seo";
import { readFirst, normalizeSearch } from "@/shared/lib/search-params";

function normalizeCategory(value: string | undefined): string | undefined {
  if (!value) return undefined;
  const category = value.trim();
  if (!category || category === "all") return undefined;
  return category;
}

function normalizeSort(value: string | undefined): ProductSortValue | undefined {
  if (
    value === "newest" ||
    value === "oldest" ||
    value === "price-asc" ||
    value === "price-desc"
  ) {
    return value;
  }

  return undefined;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "products" });

  return buildMetadata({
    locale,
    path: "/products",
    title: t("metadataTitle"),
    description: t("metadataDescription"),
  });
}

export default async function Products({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const query = await searchParams;
  const category = normalizeCategory(readFirst(query.category));
  const search = normalizeSearch(readFirst(query.search));
  const sort = normalizeSort(readFirst(query.sort));
  const apiSort = getProductsApiSort(sort);
  const initialQueryKey = buildProductsQueryKey(category, search, apiSort);

  let initialProducts: Product[] = [];
  let initialPagination: FetchProductsResult["pagination"] | null = null;
  let initialError: string | null = null;

  try {
    const result = await fetchProductsWithDetails({
      page: 1,
      perPage: 12,
      category,
      search: search || undefined,
      sort: apiSort,
    });
    initialProducts = result.products;
    initialPagination = result.pagination;
  } catch (error) {
    initialError = error instanceof Error ? error.message : "Failed to load products";
  }

  return (
    <Suspense fallback={null}>
      <ProductsClient
        initialProducts={initialProducts}
        initialPagination={initialPagination}
        initialError={initialError}
        initialQueryKey={initialQueryKey}
      />
    </Suspense>
  );
}
