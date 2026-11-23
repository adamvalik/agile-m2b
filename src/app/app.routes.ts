import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    title: 'First weeks in Bolzano',
    loadComponent: () => import('./pages/home/home.component').then((m) => m.Home),
  },
  {
    path: 'steps',
    title: 'All steps | First weeks in Bolzano',
    loadComponent: () => import('./pages/steps/steps.component').then((m) => m.Steps),
  },
  { path: '**', redirectTo: '' },
];
