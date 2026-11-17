import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  template: `
    <main class="page">
      <router-outlet />
    </main>
  `,
  styles: `
    .page {
      max-width: 40rem;
      margin: 0 auto;
      padding: 1.5rem 1rem 3rem;
    }
  `,
})
export class App {}
