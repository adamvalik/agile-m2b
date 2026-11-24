import { InjectionToken } from '@angular/core';
import type { Step } from '../core/step';
import { loadSteps } from '../core/steps';

/**
 * All steps from content/steps/ (#44). Inject it with `inject(STEPS)`;
 * tests can provide their own list instead of the real step files.
 */
export const STEPS = new InjectionToken<readonly Step[]>('STEPS', {
  providedIn: 'root',
  factory: loadSteps,
});
