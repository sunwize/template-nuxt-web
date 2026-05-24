import { ORPCError } from "@orpc/server";

export const toOrpcError = (error: unknown): ORPCError<string, unknown> => {
  if (error instanceof ORPCError) {
    return error;
  }

  // Extend here with domain TaggedError → ORPCError mappings as they are added.
  return new ORPCError("INTERNAL_SERVER_ERROR");
};
