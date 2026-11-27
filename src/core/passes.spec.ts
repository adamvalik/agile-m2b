import { isStay, type Stay, type Under26 } from './answers';
import { fittingPasses, type PassAnswers, passFits } from './passes';
import type { Pass } from './step';
import { findStep, loadSteps } from './steps';

function pass(name: string, ageLimit: number | null, fitsStay: Stay[]): Pass {
  return { name, price: '€1', period: '30 days', ageLimit, fitsStay, whoCanGetIt: 'Anyone.' };
}

const passes = [
  pass('U26 Fix30', 26, ['semester']),
  pass('U26 Fix365', 26, ['year']),
  pass('Fix30', null, ['semester']),
  pass('Fix365', null, ['year']),
  pass('Flex', null, ['semester', 'year']),
  pass('Euregio', 28, ['year']),
];

function names(answers: PassAnswers): string[] {
  return fittingPasses(passes, answers).map((p) => p.name);
}

describe('fittingPasses', () => {
  it('gives an under-26 student staying one semester the U26 Fix30', () => {
    expect(names({ stay: 'semester', under26: 'yes' })).toEqual(['U26 Fix30']);
  });

  it('gives an under-26 student staying a full year the U26 Fix365 and the Euregio ticket', () => {
    expect(names({ stay: 'year', under26: 'yes' })).toEqual(['U26 Fix365', 'Euregio']);
  });

  it('gives a student of 26 or older staying one semester the Fix30 and the Flex', () => {
    expect(names({ stay: 'semester', under26: 'no' })).toEqual(['Fix30', 'Flex']);
  });

  it('gives a student of 26 or older staying a full year the Fix365 and the Flex', () => {
    expect(names({ stay: 'year', under26: 'no' })).toEqual(['Fix365', 'Flex']);
  });

  it('picks by stay only when the student skipped the age question', () => {
    expect(names({ stay: 'semester' })).toEqual(['U26 Fix30', 'Fix30', 'Flex']);
    expect(names({ stay: 'year' })).toEqual(['U26 Fix365', 'Fix365', 'Flex', 'Euregio']);
  });

  it('picks by stay only when the student prefers not to say', () => {
    for (const stay of ['semester', 'year'] as const) {
      expect(names({ stay, under26: 'prefer-not-to-say' })).toEqual(names({ stay }));
    }
  });

  it('keeps the order of the step file', () => {
    const reversed = [...passes].reverse();
    expect(fittingPasses(reversed, { stay: 'year' }).map((p) => p.name)).toEqual([
      'Euregio',
      'Flex',
      'Fix365',
      'U26 Fix365',
    ]);
  });
});

describe('passFits', () => {
  it('does not give an under-26 student a pass with a lower age limit', () => {
    const u19 = pass('U19', 19, ['semester', 'year']);
    expect(passFits(u19, { stay: 'year', under26: 'yes' })).toBe(false);
    expect(passFits(u19, { stay: 'year' })).toBe(true);
  });

  it('never fits a stay the pass is not worth it for', () => {
    expect(passFits(pass('Fix365', null, ['year']), { stay: 'semester' })).toBe(false);
  });
});

describe('the passes in the transport pass step', () => {
  const stepPasses = findStep(loadSteps(), 'transport-pass')?.passes ?? [];

  it('are there and fit only stays the intake asks about', () => {
    expect(stepPasses.length).toBeGreaterThan(0);
    for (const p of stepPasses) {
      expect(p.fitsStay.every(isStay)).toBe(true);
    }
  });

  it('highlight at least one pass for every stay and age answer', () => {
    const ages: (Under26 | undefined)[] = ['yes', 'no', 'prefer-not-to-say', undefined];
    for (const stay of ['semester', 'year'] as const) {
      for (const under26 of ages) {
        const fitting = fittingPasses(stepPasses, { stay, under26 });
        expect(fitting.length, `${stay}, under 26: ${under26}`).toBeGreaterThan(0);
      }
    }
  });
});
