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
  template: `
    <mat-card *ngIf="ticket">
      <mat-card-header>
        <mat-card-title>{{ ticket.title }}</mat-card-title>
        <mat-card-subtitle>Status: {{ ticket.status }} | Prioridade: {{ ticket.priority }}</mat-card-subtitle>
      </mat-card-header>

      <mat-card-content>
        <p><strong>Descrição:</strong></p>
        <p>{{ ticket.description }}</p>

        <p><strong>Criado por:</strong> Usuário #{{ ticket.createdBy }}</p>
        <p><strong>Atribuído a:</strong> {{ ticket.assignedTo ? 'Usuário #' + ticket.assignedTo : 'Não atribuído' }}</p>

        <p><strong>Criado em:</strong> {{ ticket.createdAt | date:'short' }}</p>
        <p><strong>Última atualização:</strong> {{ ticket.updatedAt | date:'short' }}</p>
      </mat-card-content>

      <mat-card-actions>
        <button mat-raised-button color="primary" (click)="editTicket()">
          <mat-icon>edit</mat-icon> Editar
        </button>
        <button mat-stroked-button color="warn" (click)="goBack()">
          <mat-icon>arrow_back</mat-icon> Voltar
        </button>
      </mat-card-actions>
    </mat-card>
    <p *ngIf="!ticket">Chamado não encontrado.</p>
  `,
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
