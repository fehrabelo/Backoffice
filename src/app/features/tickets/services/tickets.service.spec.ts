import { TestBed } from '@angular/core/testing';
import { Ticket } from '../models/tickets';
import { TicketService } from './tickets.service';

describe('TicketService', () => {
  let service: TicketService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TicketService);
  });

  it('should return all tickets', () => {
    const tickets = service.getAll();
    expect(tickets.length).toBe(3);
  });

  it('should get ticket by id', () => {
    const ticket = service.getById(1);
    expect(ticket).toBeTruthy();
    expect(ticket?.title).toBe('Erro no login');
  });

  it('should create a new ticket', () => {
    const newTicket: Ticket = {
      id: 0,
      title: 'Novo Ticket',
      description: 'Teste',
      status: 'aberto',
      priority: 'baixa',
      createdAt: new Date(),
      updatedAt: new Date(),
      createdBy: 1,
      assignedTo: 2
    };
    service.create(newTicket);
    const created = service.getById(4);
    expect(created).toBeTruthy();
    expect(created?.title).toBe('Novo Ticket');
  });

  it('should update an existing ticket', () => {
    const updateTicket: Ticket = { ...service.getById(1)!, title: 'Atualizado' };
    service.update(1, updateTicket);
    const ticket = service.getById(1);
    expect(ticket?.title).toBe('Atualizado');
  });

  it('should delete a ticket', () => {
    service.delete(1);
    const ticket = service.getById(1);
    expect(ticket).toBeUndefined();
  });
});
