import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./assets/global.css";
import "./shared/libs/i18n";
import Provider from "./provider.tsx";
import {
  RouterProvider,
  createRouter,
  createMemoryHistory,
} from "@tanstack/react-router";

// Import the generated route tree
import { routeTree } from "./routeTree.gen";
import { setupDatabase } from "./db/index.ts";

// Create a new router instance
const router = createRouter({
  routeTree,
  history: createMemoryHistory(),
});

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
async function bootstrap() {
  try {
    await setupDatabase();
    const container = document.getElementById("root");
    if (container) {
      const root = createRoot(container);
      root.render(
        <StrictMode>
          <Provider>
            <RouterProvider router={router} />
          </Provider>
        </StrictMode>,
      );
    }
  } catch (error) {
    console.error("Failed to bootstrap the app:", error);
  }
}

bootstrap();
