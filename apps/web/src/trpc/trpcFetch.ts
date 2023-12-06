import { httpLink } from "@trpc/client/links/httpLink";
// useState is not needed for client side rendering. Needed only for SSR.
// import { useState } from "react";
import { createTRPCProxyClient, httpBatchLink, splitLink } from "@trpc/client";
import { AppRouter } from "../../../api/src/trpc/router";
import { be_url } from "../config";

const url = `${be_url}/trpc`;

// centralised error handling --> https://trpc.io/docs/v9/links#creating-a-custom-link
// const customLink: TRPCLink<AppRouter> = (runtime) => {
//   // here we just got initialized in the app - this happens once per app
//   // useful for storing cache for instance
//   return ({ prev, next, op }) => {
//     // this is when passing the result to the next link
//     next(op, (result) => {
//       // this is when we've gotten result from the server
//       if (result instanceof Error) {
//         // maybe send to bugsnag?
//       }
//       prev(result);
//     });
//   };
// };

export const trpcFetch = createTRPCProxyClient<AppRouter>({
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
        // headers:({op}) => ({
        //   'Authorization': `Bearer ${userObjCache.getItem()?.token}`
        // })
      }),
      // when condition is false, use batching
      false: httpBatchLink({
        fetch: (url, options) => fetch(url, {
          ...options,
          credentials: 'include',
        }),
        // headers: ({opList}) => ({
        //   'Authorization': `Bearer ${userObjCache.getItem()?.token}`
        // }),
        url,
      }),
    }),
    // httpLink({
    //   url,
    //   headers:({op}) => ({
    //     'Authorization': `Bearer ${userObjCache.getItem()?.token}`
    //   })
    // })
  ],
});