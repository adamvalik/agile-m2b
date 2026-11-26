import {
  Component,
  ElementRef,
  afterNextRender,
  inject,
  Injector,
  signal,
  viewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { clearStoredData } from '../../core/stored-data';

/**
 * Privacy note and a "Clear my data" action (#90). The action asks for confirmation inline
 * first; after clearing, the student goes back to the first page.
 */
@Component({
  selector: 'app-clear-data',
  imports: [HlmButtonImports],
  templateUrl: './clear-data.component.html',
})
export class ClearData {
  private readonly router = inject(Router);
  private readonly injector = inject(Injector);

  protected readonly confirming = signal(false);
  protected readonly failed = signal(false);

  private readonly openButton = viewChild<ElementRef<HTMLButtonElement>>('openButton');
  private readonly confirmHeading = viewChild<ElementRef<HTMLElement>>('confirmHeading');

  protected ask(): void {
    this.failed.set(false);
    this.confirming.set(true);
    this.focusAfterRender(() => this.confirmHeading());
  }

  protected cancel(): void {
    this.confirming.set(false);
    this.focusAfterRender(() => this.openButton());
  }

  protected async clear(): Promise<void> {
    if (!clearStoredData()) {
      this.failed.set(true);
      return;
    }
    await this.router.navigateByUrl('/');
  }

  private focusAfterRender(target: () => ElementRef<HTMLElement> | undefined): void {
    afterNextRender(() => target()?.nativeElement.focus(), { injector: this.injector });
  }
}
