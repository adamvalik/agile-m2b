import { TestBed } from '@angular/core/testing';
import { Home } from './home.component';

describe('Home', () => {
  it('explains in one sentence what the app is for', async () => {
    const fixture = TestBed.createComponent(Home);
    await fixture.whenStable();
    const page = fixture.nativeElement as HTMLElement;

    expect(page.querySelector('h1')?.textContent).toContain('First weeks in Bolzano');
    expect(page.querySelector('.lead')?.textContent).toContain(
      'ordered checklist of what to do in your first weeks in Bolzano',
    );
  });
});
