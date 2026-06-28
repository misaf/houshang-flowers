import { useQuery } from "@tanstack/react-query";
import { ApiClientError, apiClient } from "@/shared/api/client";
import { createApiQueryOptions, type ApiQueryOptions } from "@/shared/api/query-client";
import { PLACEHOLDER_IMAGE, toAbsoluteStorageUrl } from "@/shared/lib/image";
import { getLeadingResourceId } from "@/shared/lib/slug-url";
import type { JsonApiLinks, JsonApiPageMeta } from "@/shared/api/types";
import { productKeys } from "./keys";
import type {
  CollectionLinks,
  FetchProductsParams,
  FetchProductsResult,
  Pagination,
  Product,
  ProductCategory,
  ProductCategoryDto,
  ProductDto,
  ProductMedia,
  ProductPriceField,
  ProductPriceDto,
} from "../types";

function appendOptionalQueryParam(
  queryParams: URLSearchParams,
  key: string,
  value: string | undefined
) {
  if (value) {
    queryParams.append(key, value);
  }
}

function createPageQueryParams(page: number, perPage: number): URLSearchParams {
  return new URLSearchParams({
    "page[number]": page.toString(),
    "page[size]": perPage.toString(),
  });
}

function extractCollectionLinks(links: JsonApiLinks | undefined): CollectionLinks {
  return {
    first: links?.first,
    last: links?.last,
    next: links?.next,
    prev: links?.prev,
  };
}

function getFirstResource<T>(data: T | T[]): T | null {
  return Array.isArray(data) ? data[0] ?? null : data ?? null;
}

function getFirstRelationship<T>(data: T | T[] | undefined): T | undefined {
  return Array.isArray(data) ? data[0] : data;
}

function stringifyRichText(value: unknown): string {
  if (typeof value === "string") return value;
  if (typeof value === "number" || typeof value === "boolean") return String(value);
  if (Array.isArray(value)) {
    return value.map(stringifyRichText).filter(Boolean).join(" ");
  }

  if (value && typeof value === "object") {
    const record = value as Record<string, unknown>;

    if (typeof record.text === "string") return record.text;
    if (Array.isArray(record.content)) return stringifyRichText(record.content);
  }

  return "";
}

function stripHtml(text: unknown, maxLength: number): string {
  const value = stringifyRichText(text);
  return value ? value.replace(/<[^>]*>/g, "").substring(0, maxLength) : "";
}

function parseNumericId(id: string | number): number {
  const value = typeof id === "number" ? id : Number.parseInt(id, 10);
  return Number.isFinite(value) ? value : 0;
}

interface ResolvedProductPrice {
  value: number;
  formatted?: string;
}

function parsePriceValue(value: ProductPriceField | undefined): number {
  if (typeof value === "number") return Number.isFinite(value) ? value : 0;
  if (typeof value === "string") {
    const parsed = Number.parseFloat(value.replace(/,/g, ""));
    return Number.isFinite(parsed) ? parsed : 0;
  }

  if (value && typeof value === "object") {
    return parsePriceValue(value.amount);
  }

  return 0;
}

function getFormattedPriceValue(value: ProductPriceField | undefined): string | undefined {
  if (value && typeof value === "object" && typeof value.formatted === "string") {
    return value.formatted;
  }

  return undefined;
}

function resolveProductPriceResource(
  price?: ProductPriceDto | null
): ResolvedProductPrice {
  if (!price) return { value: 0 };

  const candidates = [
    price.final_price,
    price.attributes?.final_price,
    price.sale_price,
    price.attributes?.sale_price,
    price.price,
    price.attributes?.price,
    price.amount,
    price.attributes?.amount,
    price.value,
    price.attributes?.value,
  ];

  for (const candidate of candidates) {
    const parsed = parsePriceValue(candidate);
    if (parsed > 0) {
      return {
        value: parsed,
        formatted: getFormattedPriceValue(candidate),
      };
    }
  }

  return { value: 0 };
}

