/**
 * Every key the app writes to `localStorage` starts with this prefix: the answers
 * (`m2b.answers`) and, later, the progress (#53). Clearing by prefix removes them all and
 * leaves data of other sites or apps on the same origin alone.
 */
export const STORAGE_PREFIX = 'm2b.';

/** The part of `localStorage` used here, so tests can pass an in-memory stand-in. */
export type ClearableStorage = Pick<Storage, 'key' | 'length' | 'removeItem'>;

/**
 * Removes everything the app stored on this device (#90). Returns false if the browser does
 * not allow it, so the page can say the data may still be there.
 */
export function clearStoredData(storage: ClearableStorage = localStorage): boolean {
  try {
    const keys: string[] = [];
    for (let i = 0; i < storage.length; i++) {
      const key = storage.key(i);
      if (key?.startsWith(STORAGE_PREFIX)) keys.push(key);
    }
    for (const key of keys) storage.removeItem(key);
    return true;
  } catch {
    return false;
  }
}
