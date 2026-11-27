// Types for one step of the checklist, matching content/step.schema.json (#43).
// The step data itself is generated from content/steps/ at build time (#44).

import type { Stay } from './answers';

/** Who a step applies to. */
export type Audience = 'eu' | 'non-eu';

/** A step that must be done first. "unknown" links are not shown as firm requirements. */
export interface StepLink {
  readonly step: string;
  readonly status: 'confirmed' | 'unknown';
}

export interface Deadline {
  readonly workingDays: number;
  readonly countsFrom: 'arrival' | 'schengen-entry';
}

export interface Source {
  readonly title: string;
  readonly url: string;
}

export interface BringItem {
  readonly text: string;
  readonly optional?: boolean;
}

export interface Guide {
  readonly whatItIs: readonly string[];
  readonly bring: readonly BringItem[];
  readonly fromHome?: readonly string[];
  readonly afterArrival?: readonly string[];
  readonly commonMistakes: readonly string[];
  readonly whatComesNext: readonly string[];
}

export interface Pass {
  readonly name: string;
  readonly price: string;
  /** How long the pass is valid. */
  readonly period: string;
  /** Only for people under this age when they order; null if the pass has no age rule. */
  readonly ageLimit: number | null;
  /** The stays the pass is worth it for. */
  readonly fitsStay: readonly Stay[];
  readonly whoCanGetIt: string;
}

export interface Step {
  /** The file name without .json, for example "tax-code". */
  readonly id: string;
  readonly title: string;
  readonly appliesTo: readonly Audience[];
  readonly optional: boolean;
  readonly startFromHome: boolean;
  readonly requires: readonly StepLink[];
  readonly deadline: Deadline | null;
  /** Official sources; the first one is the main source. */
  readonly sources: readonly Source[];
  /** Date the facts were last checked, as YYYY-MM-DD. */
  readonly lastChecked: string;
  readonly guide: Guide;
  /** Only on the transport pass, in the order to show them. */
  readonly passes?: readonly Pass[];
}
