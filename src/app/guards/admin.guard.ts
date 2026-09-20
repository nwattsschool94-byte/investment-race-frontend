import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const adminGuard: CanActivateFn = () => {

  const router = inject(Router);

  const token = localStorage.getItem('levelUpToken');
  const userString = localStorage.getItem('levelUpUser');

  if (!token || !userString) {
    return router.createUrlTree(['/login']);
  }

  try {
    const user = JSON.parse(userString);

    if (
      user.isApproved === true &&
      Array.isArray(user.roles) &&
      user.roles.includes('Admin')
    ) {
      return true;
    }
  } catch {
    // Invalid stored user data
  }

  return router.createUrlTree(['/dashboard']);
};