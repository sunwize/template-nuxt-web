import { Layer, ManagedRuntime } from "effect";

export const AppLayer = Layer.empty;

export const appRuntime = ManagedRuntime.make(AppLayer);

export type AppRuntimeContext = ManagedRuntime.ManagedRuntime.Context<
  typeof appRuntime
>;
