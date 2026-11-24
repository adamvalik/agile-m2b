import { inject } from '@angular/core';
import { type CanActivateFn, Router } from '@angular/router';
import { loadAnswers } from '../core/answers';

/** Sends a student who has not answered the two intake questions yet to the intake first. */
export const hasAnswers: CanActivateFn = () =>
  loadAnswers() !== null || inject(Router).createUrlTree(['/intake']);
