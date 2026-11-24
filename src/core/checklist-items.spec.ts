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

function itemsFor(status: 'eu' | 'non-eu'): ChecklistItem[] {
  return toChecklistItems(buildChecklist(steps, { status }), { arrivalDate: '2027-03-01' });
}

const summary = (items: ChecklistItem[]) =>
  items.map((item) => [item.step.id, item.state, stepNote(item)]);

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
