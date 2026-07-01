import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import { RouteErrorOverlay, RoutePendingOverlay } from "./components/RouteFallbackOverlay";

export const getRouter = () => {
  const queryClient = new QueryClient();

  const router = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
    defaultPendingComponent: RoutePendingOverlay,
    defaultPendingMs: 0,
    defaultPendingMinMs: 350,
    defaultErrorComponent: RouteErrorOverlay,
  });

  return router;
};
