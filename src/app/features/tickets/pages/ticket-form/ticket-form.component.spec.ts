import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TicketFormComponent } from './ticket-form.component';
import { TicketService } from '../../services/tickets.service';
import { UserService } from '../../../users/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { of } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';

describe('TicketFormComponent', () => {
  let component: TicketFormComponent;
  let fixture: ComponentFixture<TicketFormComponent>;
  let ticketServiceSpy: jasmine.SpyObj<TicketService>;
  let userServiceSpy: jasmine.SpyObj<UserService>;
  let routerSpy: jasmine.SpyObj<Router>;
  let snackBarSpy: jasmine.SpyObj<MatSnackBar>;
  const routeMock = { params: of({ id: 1 }) } as any as ActivatedRoute;

  beforeEach(() => {
    ticketServiceSpy = jasmine.createSpyObj('TicketService', ['getById', 'update', 'create']);
    userServiceSpy = jasmine.createSpyObj('UserService', ['getById', 'getAll']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    snackBarSpy = jasmine.createSpyObj('MatSnackBar', ['open']);

    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, TicketFormComponent],
      providers: [
        { provide: TicketService, useValue: ticketServiceSpy },
        { provide: UserService, useValue: userServiceSpy },
        { provide: Router, useValue: routerSpy },
        { provide: ActivatedRoute, useValue: routeMock },
        { provide: MatSnackBar, useValue: snackBarSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TicketFormComponent);
    component = fixture.componentInstance;
  });

  it('should build form on init', () => {
    component.ngOnInit();
    expect(component.form).toBeDefined();
    expect(component.form.controls['title']).toBeDefined();
  });

  it('should populate form in editing flow', () => {
    const ticket = { id: 1, title: 'Test', description: '', status: 'aberto', priority: 'alta', createdAt: new Date(), updatedAt: new Date(), createdBy: 1, assignedTo: 1 };
    userServiceSpy.getById.and.returnValue({ id: 1, name: 'Felipe', email: '', role: 'admin' });
    
    component.populateFormInEditingFlow(ticket);
    expect(component.form.value.title).toBe('Test');
    expect(component.form.value.attendant).toBe('Felipe');
  });

  it('should save new ticket', () => {
    component.form = component.fb.group({
      title: ['New'],
      description: [''],
      priority: ['alta'],
      status: ['aberto'],
      attendant: ['Felipe']
    });
    component.editing = false;

    component.save();
    expect(ticketServiceSpy.create).toHaveBeenCalled();
    expect(snackBarSpy.open).toHaveBeenCalled();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/tickets']);
  });

  it('should update ticket in editing mode', () => {
    component.ticketId = 1;
    component.editing = true;
    component.form = component.fb.group({
      title: ['Updated'],
      description: [''],
      priority: ['alta'],
      status: ['aberto'],
      attendant: ['Felipe']
    });

    component.save();
    expect(ticketServiceSpy.update).toHaveBeenCalledWith(1, jasmine.any(Object));
    expect(snackBarSpy.open).toHaveBeenCalled();
  });

  it('should cancel and navigate back', () => {
    component.cancel();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/tickets']);
  });
});
