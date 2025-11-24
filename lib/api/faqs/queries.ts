import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/api/client";
import {
  createApiQueryOptions,
  type ApiQueryOptions,
} from "@/lib/api/query-client";
import { faqKeys } from "./keys";
import type { Faq, FaqDto, FetchFaqsParams } from "./types";

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
  return {
    id: parseNumericId(faq.id),
    question: faq.name,
    answer: toPlainText(faq.description),
    position: parsePosition(faq.position),
  };
}

export async function fetchFaqs(params: FetchFaqsParams = {}): Promise<Faq[]> {
  const { page = 1, perPage = 20, search } = params;
  const queryParams = new URLSearchParams({
    "page[number]": page.toString(),
    "page[size]": perPage.toString(),
  });

  queryParams.append("filter[status]", "1");
  queryParams.append("sort", "position");

  if (search) {
    queryParams.append("filter[search]", search);
  }

  const response = await apiClient.get<FaqDto[]>("faqs", {
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

export function useFaqs(
  params: FetchFaqsParams = {},
  options?: ApiQueryOptions<Faq[]>
) {
  return useQuery(
    createApiQueryOptions(faqKeys.list(params), () => fetchFaqs(params), options)
  );
}
