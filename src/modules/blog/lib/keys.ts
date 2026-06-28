import type { FetchPostsParams } from "../types";

export const postKeys = {
  all: ["posts"] as const,
  lists: () => [...postKeys.all, "list"] as const,
  list: (params: FetchPostsParams = {}) => [...postKeys.lists(), params] as const,
  details: () => [...postKeys.all, "detail"] as const,
  detail: (idOrSlug: string | number) =>
    [...postKeys.details(), String(idOrSlug)] as const,
};
