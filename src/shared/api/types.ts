export interface JsonApiPageMeta {
  currentPage: number;
  from: number;
  lastPage: number;
  perPage: number;
  to: number;
  total: number;
}

export interface JsonApiMeta {
  page?: JsonApiPageMeta;
}

export interface JsonApiLinks {
  first?: string;
  last?: string;
  next?: string;
  prev?: string;
  self?: string;
}
