import { os } from "@orpc/server";
import * as z from "zod";

export const ping = os.handler(async () => "pong");

export const hello = os
  .input(z.object({ name: z.string().optional() }))
  .handler(async ({ input }) => ({
    message: `Hello, ${input.name ?? "World"}!`,
  }));

export const router = {
  ping,
  hello,
};

export type Router = typeof router;
