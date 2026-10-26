import { MutationCache, QueryCache, QueryClient } from "@tanstack/react-query";
import type { ApiClientError } from "@shared/api";

const shouldRetry = (failureCount: number, error: unknown) => {
  if (failureCount >= 2) return false;
  const response = error as ApiClientError;

  if (response?.status) return false;

  if (
    response?.status >= 400 &&
    response?.status < 500 &&
    response?.status !== 429
  )
    return false;
  return true;
};

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60_000,
      gcTime: 5 * 60_000,
      refetchOnWindowFocus: false,
      retry: shouldRetry,
    },
    mutations: {
      retry: 0,
    },
  },
  queryCache: new QueryCache({
    onError: (error, query) => {
      // Only show toast if the query doesn't handle the error itself
      if (query.meta?.errorMessage) {
        console.error(`Query Error: ${query.meta.errorMessage}`);
        // toast.error(query.meta.errorMessage as string);
      } else {
        console.error("Something went wrong fetching data:", error);
        // toast.error('Failed to fetch data');
      }
    },
  }),
  // 3. Global Error Handling for Mutations (POST/PUT/DELETE requests)
  mutationCache: new MutationCache({}),
});
