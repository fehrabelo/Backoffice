import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

export const roleGuard = (allowedRoles: ('admin'|'editor'|'viewer')[]): CanActivateFn => {
  return () => {
    const auth = inject(AuthService);
    const router = inject(Router);

    if (!auth.isAuthenticated() || !allowedRoles.includes(auth.user?.role!)) {
      router.navigate(['/']);
      return false;
    }
    return true;
  };
};
