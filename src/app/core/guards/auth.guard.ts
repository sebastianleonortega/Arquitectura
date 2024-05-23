import { CanActivateFn, Router } from '@angular/router';
import { inject } from "@angular/core";

export const authGuard: CanActivateFn = (route, state) => {

  if (typeof window !== 'undefined') {
    const router = inject(Router);
    const token = localStorage.getItem("access_token");
    if (token) {
      return true;
    } else {
      router.navigateByUrl('login').then();
      return false;
    }
  }

  return true;
};
