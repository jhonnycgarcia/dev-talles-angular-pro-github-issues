import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'issues',
    loadComponent: () => import('./modules/pages/issues-list/issues-list-page.component')
  },
  {
    path: 'issue/:number',
    loadComponent: () => import('./modules/pages/issue/issue-page.component')
  },
  {
    path: '**',
    redirectTo: 'issues'
  }
];
