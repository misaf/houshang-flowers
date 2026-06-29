"use client";

import { useEffect, useRef, useState } from "react";
import { getStorageItem, setStorageItem } from "@/shared/lib/storage";

/**
 * State backed by localStorage: lazily hydrated from `key` on mount and
 * persisted on every subsequent change. The initial value read from storage
 * is not written back, so mounting a provider is a no-op for storage.
 */
export function usePersistentState<T>(key: string, defaultValue: T) {
  const [value, setValue] = useState<T>(() => getStorageItem<T>(key, defaultValue));

  const hydrated = useRef(false);
  useEffect(() => {
    if (!hydrated.current) {
      hydrated.current = true;
      return;
    }
    setStorageItem(key, value);
  }, [key, value]);

  return [value, setValue] as const;
}
