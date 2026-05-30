import { RPCHandler } from "@orpc/server/fetch";
import { router } from "../../orpc/router";

const rpcHandler = new RPCHandler(router);

export default defineEventHandler(async (event) => {
  const request = toWebRequest(event);

  const { response } = await rpcHandler.handle(request, {
    prefix: "/api/rpc",
    context: { event },
  });

  if (response) {
    return response;
  }

  setResponseStatus(event, 404, "Not Found");
  return "Not found";
});
