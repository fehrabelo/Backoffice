import { Routes } from '@angular/router';
import { TicketListComponent } from './pages/ticket-list/ticket-list.component';
import { TicketFormComponent } from './pages/ticket-form/ticket-form.component';
import { TicketDetailComponent } from './pages/ticket-detail/ticket-detail.component';

export const TICKET_ROUTES: Routes = [
  { path: '', component: TicketListComponent },
  { path: 'new', component: TicketFormComponent },
  { path: ':id/edit', component: TicketFormComponent },
  { path: ':id', component: TicketDetailComponent }
];