function resolveProductPricing(product: ProductDto): ResolvedProductPrice {
  const latestPriceResource = getFirstRelationship(
    product.latestProductPrice ?? product.latest_product_price
  );
  const latestPrice = resolveProductPriceResource(latestPriceResource);

  if (latestPrice.value > 0) {
    return latestPrice;
  }

  const firstPrice = getFirstRelationship(
    product.productPrices ?? product.product_prices
  );
  const firstPriceValue = resolveProductPriceResource(firstPrice);

  if (firstPriceValue.value > 0) {
    return firstPriceValue;
  }

  const candidates = [product.final_price, product.sale_price, product.price];

  for (const candidate of candidates) {
    const parsed = parsePriceValue(candidate);
    if (parsed > 0) return { value: parsed };
  }

  return { value: 0 };
}

function getPagination(
  pageMeta: JsonApiPageMeta | undefined,
  fallback: { page: number; perPage: number }
): Pagination {
  return {
    currentPage: pageMeta?.currentPage ?? fallback.page,
    lastPage: pageMeta?.lastPage ?? 1,
    perPage: pageMeta?.perPage ?? fallback.perPage,
    total: pageMeta?.total ?? 0,
    from: pageMeta?.from ?? 0,
    to: pageMeta?.to ?? 0,
  };
}

function getConversionName(conversions: Record<string, unknown>): string | null {
  const priority = ["extra-large", "large", "medium", "small"];

  for (const name of priority) {
    if (conversions[name]) return name;
  }

  return Object.keys(conversions)[0] || null;
}

type ProductMediaAttributeKey =
  | "url"
  | "uuid"
  | "generated_conversions"
  | "file_name"
  | "name";

function getMediaValue<K extends ProductMediaAttributeKey>(
  media: ProductMedia,
  key: K
): ProductMedia[K] | NonNullable<ProductMedia["attributes"]>[K] {
  return media[key] ?? media.attributes?.[key];
}

function buildImageUrl(media?: ProductMedia | null): string | null {
  if (!media) return null;
  const url = getMediaValue(media, "url");
  const uuid = getMediaValue(media, "uuid");
  const fileName = getMediaValue(media, "file_name");
  const name = getMediaValue(media, "name");
  if (url) return toAbsoluteStorageUrl(url);
  if (!uuid) return null;

  const conversions = getMediaValue(media, "generated_conversions") || {};
  const conversionName = getConversionName(conversions);

  if (conversionName) {
    const baseName =
      fileName?.replace(/\.[^/.]+$/, "") || name?.replace(/-v\d+$/, "");
    if (!baseName) return null;
    return toAbsoluteStorageUrl(
      `storage/${uuid}/conversions/${baseName}-${conversionName}.webp`
    );
  }

  return fileName
    ? toAbsoluteStorageUrl(`storage/${uuid}/${fileName}`)
    : null;
}

function getFirstRelatedImage(product: ProductDto): string {
  const media = getFirstRelationship(product.multimedia ?? product.media);
  return buildImageUrl(media) ?? "";
}

function getRelatedImages(product: ProductDto): string[] {
  const media = product.multimedia ?? product.media;
  const list = Array.isArray(media) ? media : media ? [media] : [];
  const urls: string[] = [];
  for (const item of list) {
    const url = buildImageUrl(item);
    if (url && !urls.includes(url)) urls.push(url);
  }
  return urls;
}

function getFirstRelatedCategoryImage(category: ProductCategoryDto): string {
  const media = getFirstRelationship(category.multimedia ?? category.media);
  return buildImageUrl(media) ?? "";
}

function getProductCategoryInfo(product: ProductDto): {
  slug?: string;
  name?: string;
} {
  const category = getFirstRelationship(
    product.productCategory ??
      product.productCategories ??
      product.product_category ??
      product.category ??
      product.categories
  );

  return {
    slug: category?.slug,
    name: category?.name,
  };
}

