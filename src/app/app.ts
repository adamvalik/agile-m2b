import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  template: `
    <main class="mx-auto max-w-[42.5rem] px-5 pt-6 pb-12">
      <router-outlet />
    </main>
  `,
})
export class App {}
