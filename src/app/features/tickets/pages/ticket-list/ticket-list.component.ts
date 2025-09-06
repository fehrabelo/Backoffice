import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Ticket } from '../../models/tickets';
import { TicketService } from '../../services/tickets.service';
import { ConfirmDialogComponent } from '../../../../shared/componentes/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-ticket-list',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, MatIconModule],
  template: `
    <div class="header">
      <h2>Chamados</h2>
      <button mat-raised-button color="primary" (click)="createTicket()">
        <mat-icon>add</mat-icon> Novo Chamado
      </button>
    </div>

    <table mat-table [dataSource]="tickets" class="mat-elevation-z8 full-width">

      <ng-container matColumnDef="title">
        <th mat-header-cell *matHeaderCellDef> Título </th>
        <td mat-cell *matCellDef="let ticket">{{ ticket.title }}</td>
      </ng-container>

      <ng-container matColumnDef="status">
        <th mat-header-cell *matHeaderCellDef> Status </th>
        <td mat-cell *matCellDef="let ticket">{{ ticket.status }}</td>
      </ng-container>

      <ng-container matColumnDef="priority">
        <th mat-header-cell *matHeaderCellDef> Prioridade </th>
        <td mat-cell *matCellDef="let ticket">{{ ticket.priority }}</td>
      </ng-container>

      <ng-container matColumnDef="actions">
        <th mat-header-cell *matHeaderCellDef> Ações </th>
        <td mat-cell *matCellDef="let ticket">
          <button mat-icon-button color="primary" (click)="editTicket(ticket.id)">
            <mat-icon>edit</mat-icon>
          </button>
          <button mat-icon-button color="warn" (click)="confirmDelete(ticket.id)">
            <mat-icon>delete</mat-icon>
          </button>
        </td>
      </ng-container>

      <tr mat-header-row *matHeaderRowDef="displayed"></tr>
      <tr mat-row *matRowDef="let row; columns: displayed"></tr>
    </table>
  `,
  styles: [`
    .header {
      display: flex;
      justify-content: space-between;
      margin-bottom: 16px;
    }
    .full-width { width: 100%; }
  `]
})
export class TicketListComponent implements OnInit {
  tickets: Ticket[] = [];
  displayed = ['title', 'status', 'priority', 'actions'];

  constructor(private ticketService: TicketService, private router: Router,private dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadTickets();
  }

  loadTickets() {
    this.tickets = this.ticketService.getAll();
  }

  createTicket() {
    this.router.navigate(['/tickets/new']);
  }

  editTicket(id: number) {
    this.router.navigate(['/tickets', id, 'edit']);
  }

  confirmDelete(id: number) {
      const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        data: { message: 'Deseja excluir esse ticket?' }
      });
  
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.ticketService.delete(id);
        this.loadTickets();
        }
      });
    }
}
