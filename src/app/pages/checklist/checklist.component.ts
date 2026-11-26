import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideCalendar, lucideCircle, lucideCircleDot, lucideClock } from '@ng-icons/lucide';
import { HlmBadgeImports } from '@spartan-ng/helm/badge';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { loadAnswers } from '../../../core/answers';
import { formatArrivalDate, formatDueDate, fromIsoDate } from '../../../core/arrival-date';
import { buildChecklist } from '../../../core/checklist';
import { type ChecklistItem, stepNote, toChecklistItems } from '../../../core/checklist-items';
import { ClearData } from '../../clear-data/clear-data.component';
import { STEPS } from '../../steps';

/**
 * The student's personal checklist (#52), built from the saved answers each time it opens, so
 * changed answers (#49) give a new list. The route guard sends students without answers to the
 * intake first.
 */
@Component({
  selector: 'app-checklist',
  imports: [RouterLink, NgIcon, ClearData, HlmBadgeImports, HlmButtonImports],
  providers: [provideIcons({ lucideCalendar, lucideCircle, lucideCircleDot, lucideClock })],
  templateUrl: './checklist.component.html',
})
export class Checklist {
  protected readonly answers = loadAnswers();

  protected readonly items: ChecklistItem[] = this.answers
    ? toChecklistItems(buildChecklist(inject(STEPS), this.answers), this.answers)
    : [];

  protected readonly arrival = this.answers
    ? formatArrivalDate(fromIsoDate(this.answers.arrivalDate)!)
    : '';

  protected readonly note = stepNote;
  protected readonly formatDueDate = formatDueDate;

  protected icon(item: ChecklistItem): string {
    if (item.state === 'next') return 'lucideCircleDot';
    if (item.state === 'waiting') return 'lucideClock';
    if (item.dueDate) return 'lucideCalendar';
    return 'lucideCircle';
  }
}
