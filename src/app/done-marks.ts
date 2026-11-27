import { Service, signal } from '@angular/core';
import { loadDone, saveDone, toggleDone } from '../core/progress';

/**
 * The steps the student marked as done (#79), shared by the checklist and the guides. Every
 * change is saved straight away in `localStorage`, on this device only.
 */
@Service()
export class DoneMarks {
  private readonly marks = signal(loadDone());

  /** The ids of the steps marked done. */
  readonly ids = this.marks.asReadonly();

  isDone(id: string): boolean {
    return this.marks().has(id);
  }

  /**
   * Marks a step as done, or removes the mark. The mark stays for this visit even when the
   * browser does not allow saving it.
   */
  toggle(id: string): void {
    this.marks.update((done) => toggleDone(done, id));
    saveDone(this.marks());
  }
}
