import { Routes } from '@angular/router';

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
  { path: '**', redirectTo: '' },
];
