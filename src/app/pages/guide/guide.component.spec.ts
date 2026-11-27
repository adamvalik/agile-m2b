import { TestBed } from '@angular/core/testing';
import { Title } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { saveAnswers } from '../../../core/answers';
import type { Step } from '../../../core/step';
import { STEPS } from '../../steps';
import { Guide } from './guide.component';

const taxCode: Step = {
  id: 'tax-code',
  title: 'Get your tax code (codice fiscale)',
  appliesTo: ['eu', 'non-eu'],
  optional: false,
  startFromHome: true,
  requires: [],
  deadline: null,
  sources: [
    { title: 'Agenzia delle Entrate', url: 'https://www.agenziaentrate.gov.it/' },
    { title: 'Bolzano office', url: 'https://example.org/bolzano' },
  ],
  lastChecked: '2026-11-17',
  guide: {
    whatItIs: ['A 16-character code that identifies you.'],
    bring: [{ text: 'Your passport or ID card' }],
    fromHome: ['Ask the Italian consulate.'],
    afterArrival: ['Book an appointment online.'],
    commonMistakes: ['Going without an appointment.'],
    whatComesNext: ['Get your transport pass.'],
  },
};

const transportPass: Step = {
  ...taxCode,
  id: 'transport-pass',
  title: 'Get your transport pass',
  requires: [{ step: 'tax-code', status: 'confirmed' }],
};

const residencePermit: Step = {
  ...taxCode,
  id: 'residence-permit',
  title: 'Request your residence permit',
  appliesTo: ['non-eu'],
  startFromHome: false,
  deadline: { workingDays: 8, countsFrom: 'arrival' },
  guide: { ...taxCode.guide, fromHome: undefined },
};

async function render(id: string): Promise<HTMLElement> {
  TestBed.configureTestingModule({
    providers: [
      provideRouter([]),
      { provide: STEPS, useValue: [residencePermit, taxCode, transportPass] },
    ],
  });
  const fixture = TestBed.createComponent(Guide);
  fixture.componentRef.setInput('id', id);
  await fixture.whenStable();
  return fixture.nativeElement as HTMLElement;
}

const headings = (page: HTMLElement) =>
  [...page.querySelectorAll('h2')].map((h) => h.textContent?.trim());

describe('Guide', () => {
  beforeEach(() => localStorage.clear());

  it('shows the step with its official source and last-checked date', async () => {
    const page = await render('tax-code');

    expect(page.querySelector('h1')?.textContent).toContain('Get your tax code');
    expect(page.textContent).toContain('Agenzia delle Entrate. Last checked: 17 November 2026.');
    expect(page.querySelector('a[target="_blank"]')?.getAttribute('href')).toBe(
      'https://www.agenziaentrate.gov.it/',
    );
    expect(TestBed.inject(Title).getTitle()).toBe(
      'Get your tax code (codice fiscale) | First weeks in Bolzano',
    );
  });

  it('shows every section of the guide and lists all sources', async () => {
    const page = await render('tax-code');

    expect(headings(page)).toEqual([
      'Official source',
      'What it is',
      'From home',
      'After you arrive',
      'What to bring',
      'Common mistakes',
      'What comes next',
      'Sources',
    ]);
    expect(page.textContent).toContain('Your passport or ID card');
    expect(page.querySelectorAll('section:last-of-type li')).toHaveLength(2);
  });

  it('says which steps wait for this one', async () => {
    const page = await render('tax-code');

    expect(page.textContent).toContain('Needed for: transport pass');
  });

  it('shows the due date when the student has an arrival date', async () => {
    saveAnswers({ status: 'non-eu', arrivalDate: '2027-03-01', stay: 'semester' });
    const page = await render('residence-permit');

    expect(page.textContent).toContain('Due Wed 10 March');
    expect(headings(page)).not.toContain('From home');
  });

  it('says so when the step does not exist', async () => {
    const page = await render('no-such-step');

    expect(page.querySelector('h1')?.textContent).toContain('Step not found');
    expect(page.querySelector('a[href="/checklist"]')).not.toBeNull();
  });
});
