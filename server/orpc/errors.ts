import { ORPCError } from "@orpc/server";

export const toOrpcError = (error: unknown): ORPCError<string, unknown> => {
  if (error instanceof ORPCError) {
    return error;
  }

  return new ORPCError("INTERNAL_SERVER_ERROR", { cause: error });
};
