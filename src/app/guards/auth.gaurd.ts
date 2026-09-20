import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = () => {

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
      (
        user.roles.includes('Admin') ||
        user.roles.includes('SocialWorker')
      )
    ) {
      return true;
    }
  } catch {
    // Invalid stored user data
  }

  localStorage.removeItem('levelUpToken');
  localStorage.removeItem('levelUpUser');

  return router.createUrlTree(['/login']);
};