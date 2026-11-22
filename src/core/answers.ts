import { checkArrivalDate } from './arrival-date';

/**
 * EU or non-EU citizen. The same values as `appliesTo` in content/step.schema.json, and the same
 * name as in the checklist builder (#51), so saved answers can be passed to `buildChecklist`.
 */
export type StudentStatus = 'eu' | 'non-eu';

/** The student's answers to the two intake questions. Nothing else is ever stored. */
export interface Answers {
  status: StudentStatus;
  /** Calendar day as YYYY-MM-DD. */
  arrivalDate: string;
}

export const ANSWERS_STORAGE_KEY = 'm2b.answers';

/** The part of `localStorage` used here, so tests can pass an in-memory stand-in. */
export type AnswersStorage = Pick<Storage, 'getItem' | 'setItem'>;

export function isAnswers(value: unknown): value is Answers {
  if (typeof value !== 'object' || value === null) return false;
  const { status, arrivalDate } = value as Record<string, unknown>;
  return (
    (status === 'eu' || status === 'non-eu') &&
    typeof arrivalDate === 'string' &&
    checkArrivalDate(arrivalDate) === null
  );
}

/** Reads the saved answers, or returns null when there are none or they cannot be used. */
export function loadAnswers(storage: AnswersStorage = localStorage): Answers | null {
  try {
    const raw = storage.getItem(ANSWERS_STORAGE_KEY);
    if (!raw) return null;
    const data: unknown = JSON.parse(raw);
    if (!isAnswers(data)) return null;
    return { status: data.status, arrivalDate: data.arrivalDate };
  } catch {
    return null;
  }
}

/** Saves the answers on this device only. Returns false if the browser does not allow it. */
export function saveAnswers(answers: Answers, storage: AnswersStorage = localStorage): boolean {
  try {
    const { status, arrivalDate } = answers;
    storage.setItem(ANSWERS_STORAGE_KEY, JSON.stringify({ status, arrivalDate }));
    return true;
  } catch {
    return false;
  }
}
