import { defaultShouldDehydrateQuery, isServer, QueryClient } from "@tanstack/react-query";

// https://tanstack.com/query/latest/docs/framework/react/guides/advanced-ssr
function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      dehydrate: {
        // include pending queries in dehydration
        shouldDehydrateQuery: (query) => defaultShouldDehydrateQuery(query) || query.state.status === "pending",
      },
      queries: {
        refetchOnMount: false,
        refetchOnReconnect: false,
        refetchOnWindowFocus: false,
        staleTime: 60 * 1000,
      },
    },
  });
}

let browserQueryClient: QueryClient | undefined;

export function getQueryClient() {
  if (isServer) {
    return makeQueryClient();
  } else {
    if (!browserQueryClient) {
      browserQueryClient = makeQueryClient();
    }
    return browserQueryClient;
  }
}
