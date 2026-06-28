import type { FetchProductsParams } from "../types";

export const productKeys = {
  all: ["products"] as const,
  lists: () => [...productKeys.all, "list"] as const,
  list: (params: FetchProductsParams = {}) =>
    [...productKeys.lists(), params] as const,
  details: () => [...productKeys.all, "detail"] as const,
  detail: (id: string | number) => [...productKeys.details(), String(id)] as const,
  categories: () => [...productKeys.all, "categories"] as const,
};
