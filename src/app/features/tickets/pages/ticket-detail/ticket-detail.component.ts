import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TicketService } from '../../services/tickets.service';
import { Ticket } from '../../models/tickets';


@Component({
  selector: 'app-ticket-detail',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule],
  providers: [DatePipe],
  templateUrl:'./ticket-detail.component.html',
  styles: [`
    mat-card { max-width: 600px; margin: 24px auto; }
    mat-card-content p { margin: 4px 0; }
    mat-card-actions { display: flex; gap: 8px; }
  `]
})
export class TicketDetailComponent implements OnInit {
  ticket?: Ticket;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private ticketService: TicketService
  ) {
    
  }

ngOnInit(): void {
  this.route.params.subscribe(params => {
      const id = +params['id'];
      this.ticket = this.ticketService.getById(id);
    });
}
  editTicket() {
    if (this.ticket) {
      this.router.navigate(['/tickets', this.ticket.id, 'edit']);
    }
  }

  goBack() {
    this.router.navigate(['/tickets']);
  }
}
