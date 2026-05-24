import { Context, Layer } from "effect";
import type { H3Event } from "h3";

export type OrpcContext = {
  event: H3Event;
  user?: {
    id: string;
  };
};

export class OrpcContextService extends Context.Tag("OrpcContext")<
  OrpcContextService,
  OrpcContext
>() {}

export const OrpcContextLive = (context: OrpcContext) =>
  Layer.succeed(OrpcContextService, context);
