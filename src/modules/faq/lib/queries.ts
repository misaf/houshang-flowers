import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/shared/api/client";
import {
  createApiQueryOptions,
  type ApiQueryOptions,
} from "@/shared/api/query-client";
import { stringifyRichText } from "@/shared/lib/rich-text";
import { parseNumericId } from "@/shared/lib/utils";
import { faqKeys } from "./keys";
import type {
  Faq,
  FaqCategory,
  FaqCategoryDto,
  FaqCategorySummary,
  FaqDto,
  FetchFaqsParams,
} from "../types";

function getFirstRelationship<T>(data: T | T[] | undefined): T | undefined {
  return Array.isArray(data) ? data[0] : data;
}

function toPlainText(value: unknown): string {
  return stringifyRichText(value).replace(/<[^>]*>/g, "").trim();
}

function transformFaq(faq: FaqDto): Faq {
  const category = getFirstRelationship<FaqCategorySummary>(faq.faqCategory);

  return {
    id: parseNumericId(faq.id),
    question: faq.name,
    answer: toPlainText(faq.description),
    position: parseNumericId(faq.position ?? 0),
    category: category?.name || category?.slug,
    categorySlug: category?.slug,
  };
}

function transformFaqCategory(category: FaqCategoryDto): FaqCategory {
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

async function resolveFaqCategoryId(slug: string): Promise<string | null> {
  const categories = await fetchFaqCategories();
  const category = categories.find((item) => item.slug === slug);

  return category ? String(category.id) : null;
}

async function fetchFaqCollection(
  path: string,
  queryParams: URLSearchParams
): Promise<Faq[]> {
  const response = await apiClient.get<FaqDto[]>(path, {
    query: queryParams,
    next: { revalidate: 10 },
    mode: "cors",
    credentials: "omit",
  });

  return response.data
    .map(transformFaq)
    .filter((faq) => faq.question);
}

function sortFaqs(faqs: Faq[]): Faq[] {
  return faqs.sort((a, b) => a.position - b.position || a.id - b.id);
}

function mergeFaqs(results: Faq[][]): Faq[] {
  const faqsById = new Map<number, Faq>();

  for (const result of results) {
    for (const faq of result) {
      if (!faqsById.has(faq.id)) {
        faqsById.set(faq.id, faq);
      }
    }
  }

  return sortFaqs([...faqsById.values()]);
}

function createFaqQueryParams(page: number, perPage: number): URLSearchParams {
  const queryParams = new URLSearchParams({
    "page[number]": page.toString(),
    "page[size]": perPage.toString(),
  });

  queryParams.append("include", "faqCategory");
  queryParams.append("filter[status]", "1");
  queryParams.append("sort", "position");
  return queryParams;
}

export async function fetchFaqs(params: FetchFaqsParams = {}): Promise<Faq[]> {
  const { page = 1, perPage = 20, search, category } = params;
  const queryParams = createFaqQueryParams(page, perPage);
  const normalizedSearch = search?.trim();

  let path = "faqs";

  if (category) {
    const categoryId = await resolveFaqCategoryId(category);

    if (!categoryId) {
      return [];
    }

    path = `faq-categories/${categoryId}/faqs`;
  }

  if (normalizedSearch) {
    const searchFilters = ["filter[name]", "filter[slug]"];
    const results = await Promise.all(
      searchFilters.map((filterKey) => {
        const searchQueryParams = createFaqQueryParams(page, perPage);
        searchQueryParams.append(filterKey, normalizedSearch);
        return fetchFaqCollection(path, searchQueryParams);
      })
    );

    return mergeFaqs(results);
  }

  return sortFaqs(await fetchFaqCollection(path, queryParams));
}

export async function fetchFaqCategories(): Promise<FaqCategory[]> {
  const response = await apiClient.get<FaqCategoryDto[]>("faq-categories", {
    query: {
      "page[size]": "50",
    },
    next: { revalidate: 10 },
    mode: "cors",
    credentials: "omit",
  });

  return response.data
    .map(transformFaqCategory)
    .filter((category) => category.status !== false && category.name);
}

export function useFaqs(
  params: FetchFaqsParams = {},
  options?: ApiQueryOptions<Faq[]>
) {
  return useQuery(
    createApiQueryOptions(faqKeys.list(params), () => fetchFaqs(params), options)
  );
}

export function useFaqCategories(options?: ApiQueryOptions<FaqCategory[]>) {
  return useQuery(
    createApiQueryOptions(faqKeys.categories(), () => fetchFaqCategories(), options)
  );
}
