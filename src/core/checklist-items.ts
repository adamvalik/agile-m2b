import type { Answers } from './answers';
import { addWorkingDays, fromIsoDate } from './arrival-date';
import type { ChecklistStep } from './checklist';

/**
 * How a step shows on the checklist (design/mobile/06-step-states.png):
 * - `next`: the one step to do now, the first required step that is neither done nor waiting
 * - `waiting`: a required step with a confirmed link to a step that is not done yet
 * - `optional`: the step file says `"optional": true`
 * - `todo`: any other required step
 * - `done`: the student marked the step as done (#13), whether it is required or optional
 */
export type StepState = 'next' | 'waiting' | 'optional' | 'todo' | 'done';

/** The fields a checklist row needs, on top of what `buildChecklist` reads. */
export type ItemStep = ChecklistStep & { readonly title: string; readonly startFromHome: boolean };

export interface ChecklistItem<T extends ItemStep = ItemStep> {
  readonly step: T;
  readonly state: StepState;
  /** Steps on this checklist that must be done first and are not done yet (confirmed links only). */
  readonly waitsFor: readonly T[];
  /** Steps on this checklist, not done yet, the step may wait for (unknown links): a note only. */
  readonly mayWaitFor: readonly T[];
  /** The deadline as a date, when the step has one that counts from arrival. */
  readonly dueDate: Date | null;
}

/**
 * Gives each step of an ordered checklist (from `buildChecklist`) its state, the steps it still
 * waits for and its due date.
 *
 * `done` holds the ids of the steps the student marked as done. A waiting step becomes available
 * once every step it needs through a confirmed link is done. Unknown links never make a step wait:
 * they stay a note until the linked step is done.
 */
export function toChecklistItems<T extends ItemStep>(
  ordered: readonly T[],
  answers: Pick<Answers, 'arrivalDate'>,
  done: ReadonlySet<string> = new Set(),
): ChecklistItem<T>[] {
  const byId = new Map(ordered.map((step) => [step.id, step]));
  const notDone = (step: T, status: 'confirmed' | 'unknown') =>
    step.requires
      .filter((link) => link.status === status && !done.has(link.step))
      .map((link) => byId.get(link.step))
      .filter((target): target is T => target !== undefined);
  const arrival = fromIsoDate(answers.arrivalDate);

  let nextGiven = false;
  return ordered.map((step): ChecklistItem<T> => {
    if (done.has(step.id)) {
      return { step, state: 'done', waitsFor: [], mayWaitFor: [], dueDate: dueDate(step, arrival) };
    }
    const waitsFor = notDone(step, 'confirmed');
    let state: StepState;
    if (step.optional) {
      state = 'optional';
    } else if (waitsFor.length > 0) {
      state = 'waiting';
    } else if (!nextGiven) {
      state = 'next';
      nextGiven = true;
    } else {
      state = 'todo';
    }
    return {
      step,
      state,
      waitsFor,
      mayWaitFor: notDone(step, 'unknown'),
      dueDate: dueDate(step, arrival),
    };
  });
}

/**
 * The due date of a step whose deadline counts from arrival. Deadlines that count from entry into
 * the Schengen area get no date, because the intake does not ask for that day.
 */
export function dueDate(step: Pick<ChecklistStep, 'deadline'>, arrival: Date | null): Date | null {
  if (!step.deadline || step.deadline.countsFrom !== 'arrival' || !arrival) return null;
  return addWorkingDays(arrival, step.deadline.workingDays);
}

/**
 * A short name for a step inside a sentence, from its title: "Get your tax code (codice fiscale)"
 * becomes "tax code", "Open an Italian bank account" becomes "Italian bank account".
 */
export function stepShortName(title: string): string {
  return title.replace(/\s*\([^)]*\)\s*$/, '').replace(/^\S+\s+(?:your|an|a|the)\s+/i, '');
}

/** The line under a step's title on the checklist. */
export function stepNote(item: ChecklistItem): string {
  const names = (steps: readonly ItemStep[]) => steps.map((s) => stepShortName(s.title)).join(', ');
  const parts: string[] = [];
  const deadline = item.step.deadline;
  if (item.waitsFor.length > 0) {
    parts.push(`Waits for: ${names(item.waitsFor)}.`);
  } else if (!deadline) {
    parts.push(item.step.startFromHome ? 'Start from home.' : 'After you arrive.');
  }
  if (deadline) {
    const days = `${deadline.workingDays} working ${deadline.workingDays === 1 ? 'day' : 'days'}`;
    const from = deadline.countsFrom === 'arrival' ? 'you arrive' : 'you enter the Schengen area';
    parts.push(`Within ${days} after ${from}.`);
  }
  if (item.waitsFor.length === 0 && item.mayWaitFor.length > 0) {
    parts.push(`May wait for: ${names(item.mayWaitFor)} (not confirmed yet).`);
  }
  return parts.join(' ');
}

/**
 * The steps that wait for this one through a confirmed link, for "Needed for" on its guide.
 * Pass only the steps on the student's checklist, so a step for other students is not listed.
 */
export function stepsNeeding<T extends ChecklistStep>(steps: readonly T[], id: string): T[] {
  return steps.filter((step) =>
    step.requires.some((link) => link.step === id && link.status === 'confirmed'),
  );
}
