import type { Step } from './step';
import { findStep, loadSteps, mainSource } from './steps';

function step(id: string, overrides: Partial<Step> = {}): Step {
  return {
    id,
    title: `Step ${id}`,
    appliesTo: ['eu', 'non-eu'],
    optional: false,
    startFromHome: false,
    requires: [],
    deadline: null,
    sources: [{ title: 'Official page', url: 'https://example.org/' }],
    lastChecked: '2026-11-17',
    guide: {
      whatItIs: ['What it is.'],
      bring: [{ text: 'Passport' }],
      afterArrival: ['Go to the office.'],
      commonMistakes: ['Going without an appointment.'],
      whatComesNext: ['The next step.'],
    },
    ...overrides,
  };
}

describe('loadSteps', () => {
  it('returns the generated steps sorted by id, each id once', () => {
    const ids = loadSteps().map((s) => s.id);

    expect(ids).toEqual([...ids].sort());
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('gives every step a main source and a last-checked date', () => {
    for (const s of loadSteps()) {
      expect(s.sources.length).toBeGreaterThan(0);
      expect(s.lastChecked).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    }
  });

  it('has no $schema field left over from the step files', () => {
    for (const s of loadSteps()) {
      expect(Object.keys(s)).not.toContain('$schema');
    }
  });
});

describe('findStep', () => {
  const steps = [step('bank-account'), step('tax-code')];

  it('finds a step by id', () => {
    expect(findStep(steps, 'tax-code')?.title).toBe('Step tax-code');
  });

  it('returns undefined for an unknown id', () => {
    expect(findStep(steps, 'tax-cod')).toBeUndefined();
  });
});

describe('mainSource', () => {
  it('is the first source in the file', () => {
    const s = step('tax-code', {
      sources: [
        { title: 'Agenzia delle Entrate', url: 'https://www.agenziaentrate.gov.it/' },
        { title: 'unibz', url: 'https://www.unibz.it/' },
      ],
    });

    expect(mainSource(s).title).toBe('Agenzia delle Entrate');
  });
});
