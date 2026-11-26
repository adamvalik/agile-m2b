import { toIsoDate } from './arrival-date';
import { buildChecklist } from './checklist';
import {
  type ChecklistItem,
  type ItemStep,
  stepNote,
  stepShortName,
  stepsNeeding,
  toChecklistItems,
} from './checklist-items';

const confirmed = (step: string) => ({ step, status: 'confirmed' as const });
const unknown = (step: string) => ({ step, status: 'unknown' as const });

/** The five official steps with the same fields as the files in content/steps/. */
const steps: ItemStep[] = [
  {
    id: 'bank-account',
    title: 'Open an Italian bank account',
    appliesTo: ['eu', 'non-eu'],
    optional: true,
    startFromHome: false,
    requires: [confirmed('tax-code'), confirmed('residence-permit'), unknown('sim-card')],
    deadline: null,
  },
  {
    id: 'residence-permit',
    title: 'Request your residence permit (permesso di soggiorno)',
    appliesTo: ['non-eu'],
    optional: false,
    startFromHome: false,
    requires: [],
    deadline: { workingDays: 8, countsFrom: 'arrival' },
  },
  {
    id: 'sim-card',
    title: 'Get an Italian SIM card',
    appliesTo: ['eu', 'non-eu'],
    optional: true,
    startFromHome: false,
    requires: [unknown('tax-code')],
    deadline: null,
  },
  {
    id: 'tax-code',
    title: 'Get your tax code (codice fiscale)',
    appliesTo: ['eu', 'non-eu'],
    optional: false,
    startFromHome: true,
    requires: [unknown('residence-permit')],
    deadline: null,
  },
  {
    id: 'transport-pass',
    title: 'Get your transport pass',
    appliesTo: ['eu', 'non-eu'],
    optional: false,
    startFromHome: true,
    requires: [confirmed('tax-code'), unknown('residence-permit'), unknown('sim-card')],
    deadline: null,
  },
];

function itemsFor(status: 'eu' | 'non-eu', done: string[] = []): ChecklistItem[] {
  return toChecklistItems(
    buildChecklist(steps, { status }),
    { arrivalDate: '2027-03-01' },
    new Set(done),
  );
}

const summary = (items: ChecklistItem[]) =>
  items.map((item) => [item.step.id, item.state, stepNote(item)]);

const itemFor = (items: ChecklistItem[], id: string) => items.find((item) => item.step.id === id)!;

const ids = (list: readonly ItemStep[]) => list.map((step) => step.id);

describe('toChecklistItems', () => {
  it('gives an EU student the tax code as the next step', () => {
    expect(summary(itemsFor('eu'))).toEqual([
      ['tax-code', 'next', 'Start from home.'],
      ['transport-pass', 'waiting', 'Waits for: tax code.'],
      ['bank-account', 'optional', 'Waits for: tax code.'],
      ['sim-card', 'optional', 'After you arrive. May wait for: tax code (not confirmed yet).'],
    ]);
  });

  it('gives a non-EU student the residence permit first, with its deadline', () => {
    expect(summary(itemsFor('non-eu'))).toEqual([
      ['residence-permit', 'next', 'Within 8 working days after you arrive.'],
      ['tax-code', 'todo', 'Start from home. May wait for: residence permit (not confirmed yet).'],
      ['transport-pass', 'waiting', 'Waits for: tax code.'],
      ['bank-account', 'optional', 'Waits for: tax code, residence permit.'],
      ['sim-card', 'optional', 'After you arrive. May wait for: tax code (not confirmed yet).'],
    ]);
  });

  it('marks exactly one step as next', () => {
    for (const status of ['eu', 'non-eu'] as const) {
      expect(itemsFor(status).filter((item) => item.state === 'next')).toHaveLength(1);
    }
  });

  it('works out the due date from the arrival date', () => {
    const permit = itemsFor('non-eu').find((item) => item.step.id === 'residence-permit')!;
    expect(toIsoDate(permit.dueDate!)).toBe('2027-03-10');
    expect(itemsFor('eu').every((item) => item.dueDate === null)).toBe(true);
  });

  it('gives no due date for a deadline that counts from entry into Schengen', () => {
    const schengen = { ...steps[1], deadline: { workingDays: 8, countsFrom: 'schengen-entry' } };
    const [item] = toChecklistItems([schengen as ItemStep], { arrivalDate: '2027-03-01' });
    expect(item.dueDate).toBeNull();
  });
});

