"use client";

import { createElement, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type {
  MutationFunction,
  QueryFunction,
  QueryKey,
  UseMutationOptions,
  UseQueryOptions,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export function createQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
        gcTime: 10 * 60 * 1000,
        refetchOnWindowFocus: false,
        retry: 1,
      },
      mutations: {
        retry: 0,
      },
    },
  });
}

export const queryClient = createQueryClient();

export function clearApiQueryCache() {
  queryClient.clear();
}

export function ApiQueryProvider({ children }: { children: React.ReactNode }) {
  const [client] = useState(() => queryClient);
  const devtools =
    process.env.NODE_ENV === "development"
      ? createElement(ReactQueryDevtools, { initialIsOpen: false })
      : null;

  return createElement(
    QueryClientProvider,
    { client },
    children,
    devtools
  );
}

export type ApiQueryOptions<
  TQueryFnData,
  TError = Error,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
> = Omit<
  UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>,
  "queryKey" | "queryFn"
>;

export type ApiMutationOptions<
  TData,
  TVariables = void,
  TError = Error,
  TContext = unknown,
> = Omit<
  UseMutationOptions<TData, TError, TVariables, TContext>,
  "mutationFn"
>;

export function createApiQueryOptions<
  TQueryFnData,
  TError = Error,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
>(
  queryKey: TQueryKey,
  queryFn: QueryFunction<TQueryFnData, TQueryKey>,
  options?: ApiQueryOptions<TQueryFnData, TError, TData, TQueryKey>
): UseQueryOptions<TQueryFnData, TError, TData, TQueryKey> {
  return {
    queryKey,
    queryFn,
    ...options,
  };
}

export function createApiMutationOptions<
  TData,
  TVariables = void,
  TError = Error,
  TContext = unknown,
>(
  mutationFn: MutationFunction<TData, TVariables>,
  options?: ApiMutationOptions<TData, TVariables, TError, TContext>
): UseMutationOptions<TData, TError, TVariables, TContext> {
  return {
    mutationFn,
    ...options,
  };
}
