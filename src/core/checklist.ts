import type { Audience, Step } from './step';

/** The intake answers the checklist depends on (#5). */
export interface ChecklistAnswers {
  /** EU or non-EU citizen, as the student answers in the intake. */
  status: Audience;
}

/**
 * The fields of a step that the checklist reads, taken from `Step` in step.ts. Full steps
 * with a title, sources and guide fit this type too and are returned unchanged.
 */
export type ChecklistStep = Pick<Step, 'id' | 'appliesTo' | 'optional' | 'requires' | 'deadline'>;

/**
 * Builds the student's checklist: keeps the steps that apply to them and orders them so
 * every step comes after the steps it requires.
 *
 * - Only links with status "confirmed" set the order. "unknown" links are hints and never
 *   move a step (research/step-facts/README.md).
 * - A link to a step that is not on this student's checklist is ignored, for example the
 *   bank account's link to the residence permit for an EU student.
 * - When several steps could come next, a step with a deadline goes first (the fewest
 *   working days first), then required steps before optional ones, then the input order.
 *
 * The content check (scripts/check-content.mjs) rejects loops in `requires` before a build,
 * so the error thrown for a loop here should never reach a student.
 */
export function buildChecklist<T extends ChecklistStep>(
  steps: readonly T[],
  answers: ChecklistAnswers,
): T[] {
  const forStudent = steps.filter((step) => step.appliesTo.includes(answers.status));
  const onChecklist = new Set(forStudent.map((step) => step.id));
  const waitsFor = new Map(
    forStudent.map((step) => [
      step.id,
      step.requires
        .filter((link) => link.status === 'confirmed' && onChecklist.has(link.step))
        .map((link) => link.step),
    ]),
  );

  const ordered: T[] = [];
  const placed = new Set<string>();
  let remaining = forStudent;

  while (remaining.length > 0) {
    const ready = remaining.filter((step) =>
      (waitsFor.get(step.id) ?? []).every((id) => placed.has(id)),
    );
    if (ready.length === 0) {
      const ids = remaining.map((step) => step.id).join(', ');
      throw new Error(`Cannot order the checklist: the "requires" links form a loop among ${ids}`);
    }
    // `ready` keeps the input order, so on a tie the earlier step stays the pick.
    const next = ready.reduce((pick, step) => (comesBefore(step, pick) ? step : pick));
    ordered.push(next);
    placed.add(next.id);
    remaining = remaining.filter((step) => step !== next);
  }

  return ordered;
}

/** Whether `a` should come before `b` when both could be done next. */
function comesBefore(a: ChecklistStep, b: ChecklistStep): boolean {
  const daysA = a.deadline?.workingDays ?? Infinity;
  const daysB = b.deadline?.workingDays ?? Infinity;
  if (daysA !== daysB) {
    return daysA < daysB;
  }
  return !a.optional && b.optional;
}
