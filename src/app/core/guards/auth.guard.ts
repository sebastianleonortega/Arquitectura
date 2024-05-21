import { CanActivateFn, Router } from '@angular/router';
import { inject } from "@angular/core";
import { Observable, of } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  if (typeof window !== 'undefined' && typeof window.localStorage !== 'undefined') {
    const token = localStorage.getItem("access_token");

    if (!token) {
      router.navigateByUrl('login').then();
      return of(false);
    }

    return of(true);
  } else {
    router.navigateByUrl('login').then();
    return of(false);
  }
};
