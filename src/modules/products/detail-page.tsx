import { cache } from "react";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import ProductDetailClient from "./components/product-detail-client";
import { JsonLd } from "@/shared/components/seo/json-ld";
import { fetchProductBySlug, fetchProductsWithDetails } from "./lib/queries";
import type { Product } from "./types";
import {
  breadcrumbSchema,
  buildMetadata,
  plainText,
  productSchema,
} from "@/shared/seo";

// Deduplicate the product fetch across generateMetadata + the page render.
const getProduct = cache((slug: string) => fetchProductBySlug(slug));

// Related products are secondary — fetched without blocking the product render
// and streamed in via <Suspense> on the client. Errors degrade to an empty list.
async function loadRelatedProducts(product: Product): Promise<Product[]> {
  try {
    const currentProductId = product.id;
    const relatedResult = await fetchProductsWithDetails({
      page: 1,
      perPage: 16,
      category: product.categorySlug,
      sort: "random-position",
    });

    const relatedProducts = relatedResult.products.filter(
      (candidate) => candidate.id !== currentProductId
    );

    if (relatedProducts.length < 8) {
      const fallbackResult = await fetchProductsWithDetails({
        page: 1,
        perPage: 16,
        sort: "random-position",
      });
      const relatedIds = new Set(relatedProducts.map((item) => item.id));
      for (const candidate of fallbackResult.products) {
        if (candidate.id === currentProductId || relatedIds.has(candidate.id)) {
          continue;
        }
        relatedIds.add(candidate.id);
        relatedProducts.push(candidate);
      }
    }

    return relatedProducts.slice(0, 12);
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale, namespace: "products" });
  const path = `/products/${slug}`;

  let product: Product | null = null;
  try {
    product = await getProduct(slug);
  } catch {
    // Fall back to generic metadata when the API is unavailable.
  }

  if (product) {
    const description =
      plainText(product.description) || t("metadataDescription");
    const images = product.images?.length
      ? product.images
      : product.image
        ? [product.image]
        : undefined;

    return buildMetadata({
      locale,
      path,
      title: product.name,
      description,
      images,
    });
  }

  const productLabel = decodeURIComponent(slug).replace(/-/g, " ");
  return buildMetadata({
    locale,
    path,
    title: `${productLabel} | ${t("metadataTitle")}`,
    description: t("metadataDescription"),
  });
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;

  let initialProduct: Product | null = null;
  let initialError: string | null = null;

  try {
    initialProduct = await getProduct(slug);
    if (!initialProduct) {
      initialError = "NOT_FOUND";
    }
  } catch (error) {
    initialError = error instanceof Error ? error.message : "Failed to load product";
  }

  // Kick off the related fetch without awaiting — streamed on the client.
  const relatedProductsPromise = initialProduct
    ? loadRelatedProducts(initialProduct)
    : Promise.resolve<Product[]>([]);

  const structuredData = initialProduct
    ? [
        productSchema(locale, {
          name: initialProduct.name,
          description: plainText(initialProduct.description, 5000) || undefined,
          image: initialProduct.image,
          images: initialProduct.images,
          price: initialProduct.price,
          sku: initialProduct.token,
          inStock: initialProduct.inStock,
          path: `/products/${slug}`,
        }),
        breadcrumbSchema(locale, [
          { name: "Home", path: "" },
          { name: "Products", path: "/products" },
          { name: initialProduct.name, path: `/products/${slug}` },
        ]),
      ]
    : null;

  return (
    <>
      {structuredData && <JsonLd data={structuredData} />}
      <ProductDetailClient
        initialProduct={initialProduct}
        relatedProductsPromise={relatedProductsPromise}
        initialError={initialError}
      />
    </>
  );
}
