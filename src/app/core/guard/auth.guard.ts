import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AuthService } from '../services/AuthService/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  /**
   *
   */
  constructor(private afAuth: AuthService, private router: Router) {

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    return this.afAuth.isLoggedIn.pipe(
      take(1),
      map((isLoggedIn: boolean) => {
        console.log('En canActivate: ', isLoggedIn);
        if (!isLoggedIn) {
          this.router.navigate(['/iniciar-sesion']);
          return false
        }
        return true;
      })
    );
  }

}
