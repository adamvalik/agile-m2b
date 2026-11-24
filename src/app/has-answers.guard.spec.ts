import { TestBed } from '@angular/core/testing';
import { type ActivatedRouteSnapshot, type RouterStateSnapshot, UrlTree } from '@angular/router';
import { saveAnswers } from '../core/answers';
import { hasAnswers } from './has-answers.guard';

function runGuard(): ReturnType<typeof hasAnswers> {
  return TestBed.runInInjectionContext(() =>
    hasAnswers({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot),
  );
}

describe('hasAnswers', () => {
  beforeEach(() => localStorage.clear());

  it('sends a student without saved answers to the intake', () => {
    const result = runGuard();
    expect(result).toBeInstanceOf(UrlTree);
    expect(String(result)).toBe('/intake');
  });

  it('lets a student with saved answers through', () => {
    saveAnswers({ status: 'eu', arrivalDate: '2027-03-01' });
    expect(runGuard()).toBe(true);
  });
});
