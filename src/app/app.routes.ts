import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component.js';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'users',
        loadChildren: () =>
          import('./features/users/user.routes').then(m => m.USER_ROUTES)
      },
      {
        path: 'tickets',
        loadChildren: () =>
          import('./features/tickets/ticket.routes').then(m => m.TICKET_ROUTES)
      },
      { path: '', redirectTo: 'users', pathMatch: 'full' }
    ]
  },
  { path: '**', redirectTo: '' }
];
