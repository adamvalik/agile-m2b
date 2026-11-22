import { Component, inject } from '@angular/core';
import { mainSource } from '../../../core/steps';
import { STEPS } from '../../steps';

/**
 * Lists every step loaded from content/steps/, so a content change is visible
 * on the deployed app before the real checklist exists (#44).
 */
@Component({
  selector: 'app-steps',
  templateUrl: './steps.component.html',
  styleUrl: './steps.component.css',
})
export class Steps {
  protected readonly steps = inject(STEPS);
  protected readonly mainSource = mainSource;
}