export function transformProduct(product: ProductDto): Product {
  const categoryInfo = getProductCategoryInfo(product);
  const pricing = resolveProductPricing(product);

  return {
    id: parseNumericId(product.id),
    name: product.name,
    price: pricing.value,
    formattedPrice: pricing.formatted,
    image: getFirstRelatedImage(product),
    images: getRelatedImages(product),
    description: stripHtml(product.description, 150),
    category: categoryInfo.name || categoryInfo.slug,
    categorySlug: categoryInfo.slug,
    slug: product.slug,
    token: product.token,
    inStock: product.in_stock,
    quantity: product.quantity,
    createdAt: product.created_at,
    updatedAt: product.updated_at,
  };
}

function transformProducts(products: ProductDto[]): Product[] {
  return products.map(transformProduct);
}

function normalizeSearchText(value: string | undefined): string {
  return value
    ?.toLocaleLowerCase()
    .replace(/[\s\-_]+/g, "")
    .trim() ?? "";
}

function productMatchesSearch(product: Product, search: string): boolean {
  const normalizedSearch = search.toLocaleLowerCase().trim();
  const compactSearch = normalizeSearchText(search);

  if (!normalizedSearch) return true;

  const candidates = [
    product.name,
    product.token,
  ].filter(Boolean) as string[];

  return candidates.some((candidate) => {
    const normalizedCandidate = candidate.toLocaleLowerCase();
    return (
      normalizedCandidate.includes(normalizedSearch) ||
      normalizeSearchText(candidate).includes(compactSearch)
    );
  });
}

function transformCategory(category: ProductCategoryDto): ProductCategory {
  return {
    id: parseNumericId(category.id),
    name: category.name,
    slug: category.slug,
    description: stripHtml(category.description, 500) || null,
    richDescription: category.description,
    position: category.position,
    status: category.status,
    updated_at: category.updated_at,
    image: getFirstRelatedCategoryImage(category),
  };
}

function transformCategories(categories: ProductCategoryDto[]): ProductCategory[] {
  return categories.map(transformCategory).sort((a, b) => a.position - b.position);
}

function withPlaceholderImage<T extends { image?: string }>(items: T[]): T[] {
  return items.map((item) => ({
    ...item,
    image: item.image || PLACEHOLDER_IMAGE,
  }));
}

function emptyProductsResult(page: number, perPage: number): FetchProductsResult {
  return {
    products: [],
    pagination: getPagination(undefined, { page, perPage }),
    links: extractCollectionLinks(undefined),
  };
}

function filteredProductsResult(
  products: Product[],
  search: string,
  page: number,
  perPage: number
): FetchProductsResult {
  const matchedProducts = products.filter((product) =>
    productMatchesSearch(product, search)
  );
  const total = matchedProducts.length;
  const lastPage = Math.max(1, Math.ceil(total / perPage));
  const currentPage = Math.min(page, lastPage);
  const fromIndex = (currentPage - 1) * perPage;
  const pageProducts = matchedProducts.slice(fromIndex, fromIndex + perPage);

  return {
    products: pageProducts,
    pagination: {
      currentPage,
      lastPage,
      perPage,
      total,
      from: total === 0 ? 0 : fromIndex + 1,
      to: fromIndex + pageProducts.length,
    },
    links: extractCollectionLinks(undefined),
  };
}

async function resolveProductCategoryId(slug: string): Promise<string | null> {
  const categories = await fetchProductCategories();
  const category = categories.find((item) => item.slug === slug);

  return category ? String(category.id) : null;
}

