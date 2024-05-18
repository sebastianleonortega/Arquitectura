import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router)

  if (typeof window !== 'undefined' && typeof window.localStorage !== 'undefined') {

    const token = localStorage.getItem("access_token")
    if (!token) {
      router.navigateByUrl('').then();
      return false;
    }
    return true;
  } else {
    router.navigateByUrl('').then();
    return false;
  }
};
