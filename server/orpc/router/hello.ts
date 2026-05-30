import { Effect } from "effect";
import z from "zod";
import { publicProcedure } from "../procedures/public";
import { runOrpcEffect } from "../runOrpcEffect";

export const hello = publicProcedure
  .input(z.object({ name: z.string().optional() }))
  .handler(
    runOrpcEffect(
      ({ input }) =>
        Effect.succeed({ message: `Hello, ${input.name ?? "World"}!` }),
      { span: "hello" }
    )
  );
