import { QueryClientProvider } from "@tanstack/react-query";
import { trpc, trpcClient, trpcQueryClient } from "./trpc";

export const App = () => {
  return (
    <trpc.Provider client={trpcClient} queryClient={trpcQueryClient}>
      <QueryClientProvider client={trpcQueryClient}>
        <div>Im here</div>
      </QueryClientProvider>
    </trpc.Provider>
  );
};