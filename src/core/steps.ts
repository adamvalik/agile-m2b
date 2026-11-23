// Loads the steps the app shows (#44).
//
// The data comes from src/core/steps.generated.ts, which scripts/build-steps.mjs
// writes from content/steps/ before every start, test and build. Code in the app
// should get steps from here, never from the generated file directly.

import type { Step } from './step';
import { stepData } from './steps.generated';

/** All steps from content/steps/, checked and sorted by id. */
export function loadSteps(): readonly Step[] {
  return stepData;
}

/** The step with the given id, or undefined if there is none. */
export function findStep(steps: readonly Step[], id: string): Step | undefined {
  return steps.find((step) => step.id === id);
}

/** The main official source of a step: the first one in its file. */
export function mainSource(step: Step): Step['sources'][number] {
  return step.sources[0];
}
