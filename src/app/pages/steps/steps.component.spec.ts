import { TestBed } from '@angular/core/testing';
import type { Step } from '../../../core/step';
import { STEPS } from '../../steps';
import { Steps } from './steps.component';

const taxCode: Step = {
  id: 'tax-code',
  title: 'Get your tax code',
  appliesTo: ['eu', 'non-eu'],
  optional: false,
  startFromHome: true,
  requires: [],
  deadline: null,
  sources: [{ title: 'Agenzia delle Entrate', url: 'https://www.agenziaentrate.gov.it/' }],
  lastChecked: '2026-11-17',
  guide: {
    whatItIs: ['The tax code identifies you in Italy.'],
    bring: [{ text: 'Passport or ID card' }],
    fromHome: ['Ask the Italian consulate.'],
    commonMistakes: ['Going without an appointment.'],
    whatComesNext: ['Order the transport pass.'],
  },
};

const residencePermit: Step = {
  ...taxCode,
  id: 'residence-permit',
  title: 'Request your residence permit',
  appliesTo: ['non-eu'],
};

async function render(steps: readonly Step[]): Promise<HTMLElement> {
  TestBed.configureTestingModule({ providers: [{ provide: STEPS, useValue: steps }] });
  const fixture = TestBed.createComponent(Steps);
  await fixture.whenStable();
  return fixture.nativeElement as HTMLElement;
}

describe('Steps', () => {
  it('lists every step with its title', async () => {
    const page = await render([residencePermit, taxCode]);
    const titles = [...page.querySelectorAll('h2')].map((h) => h.textContent?.trim());

    expect(titles).toEqual(['Request your residence permit', 'Get your tax code']);
  });

  it('shows the main source and the last-checked date of each step', async () => {
    const page = await render([taxCode]);
    const link = page.querySelector('a');

    expect(link?.textContent).toContain('Agenzia delle Entrate');
    expect(link?.getAttribute('href')).toBe('https://www.agenziaentrate.gov.it/');
    expect(page.querySelector('time')?.getAttribute('datetime')).toBe('2026-11-17');
  });

  it('says who each step is for', async () => {
    const page = await render([taxCode, residencePermit]);
    const who = [...page.querySelectorAll('dd:first-of-type')].map((d) => d.textContent?.trim());

    expect(who).toEqual(['EU and non-EU students', 'Non-EU students']);
  });

  it('says so when there are no steps yet', async () => {
    const page = await render([]);

    expect(page.querySelector('.note')?.textContent).toContain('No steps yet');
  });
});
