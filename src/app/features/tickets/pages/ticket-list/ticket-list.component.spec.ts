import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TicketListComponent } from './ticket-list.component';
import { TicketService } from '../../services/tickets.service';
import { UserService } from '../../../users/services/user.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Ticket } from '../../models/tickets';

describe('TicketListComponent', () => {
  let component: TicketListComponent;
  let fixture: ComponentFixture<TicketListComponent>;
  let ticketServiceSpy: jasmine.SpyObj<TicketService>;
  let userServiceSpy: jasmine.SpyObj<UserService>;
  let routerSpy: jasmine.SpyObj<Router>;
  let dialogSpy: jasmine.SpyObj<MatDialog>;

  beforeEach(() => {
    ticketServiceSpy = jasmine.createSpyObj('TicketService', ['getAll', 'delete']);
    userServiceSpy = jasmine.createSpyObj('UserService', ['getById']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    dialogSpy = jasmine.createSpyObj('MatDialog', ['open']);

    TestBed.configureTestingModule({
      imports: [TicketListComponent],
      providers: [
        { provide: TicketService, useValue: ticketServiceSpy },
        { provide: UserService, useValue: userServiceSpy },
        { provide: Router, useValue: routerSpy },
        { provide: MatDialog, useValue: dialogSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TicketListComponent);
    component = fixture.componentInstance;
  });

  it('should load tickets and users on init', () => {
    const tickets: Ticket[] = [{ id: 1, title: 'Test', description: '', status: 'aberto', priority: 'alta', createdAt: new Date(), updatedAt: new Date(), createdBy: 1, assignedTo: 1 }];
    ticketServiceSpy.getAll.and.returnValue(tickets);
    userServiceSpy.getById.and.returnValue({ id: 1, name: 'Felipe', email: '', role: 'admin' });

    component.ngOnInit();
    expect(component.tickets.length).toBe(1);
    expect(component.attendantData.length).toBe(1);
  });

  it('should navigate to create ticket', () => {
    component.createTicket();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/tickets/new']);
  });

  it('should navigate to edit ticket', () => {
    component.editTicket(1);
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/tickets', 1, 'edit']);
  });
});
