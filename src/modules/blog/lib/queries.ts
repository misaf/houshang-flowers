import { useQuery } from "@tanstack/react-query";
import { ApiClientError, apiClient } from "@/shared/api/client";
import { createApiQueryOptions, type ApiQueryOptions } from "@/shared/api/query-client";
import { PLACEHOLDER_IMAGE, toAbsoluteStorageUrl } from "@/shared/lib/image";
import { getLeadingResourceId } from "@/shared/lib/slug-url";
import type { JsonApiLinks, JsonApiPageMeta } from "@/shared/api/types";
import { postKeys } from "./keys";
import type {
  CollectionLinks,
  FetchPostsParams,
  FetchPostsResult,
  Pagination,
  Post,
  PostCategory,
  PostCategoryDto,
  PostDto,
  PostMedia,
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

function buildImageUrl(media?: PostMedia | null): string | null {
  if (!media) return null;
  if (media.url) return toAbsoluteStorageUrl(media.url);
  if (!media.uuid) return null;

  const conversions = media.generated_conversions || {};
  const conversionName = getConversionName(conversions);

  if (conversionName) {
    const baseName =
      media.file_name?.replace(/\.[^/.]+$/, "") ||
      media.name?.replace(/-v\d+$/, "");
    if (!baseName) return null;
    return toAbsoluteStorageUrl(
      `storage/${media.uuid}/conversions/${baseName}-${conversionName}.webp`
    );
  }

  return media.file_name
    ? toAbsoluteStorageUrl(`storage/${media.uuid}/${media.file_name}`)
    : null;
}

function getFirstRelatedImage(post: PostDto): string {
  const media = getFirstRelationship(post.multimedia ?? post.media);
  return buildImageUrl(media) ?? "";
}

export function transformPost(post: PostDto): Post {
  const excerpt = stripHtml(post.description, 200);
  const category = getFirstRelationship(post.blogPostCategory);

  return {
    id: parseNumericId(post.id),
    title: post.name,
    content: stringifyRichText(post.description),
    richContent: post.description,
    excerpt,
    slug: post.slug,
    image: getFirstRelatedImage(post),
    publishedAt: undefined,
    createdAt: post.created_at,
    updatedAt: post.updated_at,
    category: category?.name || category?.slug,
  };
}

function transformPosts(posts: PostDto[]): Post[] {
  return posts.map(transformPost);
}

function transformPostCategory(category: PostCategoryDto): PostCategory {
  return {
    id: parseNumericId(category.id),
    name: category.name,
    slug: category.slug,
    description: category.description,
    status: category.status,
    createdAt: category.created_at,
    updatedAt: category.updated_at,
  };
}

function getCategoryTimestamp(category: PostCategory): number {
  const timestamp = Date.parse(category.updatedAt || category.createdAt || "");
  return Number.isFinite(timestamp) ? timestamp : 0;
}

function transformPostCategories(categories: PostCategoryDto[]): PostCategory[] {
  return categories
    .map(transformPostCategory)
    .sort((a, b) => {
      const timestampDiff = getCategoryTimestamp(b) - getCategoryTimestamp(a);
      return timestampDiff || b.id - a.id;
    });
}

function withPlaceholderImage<T extends { image?: string }>(items: T[]): T[] {
  return items.map((item) => ({
    ...item,
    image: item.image || PLACEHOLDER_IMAGE,
  }));
}

function emptyPostsResult(page: number, perPage: number): FetchPostsResult {
  return {
    posts: [],
    pagination: getPagination(undefined, { page, perPage }),
    links: extractCollectionLinks(undefined),
  };
}

async function resolvePostCategoryId(slug: string): Promise<string | null> {
  const categories = await fetchPostCategories();
  const category = categories.find((item) => item.slug === slug);

  return category ? String(category.id) : null;
}

export async function fetchPosts(
  params: FetchPostsParams = {}
): Promise<FetchPostsResult> {
  const { page = 1, perPage = 15, category, search, slug } = params;
  const queryParams = createPageQueryParams(page, perPage);
  let path = "blog-posts";

  queryParams.append("include", "multimedia,blogPostCategory");
  queryParams.append("filter[status]", "1");
  appendOptionalQueryParam(queryParams, "filter[search]", search);
  appendOptionalQueryParam(queryParams, "filter[slug]", slug);

  if (category) {
    const categoryId = await resolvePostCategoryId(category);

    if (!categoryId) {
      return emptyPostsResult(page, perPage);
    }

    path = `blog-post-categories/${categoryId}/blog-posts`;
  }

  const response = await apiClient.get<PostDto[]>(path, {
    query: queryParams,
    next: { revalidate: 10 },
    mode: "cors",
    credentials: "omit",
  });

  return {
    posts: transformPosts(response.data),
    pagination: getPagination(response.meta?.page, { page, perPage }),
    links: extractCollectionLinks(response.links),
  };
}

async function fetchPostById(id: string | number): Promise<Post | null> {
  try {
    const response = await apiClient.get<PostDto | PostDto[]>(
      `blog-posts/${id}`,
      {
        query: {
          include: "multimedia,blogPostCategory",
        },
        next: { revalidate: 10 },
        mode: "cors",
        credentials: "omit",
      }
    );
    const post = getFirstResource(response.data);
    return post ? transformPost(post) : null;
  } catch (error) {
    if (error instanceof ApiClientError && error.status === 404) return null;
    throw error;
  }
}

export async function fetchPost(slug: string): Promise<Post | null> {
  const normalizedSlug = decodeURIComponent(slug).trim();
  const resourceId = getLeadingResourceId(normalizedSlug);

  if (!normalizedSlug) {
    return null;
  }

  if (resourceId) {
    return fetchPostById(resourceId);
  }

  const perPage = 100;
  let page = 1;
  let lastPage = 1;

  do {
    const result = await fetchPostsWithDetails({
      page,
      perPage,
    });
    const post = result.posts.find(
      (candidate) => candidate.slug === normalizedSlug
    );

    if (post) {
      return (await fetchPostById(post.id)) ?? post;
    }

    lastPage = result.pagination.lastPage;
    page += 1;
  } while (page <= lastPage);

  return null;
}

export async function fetchPostsWithDetails(
  params: FetchPostsParams = {}
): Promise<FetchPostsResult> {
  const result = await fetchPosts(params);
  return {
    ...result,
    posts: withPlaceholderImage(result.posts),
  };
}

export async function fetchPostCategories(): Promise<PostCategory[]> {
  const response = await apiClient.get<PostCategoryDto[]>(
    "blog-post-categories",
    {
      query: {
        "page[size]": "50",
      },
      next: { revalidate: 10 },
      mode: "cors",
      credentials: "omit",
    }
  );

  return transformPostCategories(response.data).filter(
    (category) => category.status !== false
  );
}

export const fetchBlogPostCategories = fetchPostCategories;

export const fetchBlogPosts = fetchPosts;
export const fetchBlogPost = fetchPost;
export const fetchBlogPostsWithDetails = fetchPostsWithDetails;

export function usePosts(
  params: FetchPostsParams = {},
  options?: ApiQueryOptions<FetchPostsResult>
) {
  return useQuery(
    createApiQueryOptions(postKeys.list(params), () =>
      fetchPostsWithDetails(params),
    options)
  );
}

export function usePost(slug: string, options?: ApiQueryOptions<Post | null>) {
  return useQuery(
    createApiQueryOptions(postKeys.detail(slug), () => fetchPost(slug), {
      enabled: Boolean(slug),
      ...options,
    })
  );
}
