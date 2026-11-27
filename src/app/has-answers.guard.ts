import { inject } from '@angular/core';
import { type CanActivateFn, Router } from '@angular/router';
import { loadAnswers } from '../core/answers';

/**
 * Sends a student without the required intake answers (status, arrival date, stay) to the
 * intake first.
 */
export const hasAnswers: CanActivateFn = () =>
  loadAnswers() !== null || inject(Router).createUrlTree(['/intake']);
