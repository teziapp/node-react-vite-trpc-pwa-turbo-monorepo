import { QueryClient } from "@tanstack/react-query";
import { createTRPCReact, httpBatchLink, httpLink, splitLink } from "@trpc/react-query";
import { inferRouterOutputs } from "@trpc/server";
import { AppRouter } from '../../../api/src/trpc/router';
import { be_url } from "../config";

export const trpc = createTRPCReact<AppRouter>({
  abortOnUnmount: true,
});

export type RouterOutputs = inferRouterOutputs<AppRouter>;

const url = `${be_url}/trpc`;

// queryClient & trpc Client are placed inside a state hook in case of SSR.
export const trpcQueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      refetchOnWindowFocus: false,
    },
  },
});

export const trpcClient = trpc.createClient({
  links: [
    // customLink,
    splitLink({
      condition(op) {
        // check for context property `skipBatch`
        return op.context.skipBatch === true;
      },
      // when condition is true, use normal request
      true: httpLink({
        fetch: (url, options) => fetch(url, {
          ...options,
          credentials: 'include',
        }),
        url,
      }),
      // when condition is false, use batching
      false: httpBatchLink({
        fetch: (url, options) => fetch(url, {
          ...options,
          credentials: 'include',
        }),
        url,
      }),
    }),
  ],
});