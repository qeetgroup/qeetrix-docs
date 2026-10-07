"use client";

import { type ReactNode, useSyncExternalStore } from "react";

const subscribe = () => () => {};

/**
 * Renders its children in the browser only, once hydration is done: the server and the hydrating
 * client both render nothing, so output that depends on the clock or the runtime cannot differ.
 */
export function ClientOnly({ children }: { children: ReactNode }) {
  const hydrated = useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
  return hydrated ? children : null;
}
