// Types for one step of the checklist, matching content/step.schema.json (#43).
// The step data itself is generated from content/steps/ at build time (#44).

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
}
