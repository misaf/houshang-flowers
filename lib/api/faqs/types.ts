export interface FaqResource {
  id: string | number;
  type?: string;
  relationshipNames?: string[];
}

export interface FaqDto extends FaqResource {
  name: string;
  description?: unknown;
  position?: number | string;
  status?: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface Faq {
  id: number;
  question: string;
  answer: string;
  position: number;
}

export interface FetchFaqsParams {
  page?: number;
  perPage?: number;
  search?: string;
}
