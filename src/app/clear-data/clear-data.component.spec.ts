import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { ANSWERS_STORAGE_KEY, saveAnswers } from '../../core/answers';
import { ClearData } from './clear-data.component';

async function render() {
  TestBed.configureTestingModule({ providers: [provideRouter([])] });
  const fixture = TestBed.createComponent(ClearData);
  await fixture.whenStable();
  const page = fixture.nativeElement as HTMLElement;
  const button = (text: string) =>
    [...page.querySelectorAll('button')].find((b) => b.textContent?.trim() === text);
  const click = async (text: string) => {
    button(text)!.click();
    await fixture.whenStable();
  };
  return { page, button, click };
}

describe('ClearData', () => {
  beforeEach(() => {
    localStorage.clear();
    saveAnswers({ status: 'eu', arrivalDate: '2027-03-01', stay: 'semester' });
  });
  afterEach(() => localStorage.clear());

  it('says what is stored and where', async () => {
    const { page } = await render();

    expect(page.textContent).toContain('saved only in this browser on this device');
    expect(page.textContent).toContain('Nothing is sent to a server');
  });

  it('asks for confirmation before clearing', async () => {
    const { page, click, button } = await render();

    await click('Clear my data');

    expect(page.textContent).toContain('Remove your answers and progress from this device?');
    expect(button('Yes, clear my data')).toBeDefined();
    expect(localStorage.getItem(ANSWERS_STORAGE_KEY)).not.toBeNull();
    expect(document.activeElement?.id).toBe('confirm-heading');
  });

  it('keeps the data when the student cancels', async () => {
    const { click, button } = await render();

    await click('Clear my data');
    await click('Cancel');

    expect(localStorage.getItem(ANSWERS_STORAGE_KEY)).not.toBeNull();
    expect(document.activeElement).toBe(button('Clear my data'));
  });

  it('removes all app data and goes to the first page after confirming', async () => {
    localStorage.setItem('m2b.progress', '{}');
    const { click } = await render();
    const navigate = vi.spyOn(TestBed.inject(Router), 'navigateByUrl');

    await click('Clear my data');
    await click('Yes, clear my data');

    expect(localStorage.getItem(ANSWERS_STORAGE_KEY)).toBeNull();
    expect(localStorage.getItem('m2b.progress')).toBeNull();
    expect(navigate).toHaveBeenCalledWith('/');
  });
});
