import type { JsonApiLinks, JsonApiPageMeta } from "@/shared/api/types";

export interface PostResource {
  id: string | number;
  type?: string;
  relationshipNames?: string[];
}

export interface PostMedia extends PostResource {
  url?: string;
  uuid?: string;
  generated_conversions?: Record<string, unknown>;
  file_name?: string;
  name?: string;
}

export interface PostCategorySummary extends PostResource {
  slug?: string;
  name?: string;
}

export interface PostCategoryDto extends PostResource {
  name: string;
  slug: string;
  description?: string;
  status?: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface PostDto extends PostResource {
  name: string;
  description?: unknown;
  slug: string;
  created_at: string;
  updated_at: string;
  multimedia?: PostMedia | PostMedia[];
  media?: PostMedia | PostMedia[];
  blogPostCategory?: PostCategorySummary | PostCategorySummary[];
}

export type Pagination = Pick<
  JsonApiPageMeta,
  "currentPage" | "lastPage" | "perPage" | "total" | "from" | "to"
>;

export type CollectionLinks = Pick<
  JsonApiLinks,
  "first" | "last" | "next" | "prev"
>;

export interface Post {
  id: number;
  title: string;
  content: string;
  /** Raw TipTap rich-text document (or HTML/markdown string) for rendering. */
  richContent?: unknown;
  excerpt: string;
  slug: string;
  image?: string;
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
  category?: string;
}

export interface PostCategory {
  id: number;
  name: string;
  slug: string;
  description?: string;
  status?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface FetchPostsParams {
  page?: number;
  perPage?: number;
  category?: string;
  locale?: string;
  search?: string;
  slug?: string;
}

export interface FetchPostsResult {
  posts: Post[];
  pagination: Pagination;
  links: CollectionLinks;
}

export interface PostPayload {
  name?: string;
  description?: unknown;
  slug?: string;
  status?: boolean;
}

export type CreatePostPayload = PostPayload;

export interface UpdatePostVariables {
  id: string | number;
  data: PostPayload;
}

export type FetchBlogPostsParams = FetchPostsParams;
export type FetchBlogPostsResult = FetchPostsResult;
