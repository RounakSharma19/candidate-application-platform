import { Suspense } from "react";
import { Loader } from "@components";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { MainStackRouter } from "./router";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
      retryDelay: 2000,
      refetchOnWindowFocus:
        import.meta.env.MODE === "development" ? false : true,
    },
    mutations: {
      retry: 1,
      retryDelay: 2000,
    },
  },
});

const App = () => {
  return (
    <Suspense fallback={<Loader />}>
      <QueryClientProvider client={queryClient}>
        <main>
          <MainStackRouter />
        </main>
      </QueryClientProvider>
    </Suspense>
  );
};

export default App;
