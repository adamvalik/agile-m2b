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

function radio(page: HTMLElement, value: 'eu' | 'non-eu'): HTMLInputElement {
  return page.querySelector<HTMLInputElement>(`input[type="radio"][value="${value}"]`)!;
}

describe('Intake', () => {
  beforeEach(() => localStorage.clear());

  it('asks only for EU or non-EU status and the arrival date', async () => {
    const { page } = await render();

    const inputs = [...page.querySelectorAll('input, select, textarea')];
    expect(inputs.map((input) => input.getAttribute('type'))).toEqual(['radio', 'radio']);
    expect(page.querySelector('#arrival-date')?.textContent).toContain('Pick a date');

    const questions = [...page.querySelectorAll('legend, label')].map((el) =>
      el.textContent?.trim(),
    );
    expect(questions).toEqual([
      'Are you an EU citizen?',
      'Yes, EU citizen',
      'No, non-EU citizen',
      'When do you arrive in Bolzano?',
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
    expect(localStorage.getItem(ANSWERS_STORAGE_KEY)).toBeNull();
  });

  it('blocks submit when only the arrival date is missing', async () => {
    const { fixture, page } = await render();
    radio(page, 'eu').click();
    await submit(fixture);

    expect(page.textContent).toContain(INTAKE_MESSAGES.dateMissing);
    expect(page.textContent).not.toContain(INTAKE_MESSAGES.statusMissing);
    expect(localStorage.getItem(ANSWERS_STORAGE_KEY)).toBeNull();
  });

  it('fills in the answers saved earlier', async () => {
    saveAnswers({ status: 'non-eu', arrivalDate: '2027-03-01' });
    const { page } = await render();

    expect(radio(page, 'non-eu').checked).toBe(true);
    expect(page.querySelector('#arrival-date')?.textContent).toContain('Mon 1 March 2027');
  });

  it('saves changed answers and opens the checklist with them', async () => {
    saveAnswers({ status: 'eu', arrivalDate: '2027-03-01' });
    const { fixture, page } = await render();
    radio(page, 'non-eu').click();
    await submit(fixture);

    expect(loadAnswers()).toEqual({ status: 'non-eu', arrivalDate: '2027-03-01' });
    expect(TestBed.inject(Router).url).toBe('/checklist');
    expect(page.textContent).not.toContain(INTAKE_MESSAGES.summary);
  });

  it('stays on the intake while an answer is missing', async () => {
    const { fixture } = await render();
    await submit(fixture);

    expect(TestBed.inject(Router).url).toBe('/');
  });

  it('goes back to the checklist when the student came to change their answers', async () => {
    saveAnswers({ status: 'eu', arrivalDate: '2027-03-01' });
    const { page } = await render();

    expect(page.querySelector('a')?.getAttribute('href')).toBe('/checklist');
  });

  it('goes back to the first page on a first visit', async () => {
    const { page } = await render();

    expect(page.querySelector('a')?.getAttribute('href')).toBe('/');
  });
});
