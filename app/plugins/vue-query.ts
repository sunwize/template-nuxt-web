import type { DehydratedState } from "@tanstack/vue-query";
import {
  dehydrate,
  hydrate,
  QueryClient,
  VueQueryPlugin,
} from "@tanstack/vue-query";

// Nuxt 3 app aliases
import { defineNuxtPlugin, useState } from "#imports";

export default defineNuxtPlugin({
  name: "vue-query",
  setup: (nuxt) => {
    const vueQueryState = useState<DehydratedState | null>("vue-query");

    const queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: 1000 * 60 * 5, // 5 minutes
          experimental_prefetchInRender: true,
        },
      },
    });

    nuxt.vueApp.use(VueQueryPlugin, { queryClient });

    if (import.meta.server) {
      nuxt.hooks.hook("app:rendered", () => {
        vueQueryState.value = dehydrate(queryClient);
      });
    }

    if (import.meta.client) {
      nuxt.hooks.hook("app:mounted", () => {
        hydrate(queryClient, vueQueryState.value);
      });
    }
  },
});
