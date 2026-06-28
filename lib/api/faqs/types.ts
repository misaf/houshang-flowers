export interface FaqResource {
  id: string | number;
  type?: string;
  relationshipNames?: string[];
}

export interface FaqCategorySummary extends FaqResource {
  slug?: string;
  name?: string;
}

export interface FaqDto extends FaqResource {
  name: string;
  description?: unknown;
  position?: number | string;
  status?: boolean;
  created_at?: string;
  updated_at?: string;
  faqCategory?: FaqCategorySummary | FaqCategorySummary[];
}

export interface FaqCategoryDto extends FaqResource {
  name: string;
  slug: string;
  description?: string;
  status?: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface Faq {
  id: number;
  question: string;
  answer: string;
  position: number;
  category?: string;
  categorySlug?: string;
}

export interface FaqCategory {
  id: number;
  name: string;
  slug: string;
  description?: string;
  status?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface FetchFaqsParams {
  page?: number;
  perPage?: number;
  search?: string;
  category?: string;
}
