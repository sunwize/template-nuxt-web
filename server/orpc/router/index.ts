import { Effect } from "effect";
import * as z from "zod";

import { publicProcedure } from "../procedures/public";
import { runOrpcEffect } from "../runOrpcEffect";

export const ping = publicProcedure.handler(
  runOrpcEffect(() => Effect.succeed("pong"), { span: "ping" })
);

export const hello = publicProcedure
  .input(z.object({ name: z.string().optional() }))
  .handler(
    runOrpcEffect(
      ({ input }) =>
        Effect.succeed({ message: `Hello, ${input.name ?? "World"}!` }),
      { span: "hello" }
    )
  );

export const router = {
  ping,
  hello,
};

export type Router = typeof router;
