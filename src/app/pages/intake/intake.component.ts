import {
  afterNextRender,
  Component,
  computed,
  ElementRef,
  inject,
  Injectable,
  Injector,
  signal,
  viewChild,
} from '@angular/core';
import { form, FormField, FormRoot, required, validate } from '@angular/forms/signals';
import { RouterLink } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideChevronLeft, lucideCircleAlert, lucideCircleCheck } from '@ng-icons/lucide';
import { provideBrnCalendarI18n } from '@spartan-ng/brain/calendar';
import { ErrorStateMatcher } from '@spartan-ng/brain/forms';
import { HlmAlertImports } from '@spartan-ng/helm/alert';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmDatePickerImports, provideHlmDatePickerConfig } from '@spartan-ng/helm/date-picker';
import { HlmFieldImports } from '@spartan-ng/helm/field';
import { HlmLabelImports } from '@spartan-ng/helm/label';
import { HlmRadioGroupImports } from '@spartan-ng/helm/radio-group';
import { type Answers, type StudentStatus, loadAnswers, saveAnswers } from '../../../core/answers';
import {
  checkArrivalDate,
  formatArrivalDate,
  fromIsoDate,
  toIsoDate,
} from '../../../core/arrival-date';

const thisYear = new Date().getFullYear();

interface IntakeModel {
  status: StudentStatus | '';
  arrivalDate: Date | null;
}

export const INTAKE_MESSAGES = {
  summary: 'Answer both questions to see your checklist.',
  statusMissing: 'Choose EU or non-EU.',
  dateMissing: 'Pick the day you arrive.',
  dateInvalid: 'This date does not exist. Check the day and month.',
} as const;

/** Shows field errors only after the student has tried to submit, as in the agreed sketch. */
@Injectable()
export class ShowErrorsAfterSubmit {
  readonly submitted = signal(false);

  isInvalid(control: { readonly invalid: boolean | null } | null): boolean {
    return !!control?.invalid && this.submitted();
  }
}

@Component({
  selector: 'app-intake',
  imports: [
    FormRoot,
    FormField,
    RouterLink,
    NgIcon,
    HlmAlertImports,
    HlmButtonImports,
    HlmDatePickerImports,
    HlmFieldImports,
    HlmLabelImports,
    HlmRadioGroupImports,
  ],
  providers: [
    ShowErrorsAfterSubmit,
    { provide: ErrorStateMatcher, useExisting: ShowErrorsAfterSubmit },
    provideIcons({ lucideChevronLeft, lucideCircleAlert, lucideCircleCheck }),
    // The calendar starts on Monday, as in Italy, and offers last year to two years ahead.
    provideBrnCalendarI18n({
      firstDayOfWeek: () => 1,
      years: () => [thisYear - 1, thisYear, thisYear + 1, thisYear + 2],
      formatHeader: (month, year) =>
        new Date(year, month).toLocaleDateString('en-GB', { month: 'long', year: 'numeric' }),
      formatMonth: (month) => new Date(2000, month).toLocaleDateString('en-GB', { month: 'short' }),
      formatYear: (year) => String(year),
    }),
    provideHlmDatePickerConfig<Date>({ formatDate: formatArrivalDate, autoCloseOnSelect: true }),
  ],
  templateUrl: './intake.component.html',
  styleUrl: './intake.component.css',
})
export class Intake {
  private readonly injector = inject(Injector);
  private readonly errorState = inject(ShowErrorsAfterSubmit);
  private readonly summary = viewChild<ElementRef<HTMLElement>>('summary');

  protected readonly messages = INTAKE_MESSAGES;

  /** The same years as the calendar's year dropdown. */
  protected readonly minDate = new Date(thisYear - 1, 0, 1);
  protected readonly maxDate = new Date(thisYear + 2, 11, 31);

  private readonly model = signal<IntakeModel>(initialModel(loadAnswers()));

  protected readonly intake = form(
    this.model,
    (path) => {
      required(path.status, { message: INTAKE_MESSAGES.statusMissing });
      validate(path.arrivalDate, ({ value }) => {
        const problem = checkArrivalDate(value());
        if (problem === 'missing') return { kind: 'missing', message: INTAKE_MESSAGES.dateMissing };
        if (problem === 'invalid') return { kind: 'invalid', message: INTAKE_MESSAGES.dateInvalid };
        return null;
      });
    },
    {
      submission: {
        action: async () => {
          this.errorState.submitted.set(true);
          const answers = toAnswers(this.model());
          if (answers && saveAnswers(answers)) {
            this.saved.set(answers);
            this.saveFailed.set(false);
          } else {
            this.saveFailed.set(true);
          }
          return undefined;
        },
        onInvalid: () => {
          this.errorState.submitted.set(true);
          this.saved.set(null);
          afterNextRender(() => this.summary()?.nativeElement.focus(), {
            injector: this.injector,
          });
        },
      },
    },
  );

  protected readonly showSummary = computed(
    () => this.errorState.submitted() && this.intake().invalid(),
  );

  private readonly saved = signal<Answers | null>(null);
  protected readonly saveFailed = signal(false);

  /** "Saved" stays visible only while the form still shows the saved answers. */
  protected readonly showSaved = computed(() => {
    const saved = this.saved();
    const current = toAnswers(this.model());
    return (
      !!saved &&
      !!current &&
      saved.status === current.status &&
      saved.arrivalDate === current.arrivalDate
    );
  });

  protected firstError(errors: readonly { message?: string }[]): string {
    return errors[0]?.message ?? '';
  }
}

function initialModel(saved: Answers | null): IntakeModel {
  return {
    status: saved?.status ?? '',
    arrivalDate: saved ? fromIsoDate(saved.arrivalDate) : null,
  };
}

function toAnswers(model: IntakeModel): Answers | null {
  const { status, arrivalDate } = model;
  if (status === '' || checkArrivalDate(arrivalDate) !== null) return null;
  return { status, arrivalDate: toIsoDate(arrivalDate!) };
}
