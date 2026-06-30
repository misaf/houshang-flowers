"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

/**
 * Returns `false` on the server and during the client's hydration render, then
 * `true` once mounted. Use it to gate client-only UI (e.g. localStorage-backed
 * state) so the first render matches the server and avoids a hydration mismatch.
 */
export function useHydrated(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false
  );
}
