import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/shared/api/client";
import {
  createApiQueryOptions,
  type ApiQueryOptions,
} from "@/shared/api/query-client";
import { faqKeys } from "./keys";
import type {
  Faq,
  FaqCategory,
  FaqCategoryDto,
  FaqCategorySummary,
  FaqDto,
  FetchFaqsParams,
} from "../types";

function parseNumericId(id: string | number): number {
  const value = typeof id === "number" ? id : Number.parseInt(id, 10);
  return Number.isFinite(value) ? value : 0;
}

function parsePosition(value: number | string | undefined): number {
  if (typeof value === "number") return Number.isFinite(value) ? value : 0;
  if (typeof value === "string") {
    const parsed = Number.parseInt(value, 10);
    return Number.isFinite(parsed) ? parsed : 0;
  }
  return 0;
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

function toPlainText(value: unknown): string {
  return stringifyRichText(value).replace(/<[^>]*>/g, "").trim();
}

function transformFaq(faq: FaqDto): Faq {
  const category = getFirstRelationship<FaqCategorySummary>(faq.faqCategory);

  return {
    id: parseNumericId(faq.id),
    question: faq.name,
    answer: toPlainText(faq.description),
    position: parsePosition(faq.position),
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

export async function fetchFaqs(params: FetchFaqsParams = {}): Promise<Faq[]> {
  const { page = 1, perPage = 20, search, category } = params;
  const queryParams = new URLSearchParams({
    "page[number]": page.toString(),
    "page[size]": perPage.toString(),
  });

  queryParams.append("include", "faqCategory");
  queryParams.append("filter[status]", "1");
  queryParams.append("sort", "position");

  if (search) {
    queryParams.append("filter[search]", search);
  }

  let path = "faqs";

  if (category) {
    const categoryId = await resolveFaqCategoryId(category);

    if (!categoryId) {
      return [];
    }

    path = `faq-categories/${categoryId}/faqs`;
  }

  const response = await apiClient.get<FaqDto[]>(path, {
    query: queryParams,
    next: { revalidate: 10 },
    mode: "cors",
    credentials: "omit",
  });

  return response.data
    .map(transformFaq)
    .filter((faq) => faq.question)
    .sort((a, b) => a.position - b.position || a.id - b.id);
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
