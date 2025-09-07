import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { AuthService } from '../../../../core/services/auth/auth.service';

@Directive({
  selector: '[hasPermission]',
  standalone: true
})
export class HasPermissionDirective {
  private role: 'admin' | 'editor' | 'viewer' | null = null;

  constructor(
    private tpl: TemplateRef<any>,
    private vcr: ViewContainerRef,
    private auth: AuthService
  ) {}

  @Input() set hasPermission(role: 'admin' | 'editor' | 'viewer') {
    this.role = role;
    this.updateView();
  }

  private updateView() {
    this.vcr.clear();
    if (this.role && this.auth.user?.role === this.role) {
      this.vcr.createEmbeddedView(this.tpl);
    }
  }
}
