/** The `localStorage` key for the done marks, next to the answers (`m2b.answers`). */
export const PROGRESS_STORAGE_KEY = 'm2b.progress';

/** The part of `localStorage` used here, so tests can pass an in-memory stand-in. */
export type ProgressStorage = Pick<Storage, 'getItem' | 'setItem'>;

/**
 * Reads the ids of the steps the student marked as done. Returns no marks when nothing is saved,
 * when the saved data cannot be used, or when the browser does not allow reading it.
 *
 * The marks can include steps that are not on the student's checklist, for example after the
 * student changes their answers, so check them against the checklist before counting them.
 */
export function loadDone(storage: ProgressStorage = localStorage): ReadonlySet<string> {
  try {
    const raw = storage.getItem(PROGRESS_STORAGE_KEY);
    if (!raw) return new Set();
    const data: unknown = JSON.parse(raw);
    if (!Array.isArray(data)) return new Set();
    return new Set(data.filter((id): id is string => typeof id === 'string'));
  } catch {
    return new Set();
  }
}

/**
 * Saves the done marks on this device only: the step ids and nothing else. Returns false if the
 * browser does not allow it.
 */
export function saveDone(
  done: ReadonlySet<string>,
  storage: ProgressStorage = localStorage,
): boolean {
  try {
    storage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify([...done]));
    return true;
  } catch {
    return false;
  }
}

/**
 * Marks a step as done, or removes the mark when the step is already done. Returns new marks and
 * leaves `done` as it is; pass the result to `saveDone` to keep it.
 */
export function toggleDone(done: ReadonlySet<string>, id: string): ReadonlySet<string> {
  const next = new Set(done);
  if (next.has(id)) {
    next.delete(id);
  } else {
    next.add(id);
  }
  return next;
}
