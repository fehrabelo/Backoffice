import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

describe('AuthService', () => {
  let service: AuthService;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('Router', ['navigate']);
    TestBed.configureTestingModule({
      providers: [
        AuthService,
        { provide: Router, useValue: spy }
      ]
    });
    service = TestBed.inject(AuthService);
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    localStorage.clear();
  });

  it('should login admin', () => {
    const result = service.login('felipe@test.com', '123');
    expect(result).toBeTrue();
    expect(service.user?.role).toBe('admin');
  });

  it('should login editor', () => {
    const result = service.login('bob@dylan.com', '123');
    expect(result).toBeTrue();
    expect(service.user?.role).toBe('editor');
  });

  it('should return false for invalid login', () => {
    const result = service.login('fake@test.com', '123');
    expect(result).toBeFalse();
    expect(service.user).toBeNull();
  });

  it('should logout user and navigate to /login', () => {
    service.login('felipe@test.com', '123');
    service.logout();
    expect(service.user).toBeNull();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('should check authentication correctly', () => {
    service.login('felipe@test.com', '123');
    expect(service.isAuthenticated()).toBeTrue();
    service.logout();
    expect(service.isAuthenticated()).toBeFalse();
  });

  it('should check role correctly', () => {
    service.login('bob@dylan.com', '123');
    expect(service.hasRole('editor')).toBeTrue();
    expect(service.hasRole('admin')).toBeFalse();
  });
});
