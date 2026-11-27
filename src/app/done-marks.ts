import { DestroyRef, DOCUMENT, inject, Service, signal } from '@angular/core';
import { loadDone, PROGRESS_STORAGE_KEY, saveDone, toggleDone } from '../core/progress';

/**
 * The steps the student marked as done (#79), shared by the checklist and the guides. Every
 * change is saved straight away in `localStorage`, on this device only.
 */
@Service()
export class DoneMarks {
  private readonly marks = signal(loadDone());
  private readonly lastSaveWorked = signal(true);

  /** The ids of the steps marked done. */
  readonly ids = this.marks.asReadonly();

  /** False when the browser did not allow saving the last change, so it is lost on reload. */
  readonly saved = this.lastSaveWorked.asReadonly();

  constructor() {
    // Another tab of the app changed the marks (or cleared all data): read them again, so a
    // change here does not overwrite what was marked there.
    const window = inject(DOCUMENT).defaultView;
    const reload = (event: StorageEvent) => {
      if (event.key === PROGRESS_STORAGE_KEY || event.key === null) this.marks.set(loadDone());
    };
    window?.addEventListener('storage', reload);
    inject(DestroyRef).onDestroy(() => window?.removeEventListener('storage', reload));
  }

  isDone(id: string): boolean {
    return this.marks().has(id);
  }

  /**
   * Marks a step as done, or removes the mark. The mark stays for this visit even when the
   * browser does not allow saving it.
   */
  toggle(id: string): void {
    this.marks.update((done) => toggleDone(done, id));
    this.lastSaveWorked.set(saveDone(this.marks()));
  }
}
