/**
 * Arrival date helpers. An arrival date is a calendar day, stored as YYYY-MM-DD with no time
 * and no time zone, so the day the student picked never shifts.
 */

export type ArrivalDateProblem = 'missing' | 'invalid';

const ISO_DATE = /^(\d{4})-(\d{2})-(\d{2})$/;

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

/** Says what is wrong with an arrival date, or returns null when it is a real calendar day. */
export function checkArrivalDate(
  value: Date | string | null | undefined,
): ArrivalDateProblem | null {
  if (value === null || value === undefined) return 'missing';
  if (value instanceof Date) return Number.isNaN(value.getTime()) ? 'invalid' : null;
  if (value.trim() === '') return 'missing';
  return fromIsoDate(value) ? null : 'invalid';
}

/** Reads YYYY-MM-DD as local midnight, or returns null when the day does not exist (2027-02-30). */
export function fromIsoDate(value: string): Date | null {
  const match = ISO_DATE.exec(value);
  if (!match) return null;
  const [year, month, day] = [Number(match[1]), Number(match[2]), Number(match[3])];
  const date = new Date(year, month - 1, day);
  const sameDay =
    date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day;
  return sameDay ? date : null;
}

/** Writes the local calendar day of a date as YYYY-MM-DD. */
export function toIsoDate(date: Date): string {
  const year = String(date.getFullYear()).padStart(4, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/** Formats a date the way the screens show it, for example "Mon 1 March 2027". */
export function formatArrivalDate(date: Date): string {
  return `${formatDueDate(date)} ${date.getFullYear()}`;
}

/** Formats a due date without the year, for example "Wed 10 March". */
export function formatDueDate(date: Date): string {
  return `${WEEKDAYS[date.getDay()]} ${date.getDate()} ${MONTHS[date.getMonth()]}`;
}

/** Formats a date without the weekday, for example "17 November 2026". */
export function formatLongDate(date: Date): string {
  return `${date.getDate()} ${MONTHS[date.getMonth()]} ${date.getFullYear()}`;
}

/**
 * The day a deadline of `workingDays` falls on, counting from the day after `start`.
 * Saturdays count as working days and Sundays do not, as the step facts say for now;
 * public holidays are not taken into account.
 */
export function addWorkingDays(start: Date, workingDays: number): Date {
  const day = new Date(start.getFullYear(), start.getMonth(), start.getDate());
  let left = workingDays;
  while (left > 0) {
    day.setDate(day.getDate() + 1);
    if (day.getDay() !== 0) left--;
  }
  return day;
}