export async function fetchProducts(
  params: FetchProductsParams = {}
): Promise<FetchProductsResult> {
  const { page = 1, perPage = 15, category, search, slug, sort } = params;
  const queryParams = createPageQueryParams(page, perPage);
  const normalizedSearch = search?.trim();
  let path = "products";

  queryParams.append(
    "include",
    "multimedia,productCategory,latestProductPrice,productPrices"
  );
  appendOptionalQueryParam(queryParams, "filter[slug]", slug);
  appendOptionalQueryParam(queryParams, "sort", sort);

  if (category) {
    const categoryId = await resolveProductCategoryId(category);

    if (!categoryId) {
      return emptyProductsResult(page, perPage);
    }

    path = `product-categories/${categoryId}/products`;
  }

  if (normalizedSearch && !slug) {
    const searchPerPage = 100;
    const allProducts: Product[] = [];
    let searchPage = 1;
    let lastSearchPage = 1;

    do {
      const searchQueryParams = createPageQueryParams(searchPage, searchPerPage);
      searchQueryParams.append(
        "include",
        "multimedia,productCategory,latestProductPrice,productPrices"
      );
      appendOptionalQueryParam(searchQueryParams, "sort", sort);

      const response = await apiClient.get<ProductDto[]>(path, {
        query: searchQueryParams,
        next: { revalidate: 10 },
        mode: "cors",
        credentials: "omit",
      });

      allProducts.push(...transformProducts(response.data));
      lastSearchPage = getPagination(response.meta?.page, {
        page: searchPage,
        perPage: searchPerPage,
      }).lastPage;
      searchPage += 1;
    } while (searchPage <= lastSearchPage);

    return filteredProductsResult(allProducts, normalizedSearch, page, perPage);
  }

  const response = await apiClient.get<ProductDto[]>(path, {
    query: queryParams,
    next: sort === "random-position" ? { revalidate: 0 } : { revalidate: 10 },
    mode: "cors",
    credentials: "omit",
  });

  return {
    products: transformProducts(response.data),
    pagination: getPagination(response.meta?.page, { page, perPage }),
    links: extractCollectionLinks(response.links),
  };
}

export async function fetchProductsWithDetails(
  params: FetchProductsParams = {}
): Promise<FetchProductsResult> {
  const result = await fetchProducts(params);

  return {
    ...result,
    products: withPlaceholderImage(result.products),
  };
}

export async function fetchProduct(
  id: string | number
): Promise<Product | null> {
  try {
    const response = await apiClient.get<ProductDto | ProductDto[]>(
      `products/${id}`,
      {
        query: {
          include: "multimedia,productCategory,latestProductPrice,productPrices",
        },
        next: { revalidate: 10 },
        mode: "cors",
        credentials: "omit",
      }
    );
    const product = getFirstResource(response.data);
    return product ? transformProduct(product) : null;
  } catch (error) {
    if (error instanceof ApiClientError && error.status === 404) return null;
    throw error;
  }
}

export async function fetchProductBySlug(slug: string): Promise<Product | null> {
  const normalizedSlug = decodeURIComponent(slug).trim();
  const resourceId = getLeadingResourceId(normalizedSlug);

  if (!normalizedSlug) {
    return null;
  }

  if (resourceId) {
    return fetchProduct(resourceId);
  }

  const perPage = 100;
  let page = 1;
  let lastPage = 1;

  do {
    const result = await fetchProductsWithDetails({
      page,
      perPage,
    });
    const product = result.products.find(
      (candidate) => candidate.slug === normalizedSlug
    );

    if (product) {
      return (await fetchProduct(product.id)) ?? product;
    }

    lastPage = result.pagination.lastPage;
    page += 1;
  } while (page <= lastPage);

  return null;
}

export async function fetchProductCategories(): Promise<ProductCategory[]> {
  const response = await apiClient.get<ProductCategoryDto[]>(
    "product-categories",
    {
      query: {
        include: "multimedia",
        "filter[status]": "1",
      },
      next: { revalidate: 10 },
      mode: "cors",
      credentials: "omit",
    }
  );

  return transformCategories(response.data);
}

export function useProducts(
  params: FetchProductsParams = {},
  options?: ApiQueryOptions<FetchProductsResult>
) {
  return useQuery(
    createApiQueryOptions(productKeys.list(params), () =>
      fetchProductsWithDetails(params),
    options)
  );
}

export function useProduct(
  id: string | number,
  options?: ApiQueryOptions<Product | null>
) {
  return useQuery(
    createApiQueryOptions(productKeys.detail(id), () => fetchProduct(id), {
      enabled: Boolean(id),
      ...options,
    })
  );
}

export function useProductCategories(
  options?: ApiQueryOptions<ProductCategory[]>
) {
  return useQuery(
    createApiQueryOptions(productKeys.categories(), fetchProductCategories, {
      staleTime: 5 * 60 * 1000,
      ...options,
    })
  );
}
