import { Routes } from '@angular/router';
import { hasAnswers } from './has-answers.guard';

export const routes: Routes = [
  {
    path: '',
    title: 'First weeks in Bolzano',
    loadComponent: () => import('./pages/home/home.component').then((m) => m.Home),
  },
  {
    path: 'intake',
    title: 'Two quick questions | First weeks in Bolzano',
    loadComponent: () => import('./pages/intake/intake.component').then((m) => m.Intake),
  },
  {
    path: 'checklist',
    title: 'Your checklist | First weeks in Bolzano',
    canActivate: [hasAnswers],
    loadComponent: () => import('./pages/checklist/checklist.component').then((m) => m.Checklist),
  },
  {
    path: 'steps',
    title: 'All steps | First weeks in Bolzano',
    loadComponent: () => import('./pages/steps/steps.component').then((m) => m.Steps),
  },
  {
    // The guide sets its own page title from the step (see guide.component.ts).
    path: 'steps/:id',
    loadComponent: () => import('./pages/guide/guide.component').then((m) => m.Guide),
  },
  { path: '**', redirectTo: '' },
];
