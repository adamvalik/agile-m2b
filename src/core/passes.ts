import type { Answers } from './answers';
import type { Pass } from './step';

export type PassAnswers = Pick<Answers, 'stay' | 'under26'>;

const AGE_ASKED = 26;

/**
 * Under 26: only passes with an age limit of 26 or more, as they cost less or cover more.
 * 26 or older: only passes without an age limit (the intake does not ask about 28).
 * No age answer: by stay only.
 */
export function passFits(pass: Pass, answers: PassAnswers): boolean {
  if (!pass.fitsStay.includes(answers.stay)) return false;
  if (answers.under26 === 'yes') return pass.ageLimit !== null && pass.ageLimit >= AGE_ASKED;
  if (answers.under26 === 'no') return pass.ageLimit === null;
  return true;
}

export function fittingPasses<T extends Pass>(passes: readonly T[], answers: PassAnswers): T[] {
  return passes.filter((pass) => passFits(pass, answers));
}
