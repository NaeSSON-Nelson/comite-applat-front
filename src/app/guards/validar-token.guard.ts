import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

export const validarTokenGuard: CanActivateFn = (route, state) => {
  
  const authService = inject(AuthService);
  const router = inject(Router);
  let validato = false;
   authService.validarToken().subscribe(res=>{
  validato=res;
   });
  return validato;
  };

