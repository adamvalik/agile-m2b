import { Component } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { ANSWERS_STORAGE_KEY, loadAnswers, saveAnswers } from '../../../core/answers';
import { Intake, INTAKE_MESSAGES } from './intake.component';

@Component({ template: '' })
class ChecklistStub {}

async function render(): Promise<{ fixture: ComponentFixture<Intake>; page: HTMLElement }> {
  TestBed.configureTestingModule({
    providers: [provideRouter([{ path: 'checklist', component: ChecklistStub }])],
  });
  const fixture = TestBed.createComponent(Intake);
  await fixture.whenStable();
  return { fixture, page: fixture.nativeElement as HTMLElement };
}

async function submit(fixture: ComponentFixture<Intake>): Promise<void> {
  const form = (fixture.nativeElement as HTMLElement).querySelector('form')!;
  form.dispatchEvent(new Event('submit', { cancelable: true }));
  await fixture.whenStable();
}

function radio(page: HTMLElement, id: string): HTMLInputElement {
  return page.querySelector<HTMLInputElement>(`input[type="radio"]#${id}`)!;
}

const saved = { status: 'eu', arrivalDate: '2027-03-01', stay: 'semester' } as const;

describe('Intake', () => {
  beforeEach(() => localStorage.clear());

  it('asks only for status, arrival date, length of stay and, optionally, age', async () => {
    const { page } = await render();

    const inputs = [...page.querySelectorAll('input, select, textarea')];
    expect(inputs.map((input) => input.getAttribute('type'))).toEqual(Array(7).fill('radio'));
    expect(page.querySelector('#arrival-date')?.textContent).toContain('Pick a date');

    const questions = [...page.querySelectorAll('legend, label')].map((el) =>
      el.textContent?.trim(),
    );
    expect(questions).toEqual([
      'Are you an EU citizen?',
      'Yes, EU citizen',
      'No, non-EU citizen',
      'When do you arrive in Bolzano?',
      'How long do you stay?',
      'One semester',
      'A full year',
      'Are you under 26 when you arrive? (optional)',
      'Yes, under 26',
      'No, 26 or older',
      'Prefer not to say',
    ]);
  });

  it('shows no errors before the student submits', async () => {
    const { page } = await render();
    expect(page.textContent).not.toContain(INTAKE_MESSAGES.summary);
    expect(page.textContent).not.toContain(INTAKE_MESSAGES.dateMissing);
  });

  it('blocks submit and explains what is missing', async () => {
    const { fixture, page } = await render();
    await submit(fixture);

    expect(page.textContent).toContain(INTAKE_MESSAGES.summary);
    expect(page.textContent).toContain(INTAKE_MESSAGES.statusMissing);
    expect(page.textContent).toContain(INTAKE_MESSAGES.dateMissing);
    expect(page.textContent).toContain(INTAKE_MESSAGES.stayMissing);
    expect(localStorage.getItem(ANSWERS_STORAGE_KEY)).toBeNull();
  });

  it('blocks submit when only the arrival date is missing', async () => {
    const { fixture, page } = await render();
    radio(page, 'status-eu').click();
    radio(page, 'stay-year').click();
    await submit(fixture);

    expect(page.textContent).toContain(INTAKE_MESSAGES.dateMissing);
    expect(page.textContent).not.toContain(INTAKE_MESSAGES.statusMissing);
    expect(page.textContent).not.toContain(INTAKE_MESSAGES.stayMissing);
    expect(localStorage.getItem(ANSWERS_STORAGE_KEY)).toBeNull();
  });

  it('fills in the answers saved earlier', async () => {
    saveAnswers({ status: 'non-eu', arrivalDate: '2027-03-01', stay: 'year', under26: 'no' });
    const { page } = await render();

    expect(radio(page, 'status-non-eu').checked).toBe(true);
    expect(page.querySelector('#arrival-date')?.textContent).toContain('Mon 1 March 2027');
    expect(radio(page, 'stay-year').checked).toBe(true);
    expect(radio(page, 'under26-no').checked).toBe(true);
  });

  it('saves changed answers and opens the checklist with them', async () => {
    saveAnswers(saved);
    const { fixture, page } = await render();
    radio(page, 'status-non-eu').click();
    radio(page, 'stay-year').click();
    radio(page, 'under26-prefer-not-to-say').click();
    await submit(fixture);

    expect(loadAnswers()).toEqual({
      status: 'non-eu',
      arrivalDate: '2027-03-01',
      stay: 'year',
      under26: 'prefer-not-to-say',
    });
    expect(TestBed.inject(Router).url).toBe('/checklist');
    expect(page.textContent).not.toContain(INTAKE_MESSAGES.summary);
  });

  it('saves the answers without an age when the student skips that question', async () => {
    saveAnswers(saved);
    const { fixture } = await render();
    await submit(fixture);

    expect(loadAnswers()).toEqual(saved);
    expect(TestBed.inject(Router).url).toBe('/checklist');
  });

  it('asks only for the stay when the answers were saved before that question', async () => {
    localStorage.setItem(ANSWERS_STORAGE_KEY, '{"status":"eu","arrivalDate":"2027-03-01"}');
    const { fixture, page } = await render();

    expect(radio(page, 'status-eu').checked).toBe(true);
    expect(page.querySelector('#arrival-date')?.textContent).toContain('Mon 1 March 2027');

    await submit(fixture);
    expect(page.textContent).toContain(INTAKE_MESSAGES.stayMissing);
    expect(page.textContent).not.toContain(INTAKE_MESSAGES.statusMissing);
    expect(page.textContent).not.toContain(INTAKE_MESSAGES.dateMissing);

    radio(page, 'stay-semester').click();
    await submit(fixture);
    expect(loadAnswers()).toEqual(saved);
  });

  it('stays on the intake while an answer is missing', async () => {
    const { fixture } = await render();
    await submit(fixture);

    expect(TestBed.inject(Router).url).toBe('/');
  });

  it('goes back to the checklist when the student came to change their answers', async () => {
    saveAnswers(saved);
    const { page } = await render();

    expect(page.querySelector('a')?.getAttribute('href')).toBe('/checklist');
  });

  it('goes back to the first page on a first visit', async () => {
    const { page } = await render();

    expect(page.querySelector('a')?.getAttribute('href')).toBe('/');
  });
});
