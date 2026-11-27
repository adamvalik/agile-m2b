import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideArrowRight } from '@ng-icons/lucide';
import { HlmBadgeImports } from '@spartan-ng/helm/badge';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmCheckboxImports } from '@spartan-ng/helm/checkbox';
import { loadAnswers } from '../../../core/answers';
import { formatArrivalDate, formatDueDate, fromIsoDate } from '../../../core/arrival-date';
import { buildChecklist } from '../../../core/checklist';
import { checklistProgress, stepNote, toChecklistItems } from '../../../core/checklist-items';
import { DoneMarks } from '../../done-marks';
import { STEPS } from '../../steps';

/**
 * The student's personal checklist (#52), built from the saved answers each time it opens, so
 * changed answers (#49) give a new list. The route guard sends students without answers to the
 * intake first. The summary at the top counts the required steps done and names the next step
 * (#80). Each row has a checkbox to mark the step done or undo it (#79); the link opens its guide.
 */
@Component({
  selector: 'app-checklist',
  imports: [RouterLink, NgIcon, HlmBadgeImports, HlmButtonImports, HlmCheckboxImports],
  providers: [provideIcons({ lucideArrowRight })],
  templateUrl: './checklist.component.html',
})
export class Checklist {
  protected readonly answers = loadAnswers();

  private readonly ordered = this.answers ? buildChecklist(inject(STEPS), this.answers) : [];

  protected readonly marks = inject(DoneMarks);

  protected readonly items = computed(() =>
    this.answers ? toChecklistItems(this.ordered, this.answers, this.marks.ids()) : [],
  );

  protected readonly progress = computed(() => checklistProgress(this.items()));

  protected readonly arrival = this.answers
    ? formatArrivalDate(fromIsoDate(this.answers.arrivalDate)!)
    : '';

  protected readonly stay = this.answers?.stay === 'year' ? 'a full year' : 'one semester';

  protected readonly note = stepNote;
  protected readonly formatDueDate = formatDueDate;
}
