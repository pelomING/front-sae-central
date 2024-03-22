import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanMatch, Route, UrlSegment, UrlTree, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, map, tap } from 'rxjs';

import { AuthService } from '../services/auth.service';
import { StorageService } from '../services/storage.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {


  constructor(
    private authService: AuthService,
    private storageService: StorageService,
    private router: Router,
  ) { }


  private checkAuthStatus(): boolean | Observable<boolean> {

    return this.authService.checkAuthentication()
    .pipe(
      tap(isAuthenticated => console.log('Authenticated AuthGuard:', isAuthenticated)),
      tap(isAuthenticated => {
        if (!isAuthenticated) {
            this.router.navigate(['./auth/login'])
        }
      }),
      map(isAuthenticated => isAuthenticated)
    )

  }

  canMatch(route: Route, segments: UrlSegment[]): boolean | Observable<boolean> {  
    console.log('Can Match');
    console.log({ route, segments })
    return this.checkAuthStatus();
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> {
     console.log('Can Activate');
     console.log({ route, state })
     return this.checkAuthStatus();
  }

}
