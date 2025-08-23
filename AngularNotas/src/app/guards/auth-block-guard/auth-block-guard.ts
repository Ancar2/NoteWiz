import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authBlockGuard: CanActivateFn = (route, state) => {
  const router = inject (Router)
  const token = sessionStorage.getItem('token')

  if (token) {
    router.navigate(['/dashboard'])
    return false
  }
  return true;
};
