import {
  addWorkingDays,
  checkArrivalDate,
  formatArrivalDate,
  formatDueDate,
  formatLongDate,
  fromIsoDate,
  toIsoDate,
} from './arrival-date';

describe('checkArrivalDate', () => {
  it('says a missing date is missing', () => {
    expect(checkArrivalDate(null)).toBe('missing');
    expect(checkArrivalDate(undefined)).toBe('missing');
    expect(checkArrivalDate('')).toBe('missing');
    expect(checkArrivalDate('   ')).toBe('missing');
  });

  it('says a day that does not exist is invalid', () => {
    expect(checkArrivalDate('2027-02-30')).toBe('invalid');
    expect(checkArrivalDate('2027-13-01')).toBe('invalid');
    expect(checkArrivalDate('01/03/2027')).toBe('invalid');
    expect(checkArrivalDate(new Date('not a date'))).toBe('invalid');
  });

  it('accepts a real day, as text or as a date', () => {
    expect(checkArrivalDate('2027-03-01')).toBeNull();
    expect(checkArrivalDate('2028-02-29')).toBeNull();
    expect(checkArrivalDate(new Date(2027, 2, 1))).toBeNull();
  });
});

describe('fromIsoDate and toIsoDate', () => {
  it('keep the same calendar day in both directions', () => {
    const date = fromIsoDate('2027-03-01');
    expect(date).not.toBeNull();
    expect(toIsoDate(date!)).toBe('2027-03-01');
  });

  it('read the day as local midnight', () => {
    const date = fromIsoDate('2027-03-01')!;
    expect([date.getFullYear(), date.getMonth(), date.getDate(), date.getHours()]).toEqual([
      2027, 2, 1, 0,
    ]);
  });

  it('reject a leap day in a year without one', () => {
    expect(fromIsoDate('2027-02-29')).toBeNull();
  });
});

describe('formatArrivalDate', () => {
  it('shows weekday, day, month and year like the screens', () => {
    expect(formatArrivalDate(new Date(2027, 2, 1))).toBe('Mon 1 March 2027');
  });
});

describe('formatDueDate and formatLongDate', () => {
  it('show a due date without the year and a long date without the weekday', () => {
    expect(formatDueDate(new Date(2027, 2, 10))).toBe('Wed 10 March');
    expect(formatLongDate(new Date(2026, 10, 17))).toBe('17 November 2026');
  });
});

describe('addWorkingDays', () => {
  const iso = (date: Date) => toIsoDate(date);

  it('counts from the day after arrival and skips Sundays, as in the sketch', () => {
    expect(iso(addWorkingDays(fromIsoDate('2027-03-01')!, 8))).toBe('2027-03-10');
  });

  it('counts Saturdays as working days', () => {
    expect(iso(addWorkingDays(fromIsoDate('2027-03-05')!, 1))).toBe('2027-03-06');
  });

  it('moves past a Sunday when arriving on a Saturday or a Sunday', () => {
    expect(iso(addWorkingDays(fromIsoDate('2027-03-06')!, 1))).toBe('2027-03-08');
    expect(iso(addWorkingDays(fromIsoDate('2027-03-07')!, 1))).toBe('2027-03-08');
  });

  it('crosses months and years', () => {
    expect(iso(addWorkingDays(fromIsoDate('2026-12-30')!, 3))).toBe('2027-01-02');
  });
});