describe('toChecklistItems with done marks', () => {
  it('makes a waiting step available once the step it needs is done', () => {
    expect(itemFor(itemsFor('eu'), 'transport-pass').state).toBe('waiting');

    expect(summary(itemsFor('eu', ['tax-code']))).toEqual([
      ['tax-code', 'done', 'Start from home.'],
      [
        'transport-pass',
        'next',
        'Start from home. May wait for: Italian SIM card (not confirmed yet).',
      ],
      [
        'bank-account',
        'optional',
        'After you arrive. May wait for: Italian SIM card (not confirmed yet).',
      ],
      ['sim-card', 'optional', 'After you arrive.'],
    ]);
  });

  it('keeps a step waiting until every step it needs is done', () => {
    const before = itemFor(itemsFor('non-eu', ['tax-code']), 'bank-account');
    expect(ids(before.waitsFor)).toEqual(['residence-permit']);
    expect(stepNote(before)).toBe('Waits for: residence permit.');

    const after = itemFor(itemsFor('non-eu', ['tax-code', 'residence-permit']), 'bank-account');
    expect(after.waitsFor).toEqual([]);
  });

  it('gives the next step to the first required step that is not done', () => {
    expect(summary(itemsFor('non-eu', ['residence-permit'])).slice(0, 3)).toEqual([
      ['residence-permit', 'done', 'Within 8 working days after you arrive.'],
      ['tax-code', 'next', 'Start from home.'],
      ['transport-pass', 'waiting', 'Waits for: tax code.'],
    ]);
  });

  it('gives no next step once every required step is done', () => {
    const items = itemsFor('eu', ['tax-code', 'transport-pass']);
    expect(items.filter((item) => item.state === 'next')).toEqual([]);
  });

  it('keeps unknown links as a note that never makes a step wait', () => {
    const transport = itemFor(itemsFor('non-eu', ['tax-code']), 'transport-pass');
    expect(transport.state).toBe('todo');
    expect(transport.waitsFor).toEqual([]);
    expect(ids(transport.mayWaitFor)).toEqual(['residence-permit', 'sim-card']);
    expect(stepNote(transport)).toBe(
      'Start from home. May wait for: residence permit, Italian SIM card (not confirmed yet).',
    );

    const taxCode = itemFor(itemsFor('non-eu'), 'tax-code');
    expect(taxCode.state).toBe('todo');
    expect(taxCode.waitsFor).toEqual([]);
    expect(ids(taxCode.mayWaitFor)).toEqual(['residence-permit']);
  });

  it('drops an unknown link from the note once its step is done', () => {
    const transport = itemFor(
      itemsFor('non-eu', ['tax-code', 'residence-permit']),
      'transport-pass',
    );
    expect(ids(transport.mayWaitFor)).toEqual(['sim-card']);
  });

  it('shows a step marked done as done, even when a step it needs is not', () => {
    const items = itemsFor('eu', ['transport-pass']);
    expect(itemFor(items, 'transport-pass')).toMatchObject({ state: 'done', waitsFor: [] });
    expect(itemFor(items, 'tax-code').state).toBe('next');
  });

  it('ignores done marks for steps that are not on the checklist', () => {
    expect(itemsFor('eu', ['residence-permit', 'no-such-step'])).toEqual(itemsFor('eu'));
  });
});

describe('stepShortName', () => {
  it('drops the verb at the start and the Italian name at the end', () => {
    expect(steps.map((step) => stepShortName(step.title))).toEqual([
      'Italian bank account',
      'residence permit',
      'Italian SIM card',
      'tax code',
      'transport pass',
    ]);
  });
});

describe('stepsNeeding', () => {
  it('lists the steps that wait for a step through a confirmed link', () => {
    expect(stepsNeeding(steps, 'tax-code').map((step) => step.id)).toEqual([
      'bank-account',
      'transport-pass',
    ]);
    expect(stepsNeeding(steps, 'sim-card')).toEqual([]);
  });
});
