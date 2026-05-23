import type { RouterClient } from "@orpc/server";
import type { router } from "../../server/routers";
import { createORPCClient } from "@orpc/client";
import { RPCLink } from "@orpc/client/fetch";

export default defineNuxtPlugin({
  name: "orpc-client",
  setup() {
    const link = new RPCLink({
      url: `${window.location.origin}/rpc`,
      headers: () => ({}),
    });

    const client: RouterClient<typeof router> = createORPCClient(link);

    return {
      provide: {
        client,
      },
    };
  },
});
