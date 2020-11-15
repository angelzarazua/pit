import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AuthService } from '../services/AuthService/auth.service';

@Injectable({
  providedIn: 'root'
})
export class PublicGuard implements CanActivate {

  /**
   *
   */
  constructor(private afAuth: AuthService, private router: Router) {

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.afAuth.isLoggedIn.pipe(
      take(1),
      map((isLoggedIn: boolean) => {
        if (isLoggedIn) {
          this.router.navigate(['/inicio']);
          return false;
        }
        return true;
      })
    );
  }

}
