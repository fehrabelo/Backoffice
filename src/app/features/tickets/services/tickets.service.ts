import { Injectable } from '@angular/core';
import { Ticket } from '../models/tickets';

@Injectable({ providedIn: 'root' })
export class TicketService {
  private tickets: Ticket[] = [
    {
      id: 1,
      title: 'Erro no login',
      description: 'Usuário não consegue acessar o sistema',
      status: 'aberto',
      priority: 'alta',
      createdAt: new Date(),
      updatedAt: new Date(),
      createdBy: 1,
      assignedTo: 2
    }
  ];

  getAll(): Ticket[] { return [...this.tickets]; }
  getById(id: number): Ticket | undefined { return this.tickets.find(t => t.id === id); }
  create(ticket: Ticket) { ticket.id = this.tickets.length + 1; ticket.createdAt = new Date(); ticket.updatedAt = new Date(); this.tickets.push(ticket); }
  update(id: number, ticket: Ticket) { const index = this.tickets.findIndex(t => t.id === id); if(index > -1) this.tickets[index] = {...ticket, id, updatedAt: new Date()}; }
  delete(id: number) { this.tickets = this.tickets.filter(t => t.id !== id); }
}
