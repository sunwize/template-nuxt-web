import type { ProcedureHandler } from "@orpc/server";
import { Cause, Effect, Exit } from "effect";

import { appRuntime, type AppRuntimeContext } from "../runtime";
import { OrpcContextLive, OrpcContextService, type OrpcContext } from "./context";
import { toOrpcError } from "./errors";

export type RunOrpcHandlerOptions<TContext extends OrpcContext, TInput> = {
  context: TContext;
  input: TInput;
  path: readonly string[];
};

export type RunOrpcEffectOptions = {
  span?: string;
};

type RunOrpcEffectServices = AppRuntimeContext | OrpcContextService;

export const runOrpcEffect = <TContext extends OrpcContext, TInput, A, E>(
  fn: (
    opts: RunOrpcHandlerOptions<TContext, TInput>,
  ) => Effect.Effect<A, E, RunOrpcEffectServices>,
  options?: RunOrpcEffectOptions,
): ProcedureHandler<TContext, TInput, A, Record<never, never>, Record<never, never>> => {
  return async (opts) => {
    const span = options?.span ?? opts.path.join(".");

    const exit = await appRuntime.runPromiseExit(
      fn(opts).pipe(
        Effect.provide(OrpcContextLive(opts.context)),
        Effect.tapErrorCause((cause) =>
          Effect.logError("orpc procedure failed", {
            error: Cause.squash(cause),
          }),
        ),
        Effect.annotateLogs("orpc.path", span),
        Effect.withLogSpan(span),
      ),
    );

    if (Exit.isSuccess(exit)) {
      return exit.value;
    }

    throw toOrpcError(Cause.squash(exit.cause));
  };
};
