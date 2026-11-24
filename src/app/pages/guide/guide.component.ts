import { Component, computed, effect, inject, input } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideChevronLeft, lucideCircleX, lucideShieldCheck } from '@ng-icons/lucide';
import { HlmAlertImports } from '@spartan-ng/helm/alert';
import { HlmBadgeImports } from '@spartan-ng/helm/badge';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { loadAnswers } from '../../../core/answers';
import { formatDueDate, formatLongDate, fromIsoDate } from '../../../core/arrival-date';
import { dueDate, stepShortName, stepsNeeding } from '../../../core/checklist-items';
import { findStep, mainSource } from '../../../core/steps';
import { STEPS } from '../../steps';

/** The guide for one step (sketch 07), read from its file in content/steps/. */
@Component({
  selector: 'app-guide',
  imports: [RouterLink, NgIcon, HlmAlertImports, HlmBadgeImports, HlmButtonImports],
  providers: [provideIcons({ lucideChevronLeft, lucideCircleX, lucideShieldCheck })],
  templateUrl: './guide.component.html',
})
export class Guide {
  /** The step id from the URL, /steps/:id. */
  readonly id = input.required<string>();

  private readonly steps = inject(STEPS);
  private readonly answers = loadAnswers();

  protected readonly step = computed(() => findStep(this.steps, this.id()));
  protected readonly source = computed(() => {
    const step = this.step();
    return step ? mainSource(step) : undefined;
  });
  protected readonly lastChecked = computed(() => {
    const date = fromIsoDate(this.step()?.lastChecked ?? '');
    return date ? formatLongDate(date) : '';
  });

  /** Steps on this student's checklist that wait for this one. */
  protected readonly neededFor = computed(() => {
    const status = this.answers?.status;
    const onChecklist = status
      ? this.steps.filter((step) => step.appliesTo.includes(status))
      : this.steps;
    return stepsNeeding(onChecklist, this.id()).map((step) => stepShortName(step.title));
  });

  protected readonly due = computed(() => {
    const step = this.step();
    const arrival = this.answers ? fromIsoDate(this.answers.arrivalDate) : null;
    const date = step ? dueDate(step, arrival) : null;
    return date ? formatDueDate(date) : null;
  });

  constructor() {
    const title = inject(Title);
    effect(() => {
      title.setTitle(`${this.step()?.title ?? 'Step not found'} | First weeks in Bolzano`);
    });
  }
}
