import { Component, TemplateRef, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthService } from '../../../../core/services/auth/auth.service';
import { CanEditTicketDirective } from './caneditticket.directive';

@Component({
  template: `<ng-template [appCanEditTicket]="ticket"><span>EDIT</span></ng-template>`
})
class TestComponent {
  ticket = { assignedTo: 1 };
  @ViewChild(CanEditTicketDirective) directive!: CanEditTicketDirective;
}

describe('CanEditTicketDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let component: TestComponent;
  let authServiceMock: any;

  beforeEach(() => {
    authServiceMock = { user: null };

    TestBed.configureTestingModule({
      declarations: [TestComponent, CanEditTicketDirective],
      providers: [{ provide: AuthService, useValue: authServiceMock }]
    });

    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
  });

  it('should show template for admin', () => {
    authServiceMock.user = { role: 'admin', id: 999 };
    component.ticket.assignedTo = 1;
    fixture.detectChanges();

    expect(fixture.nativeElement.innerHTML).toContain('EDIT');
  });

  it('should show template for editor assigned to ticket', () => {
    authServiceMock.user = { role: 'editor', id: 1 };
    component.ticket.assignedTo = 1;
    fixture.detectChanges();

    expect(fixture.nativeElement.innerHTML).toContain('EDIT');
  });

  it('should not show template for editor not assigned to ticket', () => {
    authServiceMock.user = { role: 'editor', id: 2 };
    component.ticket.assignedTo = 1;
    fixture.detectChanges();

    expect(fixture.nativeElement.innerHTML).not.toContain('EDIT');
  });

  it('should not show template if user is null', () => {
    authServiceMock.user = null;
    fixture.detectChanges();

    expect(fixture.nativeElement.innerHTML).not.toContain('EDIT');
  });
});
