import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Home } from './home.component';

describe('Home', () => {
  beforeEach(() => TestBed.configureTestingModule({ providers: [provideRouter([])] }));

  it('explains in one sentence what the app is for', async () => {
    const fixture = TestBed.createComponent(Home);
    await fixture.whenStable();
    const page = fixture.nativeElement as HTMLElement;

    expect(page.querySelector('h1')?.textContent).toContain(
      'Settle into your first weeks in Bolzano.',
    );
    expect(page.querySelector('h1 + p')?.textContent).toContain(
      'For incoming exchange students at unibz.',
    );
  });

  it('leads to the checklist, which asks the intake questions first when needed', async () => {
    const fixture = TestBed.createComponent(Home);
    await fixture.whenStable();
    const link = (fixture.nativeElement as HTMLElement).querySelector('a[href="/checklist"]');

    expect(link?.textContent).toContain('Get my checklist');
  });
});
