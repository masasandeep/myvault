import { inject } from '@angular/core';
import { Auth, onAuthStateChanged } from '@angular/fire/auth';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const auth = inject(Auth);
  const router = inject(Router);
  return new Promise<boolean>((res) => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        return res(true);
      } else {
        router.navigate(['/login']);
        return res(false);
      }
    });
  });
};
