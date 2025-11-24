/**
 * Safe localStorage utilities with error handling
 */

function canUseLocalStorage(): boolean {
  return typeof window !== "undefined";
}

export function getStorageItem<T>(key: string, defaultValue: T): T {
  if (!canUseLocalStorage()) return defaultValue;

  try {
    const item = localStorage.getItem(key);
    if (!item) return defaultValue;
    return JSON.parse(item) as T;
  } catch (error) {
    console.error(`Error loading ${key} from localStorage:`, error);
    return defaultValue;
  }
}

export function setStorageItem<T>(key: string, value: T): void {
  if (!canUseLocalStorage()) return;

  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error saving ${key} to localStorage:`, error);
  }
}
