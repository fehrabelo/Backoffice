import { Routes } from '@angular/router';

import { LayoutComponent } from './layout/layout.component';
import { authGuard } from './core/guards/auth/auth.guard';
import { roleGuard } from './core/guards/role/role.guard';
import { LoginComponent } from './features/auth/login/login.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'users',
        canActivate: [roleGuard(['admin'])],
        loadChildren: () => import('./features/users/user.routes').then(m => m.USER_ROUTES)
      },
      {
        path: 'tickets',
        canActivate: [roleGuard(['admin','editor','viewer'])],
        loadChildren: () =>  import('./features/tickets/ticket.routes').then(m => m.TICKET_ROUTES)
      },
      { path: '', redirectTo: 'tickets', pathMatch: 'full' }
    ]
  }
];






  