import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { type Answers, saveAnswers } from '../../../core/answers';
import type { Step } from '../../../core/step';
import { loadDone, saveDone } from '../../../core/progress';
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

async function open(): Promise<ComponentFixture<Checklist>> {
  TestBed.configureTestingModule({
    providers: [provideRouter([]), { provide: STEPS, useValue: steps }],
  });
  const fixture = TestBed.createComponent(Checklist);
  await fixture.whenStable();
  return fixture;
}

async function render(answers: Answers | null, done: string[] = []): Promise<HTMLElement> {
  localStorage.clear();
  if (answers) saveAnswers(answers);
  saveDone(new Set(done));
  return (await open()).nativeElement as HTMLElement;
}

const rows = (page: HTMLElement) => [...page.querySelectorAll('ol > li a')] as HTMLAnchorElement[];
const boxes = (page: HTMLElement) =>
  [...page.querySelectorAll('ol > li [role="checkbox"]')] as HTMLButtonElement[];
const titles = (page: HTMLElement) =>
  rows(page).map((row) => row.querySelector('span span')?.textContent?.trim());

describe('Checklist', () => {
  afterEach(() => localStorage.clear());

  it('shows the answers with a way to change them', async () => {
    const page = await render({ status: 'non-eu', arrivalDate: '2027-03-01', stay: 'semester' });
    const summary = page.querySelector('section')!;

    expect(summary.textContent).toContain('Non-EU citizen');
    expect(summary.textContent).toContain('Arriving Mon 1 March 2027, staying one semester');
    expect(summary.querySelector('a')?.getAttribute('href')).toBe('/intake');
    expect(summary.querySelector('a')?.textContent).toContain('Change');
  });

  it('shows a full-year stay in the answers', async () => {
    const page = await render({ status: 'eu', arrivalDate: '2027-03-01', stay: 'year' });

    expect(page.querySelector('section')?.textContent).toContain('staying a full year');
  });

  it('shows an EU student the steps without the residence permit, tax code first', async () => {
    const page = await render({ status: 'eu', arrivalDate: '2027-03-01', stay: 'semester' });

    expect(titles(page)).toEqual([
      'Get your tax code (codice fiscale)',
      'Get your transport pass',
      'Open an Italian bank account',
      'Get an Italian SIM card',
    ]);
  });

  it('shows a non-EU student the residence permit with its due date', async () => {
    const page = await render({ status: 'non-eu', arrivalDate: '2027-03-01', stay: 'semester' });
    const permit = rows(page)[0];

    expect(titles(page)[0]).toBe('Request your residence permit (permesso di soggiorno)');
    expect(permit.textContent).toContain('Due Wed 10 March');
    expect(titles(page).indexOf('Get your tax code (codice fiscale)')).toBeLessThan(
      titles(page).indexOf('Get your transport pass'),
    );
  });

  it('marks exactly one step as next, and the steps that wait or are optional', async () => {
    const page = await render({ status: 'eu', arrivalDate: '2027-03-01', stay: 'semester' });
    const badges = rows(page).map((row) =>
      [...row.querySelectorAll('[data-slot="badge"]')].map((b) => b.textContent?.trim()),
    );

    expect(badges).toEqual([['Next'], ['Waiting'], ['Optional'], ['Optional']]);
    expect(rows(page)[1].textContent).toContain('Waits for: tax code.');
  });

  it('opens the guide of each step', async () => {
    const page = await render({ status: 'eu', arrivalDate: '2027-03-01', stay: 'semester' });

    expect(rows(page).map((row) => row.getAttribute('href'))).toEqual([
      '/steps/tax-code',
      '/steps/transport-pass',
      '/steps/bank-account',
      '/steps/sim-card',
    ]);
  });

  it('builds the list from the latest saved answers', async () => {
    let page = await render({ status: 'eu', arrivalDate: '2027-03-01', stay: 'semester' });
    expect(titles(page)).not.toContain('Request your residence permit (permesso di soggiorno)');

    TestBed.resetTestingModule();
    page = await render({ status: 'non-eu', arrivalDate: '2027-03-01', stay: 'semester' });
    expect(titles(page)).toContain('Request your residence permit (permesso di soggiorno)');
  });

  it('points to the intake when there are no answers', async () => {
    const page = await render(null);

    expect(rows(page)).toHaveLength(0);
    expect(page.querySelector('a[href="/intake"]')?.textContent).toContain('Answer the questions');
  });

  describe('progress summary', () => {
    const progress = (page: HTMLElement) =>
      page.querySelector('section[aria-labelledby="progress-count"]') as HTMLElement;

    it('counts the required steps done and names the next step with a link to its guide', async () => {
      const page = await render({ status: 'non-eu', arrivalDate: '2027-03-01', stay: 'semester' }, [
        'residence-permit',
        'sim-card',
      ]);
      const summary = progress(page);

      expect(summary.querySelector('#progress-count')?.textContent?.trim()).toBe(
        '1 of 3 required steps done',
      );
      expect(summary.textContent).toContain('Your next step');
      expect(summary.textContent).toContain('Get your tax code (codice fiscale)');
      expect(summary.querySelector('a')?.getAttribute('href')).toBe('/steps/tax-code');
    });

    it('names no next step once every required step is done', async () => {
      const page = await render({ status: 'eu', arrivalDate: '2027-03-01', stay: 'semester' }, [
        'tax-code',
        'transport-pass',
      ]);

      expect(progress(page).textContent).toContain('All 2 required steps done');
      expect(progress(page).textContent).not.toContain('Your next step');
    });
  });

  describe('marking steps done', () => {
    const eu: Answers = { status: 'eu', arrivalDate: '2027-03-01', stay: 'semester' };
    const count = (page: HTMLElement) => page.querySelector('#progress-count')?.textContent?.trim();

    it('gives every row a checkbox named after its step', async () => {
      const page = await render(eu);

      expect(boxes(page).map((box) => box.getAttribute('aria-label'))).toEqual([
        'Done: Get your tax code (codice fiscale)',
        'Done: Get your transport pass',
        'Done: Open an Italian bank account',
        'Done: Get an Italian SIM card',
      ]);
      expect(boxes(page).every((box) => box.getAttribute('aria-checked') === 'false')).toBe(true);
    });

    it('marks a step done, updates the count and saves the mark on the device', async () => {
      localStorage.clear();
      saveAnswers(eu);
      const fixture = await open();
      const page = fixture.nativeElement as HTMLElement;

      boxes(page)[0].click();
      await fixture.whenStable();

      expect(boxes(page)[0].getAttribute('aria-checked')).toBe('true');
      expect(rows(page)[0].textContent).toContain('Done');
      expect(rows(page)[0].textContent).not.toContain('Start from home.');
      expect(count(page)).toBe('1 of 2 required steps done');
      expect(
        page.querySelector('section[aria-labelledby="progress-count"] a')?.getAttribute('href'),
      ).toBe('/steps/transport-pass');
      expect([...loadDone()]).toEqual(['tax-code']);
    });

    it('unmarks a step done', async () => {
      localStorage.clear();
      saveAnswers(eu);
      saveDone(new Set(['tax-code']));
      const fixture = await open();
      const page = fixture.nativeElement as HTMLElement;
      expect(count(page)).toBe('1 of 2 required steps done');

      boxes(page)[0].click();
      await fixture.whenStable();

      expect(boxes(page)[0].getAttribute('aria-checked')).toBe('false');
      expect(count(page)).toBe('0 of 2 required steps done');
      expect([...loadDone()]).toEqual([]);
    });

    it('keeps the marks after a reload', async () => {
      localStorage.clear();
      saveAnswers(eu);
      const page = (await open()).nativeElement as HTMLElement;
      boxes(page)[0].click();

      TestBed.resetTestingModule();
      const reloaded = (await open()).nativeElement as HTMLElement;

      expect(boxes(reloaded)[0].getAttribute('aria-checked')).toBe('true');
      expect(count(reloaded)).toBe('1 of 2 required steps done');
    });

    it('keeps the checkbox outside the link, so marking a step does not open its guide', async () => {
      const page = await render(eu);

      expect(rows(page).some((row) => row.querySelector('[role="checkbox"]'))).toBe(false);
    });
  });
});
