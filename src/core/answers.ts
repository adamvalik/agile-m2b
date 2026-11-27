import { checkArrivalDate } from './arrival-date';
import type { Audience } from './step';

/** How long the student stays in Bolzano (#76). Every exchange stays at least one semester. */
export type Stay = 'semester' | 'year';

/** Whether the student is under 26 on arrival (#76). The question is optional. */
export type Under26 = 'yes' | 'no' | 'prefer-not-to-say';

/**
 * The student's answers to the intake questions. Nothing else is ever stored: no birth date
 * and no exact dates of stay. They fit `ChecklistAnswers`, so they can be passed straight to
 * `buildChecklist` (#51).
 */
export interface Answers {
  /** EU or non-EU citizen. */
  status: Audience;
  /** Calendar day as YYYY-MM-DD. */
  arrivalDate: string;
  /** One semester or a full year. */
  stay: Stay;
  /** Left out when the student skipped the question. */
  under26?: Under26;
}

export const ANSWERS_STORAGE_KEY = 'm2b.answers';

/** The part of `localStorage` used here, so tests can pass an in-memory stand-in. */
export type AnswersStorage = Pick<Storage, 'getItem' | 'setItem'>;

export function isStay(value: unknown): value is Stay {
  return value === 'semester' || value === 'year';
}

export function isUnder26(value: unknown): value is Under26 {
  return value === 'yes' || value === 'no' || value === 'prefer-not-to-say';
}

/**
 * Keeps only the answers that are known and valid. An unknown age answer is dropped, since
 * the question is optional; the other answers stay.
 */
function pickAnswers(value: unknown): Partial<Answers> {
  if (typeof value !== 'object' || value === null) return {};
  const { status, arrivalDate, stay, under26 } = value as Record<string, unknown>;
  const picked: Partial<Answers> = {};
  if (status === 'eu' || status === 'non-eu') picked.status = status;
  if (typeof arrivalDate === 'string' && checkArrivalDate(arrivalDate) === null) {
    picked.arrivalDate = arrivalDate;
  }
  if (isStay(stay)) picked.stay = stay;
  if (isUnder26(under26)) picked.under26 = under26;
  return picked;
}

function isComplete(answers: Partial<Answers>): answers is Answers {
  return (
    answers.status !== undefined && answers.arrivalDate !== undefined && answers.stay !== undefined
  );
}

export function isAnswers(value: unknown): value is Answers {
  return isComplete(pickAnswers(value));
}

/**
 * Reads whatever valid answers are saved, even when some required ones are missing, for
 * example answers saved before the stay question existed. The intake fills them in again.
 */
export function loadSavedAnswers(storage: AnswersStorage = localStorage): Partial<Answers> {
  try {
    const raw = storage.getItem(ANSWERS_STORAGE_KEY);
    if (!raw) return {};
    return pickAnswers(JSON.parse(raw));
  } catch {
    return {};
  }
}

/**
 * Reads the saved answers, or returns null when there are none or a required one is missing
 * or cannot be used. Then the student goes back to the intake.
 */
export function loadAnswers(storage: AnswersStorage = localStorage): Answers | null {
  const saved = loadSavedAnswers(storage);
  return isComplete(saved) ? saved : null;
}

/** Saves the answers on this device only. Returns false if the browser does not allow it. */
export function saveAnswers(answers: Answers, storage: AnswersStorage = localStorage): boolean {
  try {
    storage.setItem(ANSWERS_STORAGE_KEY, JSON.stringify(pickAnswers(answers)));
    return true;
  } catch {
    return false;
  }
}
