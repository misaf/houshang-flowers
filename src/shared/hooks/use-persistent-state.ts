"use client";

import { useEffect, useRef, useState } from "react";
import { getStorageItem, setStorageItem } from "@/shared/lib/storage";

/**
 * State backed by localStorage. To stay hydration-safe, the first render — on the
 * server and during the client's hydration pass — always uses `defaultValue`, so
 * the markup matches. The persisted value is adopted from `key` in an effect
 * after mount, then written back on every subsequent change. (Reading storage in
 * the `useState` initializer instead would diverge the hydration render from the
 * server and throw a hydration mismatch.)
 */
export function usePersistentState<T>(key: string, defaultValue: T) {
  const [value, setValue] = useState<T>(defaultValue);

  const defaultRef = useRef(defaultValue);
  const hydrated = useRef(false);
  useEffect(() => {
    if (!hydrated.current) {
      hydrated.current = true;
      setValue(getStorageItem<T>(key, defaultRef.current));
      return;
    }
    setStorageItem(key, value);
  }, [key, value]);

  return [value, setValue] as const;
}
