import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { type Answers, saveAnswers } from '../../../core/answers';
import type { Step } from '../../../core/step';
import { STEPS } from '../../steps';
import { Checklist } from './checklist.component';

function step(fields: Partial<Step> & Pick<Step, 'id' | 'title'>): Step {
  return {
    appliesTo: ['eu', 'non-eu'],
    optional: false,
    startFromHome: false,
    requires: [],
    deadline: null,
    sources: [{ title: 'Official page', url: 'https://example.org/' }],
    lastChecked: '2026-11-17',
    guide: { whatItIs: ['.'], bring: [{ text: '.' }], commonMistakes: ['.'], whatComesNext: ['.'] },
    ...fields,
  };
}

/** The five official steps, sorted by id like the generated step data. */
const steps: Step[] = [
  step({
    id: 'bank-account',
    title: 'Open an Italian bank account',
    optional: true,
    requires: [
      { step: 'tax-code', status: 'confirmed' },
      { step: 'residence-permit', status: 'confirmed' },
    ],
  }),
  step({
    id: 'residence-permit',
    title: 'Request your residence permit (permesso di soggiorno)',
    appliesTo: ['non-eu'],
    deadline: { workingDays: 8, countsFrom: 'arrival' },
  }),
  step({
    id: 'sim-card',
    title: 'Get an Italian SIM card',
    optional: true,
    requires: [{ step: 'tax-code', status: 'unknown' }],
  }),
  step({
    id: 'tax-code',
    title: 'Get your tax code (codice fiscale)',
    startFromHome: true,
    requires: [{ step: 'residence-permit', status: 'unknown' }],
  }),
  step({
    id: 'transport-pass',
    title: 'Get your transport pass',
    startFromHome: true,
    requires: [{ step: 'tax-code', status: 'confirmed' }],
  }),
];

async function render(answers: Answers | null): Promise<HTMLElement> {
  localStorage.clear();
  if (answers) saveAnswers(answers);
  TestBed.configureTestingModule({
    providers: [provideRouter([]), { provide: STEPS, useValue: steps }],
  });
  const fixture = TestBed.createComponent(Checklist);
  await fixture.whenStable();
  return fixture.nativeElement as HTMLElement;
}

const rows = (page: HTMLElement) => [...page.querySelectorAll('ol > li a')] as HTMLAnchorElement[];
const titles = (page: HTMLElement) =>
  rows(page).map((row) => row.querySelector('span span')?.textContent?.trim());

describe('Checklist', () => {
  afterEach(() => localStorage.clear());

  it('shows the answers with a way to change them', async () => {
    const page = await render({ status: 'non-eu', arrivalDate: '2027-03-01' });
    const summary = page.querySelector('section')!;

    expect(summary.textContent).toContain('Non-EU citizen');
    expect(summary.textContent).toContain('Arriving Mon 1 March 2027');
    expect(summary.querySelector('a')?.getAttribute('href')).toBe('/intake');
    expect(summary.querySelector('a')?.textContent).toContain('Change');
  });

  it('shows an EU student the steps without the residence permit, tax code first', async () => {
    const page = await render({ status: 'eu', arrivalDate: '2027-03-01' });

    expect(titles(page)).toEqual([
      'Get your tax code (codice fiscale)',
      'Get your transport pass',
      'Open an Italian bank account',
      'Get an Italian SIM card',
    ]);
  });

  it('shows a non-EU student the residence permit with its due date', async () => {
    const page = await render({ status: 'non-eu', arrivalDate: '2027-03-01' });
    const permit = rows(page)[0];

    expect(titles(page)[0]).toBe('Request your residence permit (permesso di soggiorno)');
    expect(permit.textContent).toContain('Due Wed 10 March');
    expect(titles(page).indexOf('Get your tax code (codice fiscale)')).toBeLessThan(
      titles(page).indexOf('Get your transport pass'),
    );
  });

  it('marks exactly one step as next, and the steps that wait or are optional', async () => {
    const page = await render({ status: 'eu', arrivalDate: '2027-03-01' });
    const badges = rows(page).map((row) =>
      [...row.querySelectorAll('[data-slot="badge"]')].map((b) => b.textContent?.trim()),
    );

    expect(badges).toEqual([['Next'], ['Waiting'], ['Optional'], ['Optional']]);
    expect(rows(page)[1].textContent).toContain('Waits for: tax code.');
  });

  it('opens the guide of each step', async () => {
    const page = await render({ status: 'eu', arrivalDate: '2027-03-01' });

    expect(rows(page).map((row) => row.getAttribute('href'))).toEqual([
      '/steps/tax-code',
      '/steps/transport-pass',
      '/steps/bank-account',
      '/steps/sim-card',
    ]);
  });

  it('builds the list from the latest saved answers', async () => {
    let page = await render({ status: 'eu', arrivalDate: '2027-03-01' });
    expect(titles(page)).not.toContain('Request your residence permit (permesso di soggiorno)');

    TestBed.resetTestingModule();
    page = await render({ status: 'non-eu', arrivalDate: '2027-03-01' });
    expect(titles(page)).toContain('Request your residence permit (permesso di soggiorno)');
  });

  it('points to the intake when there are no answers', async () => {
    const page = await render(null);

    expect(rows(page)).toHaveLength(0);
    expect(page.querySelector('a[href="/intake"]')?.textContent).toContain('Answer the questions');
  });
});
