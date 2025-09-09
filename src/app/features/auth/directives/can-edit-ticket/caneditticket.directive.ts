import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { AuthService } from '../../../../core/services/auth/auth.service';

@Directive({
  selector: '[appCanEditTicket]',
  standalone: true
})
export class CanEditTicketDirective {
  private currentUser: any;

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private authService: AuthService
  ) {
    this.currentUser = this.authService.user;
  }

  @Input() set appCanEditTicket(ticket: any) {
    this.viewContainer.clear();

    if (!this.currentUser) return;

    if (this.currentUser.role === 'admin') {
      this.viewContainer.createEmbeddedView(this.templateRef);
      return;
    }

    if (this.currentUser.role === 'editor' && ticket.assignedTo === this.currentUser.id) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    }
  }
}
