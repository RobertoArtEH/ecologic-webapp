import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  check() {
    return localStorage.getItem('token') != null;
  }

  homeCheck() {
    if(this.check()) {
      return true;
    }

    this.router.navigate(['/login']);

    return false;
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // Case: Login and Register routes
    if(next.data.route == 'auth') {
      if(this.check()) {
        this.router.navigate(['']);

        return false;
      }

      return true;
    }
    
    // Case: Home route
    return this.homeCheck();
  }
  
  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.homeCheck();
  }
  
}
