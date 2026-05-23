import type { RouterClient } from "@orpc/server";
import { createRouterClient } from "@orpc/server";
import type { router } from "../../server/routers";
import { router as appRouter } from "../../server/routers";

/**
 * Server-side client for SSR — avoids HTTP round-trips during render.
 * @see https://orpc.dev/docs/adapters/nuxt#optimize-ssr
 */
export default defineNuxtPlugin({
  name: "orpc-server",
  setup() {
    const event = useRequestEvent();

    const client: RouterClient<typeof router> = createRouterClient(appRouter, {
      context: {
        headers: event?.headers,
      },
    });

    return {
      provide: {
        client,
      },
    };
  },
});
