import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideCalendar, lucideCircleCheck, lucideLock, lucideShieldCheck } from '@ng-icons/lucide';
import { HlmAlertImports } from '@spartan-ng/helm/alert';
import { HlmButtonImports } from '@spartan-ng/helm/button';

@Component({
  selector: 'app-home',
  imports: [RouterLink, NgIcon, HlmAlertImports, HlmButtonImports],
  providers: [provideIcons({ lucideCalendar, lucideCircleCheck, lucideLock, lucideShieldCheck })],
  templateUrl: './home.component.html',
})
export class Home {}
