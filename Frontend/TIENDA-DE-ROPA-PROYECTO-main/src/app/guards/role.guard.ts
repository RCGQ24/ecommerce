import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const roleGuard: CanActivateFn = (route) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  
  const requiredRoles = route.data?.['roles'] as string[];
  
  if (!requiredRoles || requiredRoles.length === 0) {
    return true;
  }

  if (!authService.hasRole(requiredRoles)) {
    router.navigate(['/']);
    return false;
  }

  return true;
}; 