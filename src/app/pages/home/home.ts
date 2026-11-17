import { Component } from '@angular/core';

/** First page (#34): says in one sentence what the app is for. */
@Component({
  selector: 'app-home',
  template: `
    <h1>First weeks in Bolzano</h1>
    <p class="lead">
      A personal, ordered checklist of what to do in your first weeks in Bolzano as an exchange
      student at unibz.
    </p>
    <p class="note">Your checklist is coming soon.</p>
  `,
  styles: `
    h1 {
      font-size: 1.75rem;
      line-height: 1.2;
      margin: 0 0 0.75rem;
    }
    .lead {
      font-size: 1.125rem;
      margin: 0 0 1.5rem;
    }
    .note {
      color: var(--muted);
      margin: 0;
    }
  `,
})
export class Home {}
