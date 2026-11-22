import { buildChecklist, type ChecklistStep, type StepLink } from './checklist';

function step(id: string, fields: Partial<ChecklistStep> = {}): ChecklistStep {
  return {
    id,
    appliesTo: ['eu', 'non-eu'],
    optional: false,
    requires: [],
    deadline: null,
    ...fields,
  };
}

const confirmed = (id: string): StepLink => ({ step: id, status: 'confirmed' });
const unknown = (id: string): StepLink => ({ step: id, status: 'unknown' });
const ids = (steps: readonly ChecklistStep[]) => steps.map((s) => s.id);

/**
 * The five official steps with the `requires` links suggested in research/step-facts/README.md,
 * sorted by file name like the step files in content/steps/.
 */
const officialSteps = [
  step('bank-account', {
    optional: true,
    requires: [confirmed('tax-code'), confirmed('residence-permit'), unknown('sim-card')],
  }),
  step('residence-permit', {
    appliesTo: ['non-eu'],
    deadline: { workingDays: 8, countsFrom: 'arrival' },
  }),
  step('sim-card', { optional: true, requires: [unknown('tax-code')] }),
  step('tax-code', { requires: [unknown('residence-permit')] }),
  step('transport-pass', {
    requires: [confirmed('tax-code'), unknown('residence-permit'), unknown('sim-card')],
  }),
];

describe('buildChecklist', () => {
  it('gives an EU student every step except the residence permit, tax code first', () => {
    const checklist = buildChecklist(officialSteps, { status: 'eu' });

    expect(ids(checklist)).toEqual(['tax-code', 'transport-pass', 'bank-account', 'sim-card']);
  });

  it('gives a non-EU student the residence permit first, then the tax code', () => {
    const checklist = buildChecklist(officialSteps, { status: 'non-eu' });

    expect(ids(checklist)).toEqual([
      'residence-permit',
      'tax-code',
      'transport-pass',
      'bank-account',
      'sim-card',
    ]);
  });

  it('puts the tax code before its dependants for both students, whatever the input order', () => {
    const reversed = [...officialSteps].reverse();

    for (const status of ['eu', 'non-eu'] as const) {
      const order = ids(buildChecklist(reversed, { status }));
      expect(order.indexOf('tax-code')).toBeLessThan(order.indexOf('transport-pass'));
      expect(order.indexOf('tax-code')).toBeLessThan(order.indexOf('bank-account'));
    }
  });

  it('puts the bank account after the residence permit for a non-EU student', () => {
    const order = ids(buildChecklist(officialSteps, { status: 'non-eu' }));

    expect(order.indexOf('residence-permit')).toBeLessThan(order.indexOf('bank-account'));
  });

  it('does not let unknown links change the order', () => {
    const steps = [step('first', { requires: [unknown('second')] }), step('second')];

    expect(ids(buildChecklist(steps, { status: 'eu' }))).toEqual(['first', 'second']);
  });

  it('puts steps with a deadline first, then required before optional, then keeps the input order', () => {
    const steps = [
      step('optional-a', { optional: true }),
      step('required-a'),
      step('long-deadline', { deadline: { workingDays: 30, countsFrom: 'arrival' } }),
      step('optional-b', { optional: true }),
      step('required-b'),
      step('short-deadline', { deadline: { workingDays: 8, countsFrom: 'arrival' } }),
    ];

    expect(ids(buildChecklist(steps, { status: 'eu' }))).toEqual([
      'short-deadline',
      'long-deadline',
      'required-a',
      'required-b',
      'optional-a',
      'optional-b',
    ]);
  });

  it('never puts a step before the steps it requires, even one with a deadline', () => {
    const steps = [
      step('needed-first', { optional: true }),
      step('urgent', {
        deadline: { workingDays: 8, countsFrom: 'arrival' },
        requires: [confirmed('needed-first')],
      }),
    ];

    expect(ids(buildChecklist(steps, { status: 'eu' }))).toEqual(['needed-first', 'urgent']);
  });

  it('returns the full step objects without changing the input', () => {
    const steps = [
      { ...step('transport-pass', { requires: [confirmed('tax-code')] }), title: 'Get your pass' },
      { ...step('tax-code'), title: 'Get your tax code' },
    ];
    const before = structuredClone(steps);

    const checklist = buildChecklist(steps, { status: 'eu' });

    expect(checklist.map((s) => s.title)).toEqual(['Get your tax code', 'Get your pass']);
    expect(checklist[0]).toBe(steps[1]);
    expect(steps).toEqual(before);
  });

  it('returns an empty checklist when no step applies', () => {
    const steps = [step('residence-permit', { appliesTo: ['non-eu'] })];

    expect(buildChecklist(steps, { status: 'eu' })).toEqual([]);
  });

  it('throws when confirmed links form a loop', () => {
    const steps = [
      step('a', { requires: [confirmed('b')] }),
      step('b', { requires: [confirmed('a')] }),
    ];

    expect(() => buildChecklist(steps, { status: 'eu' })).toThrow(/loop among a, b/);
  });
});
