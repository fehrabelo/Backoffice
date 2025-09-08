import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HasPermissionDirective } from './haspermission.directive';
import { AuthService } from '../../../../core/services/auth/auth.service';

@Component({
  template: `<ng-template [hasPermission]="'admin'"><span>ADMIN</span></ng-template>`
})
class TestComponent {
  @ViewChild(HasPermissionDirective) directive!: HasPermissionDirective;
}

describe('HasPermissionDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let authServiceMock: any;

  beforeEach(() => {
    authServiceMock = { user: null };

    TestBed.configureTestingModule({
      declarations: [TestComponent, HasPermissionDirective],
      providers: [{ provide: AuthService, useValue: authServiceMock }]
    });

    fixture = TestBed.createComponent(TestComponent);
  });

  it('should render template for matching role', () => {
    authServiceMock.user = { role: 'admin' };
    fixture.detectChanges();

    expect(fixture.nativeElement.innerHTML).toContain('ADMIN');
  });

  it('should not render template for non-matching role', () => {
    authServiceMock.user = { role: 'editor' };
    fixture.detectChanges();

    expect(fixture.nativeElement.innerHTML).not.toContain('ADMIN');
  });

  it('should not render template if user is null', () => {
    authServiceMock.user = null;
    fixture.detectChanges();

    expect(fixture.nativeElement.innerHTML).not.toContain('ADMIN');
  });
});
