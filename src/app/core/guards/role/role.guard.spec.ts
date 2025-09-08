import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { roleGuard } from './role.guard';
import { AuthService } from '../../services/auth/auth.service';

describe('roleGuard', () => {
  let authService: jasmine.SpyObj<AuthService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(() => {
    const authSpy = jasmine.createSpyObj('AuthService', ['isAuthenticated']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      providers: [
        { provide: AuthService, useValue: authSpy },
        { provide: Router, useValue: routerSpy }
      ]
    });

    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should allow access for allowed role', () => {
    authService.isAuthenticated.and.returnValue(true);
    authService.user = { id: 1, role: 'admin', name: 'Admin', email: '', token: 'abc' };
    const guardFn = roleGuard(['admin', 'editor']);
    const result = guardFn();
    expect(result).toBeTrue();
    expect(router.navigate).not.toHaveBeenCalled();
  });

  it('should block access for disallowed role', () => {
    authService.isAuthenticated.and.returnValue(true);
    authService.user = { id: 2, role: 'viewer', name: 'Viewer', email: '', token: 'abc' };
    const guardFn = roleGuard(['admin', 'editor']);
    const result = guardFn();
    expect(result).toBeFalse();
    expect(router.navigate).toHaveBeenCalledWith(['/']);
  });

  it('should block access if not authenticated', () => {
    authService.isAuthenticated.and.returnValue(false);
    authService.user = null;
    const guardFn = roleGuard(['admin']);
    const result = guardFn();
    expect(result).toBeFalse();
    expect(router.navigate).toHaveBeenCalledWith(['/']);
  });
});
