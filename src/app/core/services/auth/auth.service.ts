import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserAuth } from '../../models/user-auth';



@Injectable({ providedIn: 'root' })
export class AuthService {
  private currentUser: UserAuth | null = null;

  constructor(private router: Router) {
    const stored = localStorage.getItem('user');
    if (stored) this.currentUser = JSON.parse(stored);
  }

  login(email: string, password: string): boolean {
    if (email === 'felipe@test.com' && password === '123') {
      this.setUser({ id: 1, name: 'Admin', email, role: 'admin', token: 'fake-jwt-admin' });
      return true;
    }
    if (email === 'bob@dylan.com' && password === '123') {
      this.setUser({ id: 2, name: 'Editor', email, role: 'editor', token: 'fake-jwt-editor' });
      return true;
    }
    if (email === 'corey@taylor.com' && password === '123') {
      this.setUser({ id: 3, name: 'Viewer', email, role: 'viewer', token: 'fake-jwt-viewer' });
      return true;
    }
    return false;
  }

  private setUser(user: UserAuth) {
    this.currentUser = user;
    localStorage.setItem('user', JSON.stringify(user));
  }

  logout() {
    this.currentUser = null;
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

  get user(): UserAuth | null {
    return this.currentUser;
  }

  get token(): string | null {
    return this.currentUser?.token || null;
  }

  isAuthenticated(): boolean {
    return !!this.token;
  }

  hasRole(role: 'admin' | 'editor' | 'viewer'): boolean {
    return this.currentUser?.role === role;
  }
}
