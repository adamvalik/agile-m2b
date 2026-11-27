import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  lucideArrowRight,
  lucideCalendar,
  lucideCircle,
  lucideCircleDot,
  lucideClock,
} from '@ng-icons/lucide';
import { HlmBadgeImports } from '@spartan-ng/helm/badge';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { loadAnswers } from '../../../core/answers';
import { formatArrivalDate, formatDueDate, fromIsoDate } from '../../../core/arrival-date';
import { buildChecklist } from '../../../core/checklist';
import {
  type ChecklistItem,
  checklistProgress,
  stepNote,
  toChecklistItems,
} from '../../../core/checklist-items';
import { loadDone } from '../../../core/progress';
import { STEPS } from '../../steps';

/**
 * The student's personal checklist (#52), built from the saved answers each time it opens, so
 * changed answers (#49) give a new list. The route guard sends students without answers to the
 * intake first. The summary at the top counts the required steps done and names the next step
 * (#80); both follow the done marks.
 */
@Component({
  selector: 'app-checklist',
  imports: [RouterLink, NgIcon, HlmBadgeImports, HlmButtonImports],
  providers: [
    provideIcons({ lucideArrowRight, lucideCalendar, lucideCircle, lucideCircleDot, lucideClock }),
  ],
  templateUrl: './checklist.component.html',
})
export class Checklist {
  protected readonly answers = loadAnswers();

  private readonly ordered = this.answers ? buildChecklist(inject(STEPS), this.answers) : [];

  /** The ids of the steps marked done on this device. */
  protected readonly done = signal(loadDone());

  protected readonly items = computed(() =>
    this.answers ? toChecklistItems(this.ordered, this.answers, this.done()) : [],
  );

  protected readonly progress = computed(() => checklistProgress(this.items()));

  protected readonly arrival = this.answers
    ? formatArrivalDate(fromIsoDate(this.answers.arrivalDate)!)
    : '';

  protected readonly stay = this.answers?.stay === 'year' ? 'a full year' : 'one semester';

  protected readonly note = stepNote;
  protected readonly formatDueDate = formatDueDate;

  protected icon(item: ChecklistItem): string {
    if (item.state === 'next') return 'lucideCircleDot';
    if (item.state === 'waiting') return 'lucideClock';
    if (item.dueDate) return 'lucideCalendar';
    return 'lucideCircle';
  }
}
