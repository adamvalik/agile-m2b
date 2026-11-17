import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    title: 'First weeks in Bolzano',
    loadComponent: () => import('./pages/home/home.component').then((m) => m.Home),
  },
  { path: '**', redirectTo: '' },
];
