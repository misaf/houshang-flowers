import type { FetchPostsParams } from "../types";

export function buildBlogQueryKey(category: string, searchQuery: string): string {
  return `${category}|${searchQuery}`;
}

export const postKeys = {
  all: ["posts"] as const,
  lists: () => [...postKeys.all, "list"] as const,
  list: (params: FetchPostsParams = {}) => [...postKeys.lists(), params] as const,
  details: () => [...postKeys.all, "detail"] as const,
  detail: (idOrSlug: string | number) =>
    [...postKeys.details(), String(idOrSlug)] as const,
};
