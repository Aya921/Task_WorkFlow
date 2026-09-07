import { MutationCache, QueryCache, QueryClient } from "@tanstack/react-query";
import { notifyErrorToast } from "../utils/toast_error_event";

export const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error) => notifyErrorToast(error),
  }),
  mutationCache: new MutationCache({
    onError: (error) => notifyErrorToast(error),
  }),
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 1000 * 60 * 5,  // After 5 minutes React Query may refetch on the next trigger
      gcTime: 1000 * 60 * 15,   // 15 min if the data is not used, the cache will be garbage collected
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
      refetchOnMount: true,
    },
  },
});